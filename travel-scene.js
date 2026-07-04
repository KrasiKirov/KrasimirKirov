const canvas = document.querySelector("#travel-scene");

if (canvas) {
  bootTravelScene(canvas);
}

async function bootTravelScene(targetCanvas) {
  let THREE;

  try {
    THREE = await import("https://unpkg.com/three@0.161.0/build/three.module.js");
  } catch (error) {
    targetCanvas.dataset.scene = "unavailable";
    return;
  }

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const renderer = new THREE.WebGLRenderer({
    canvas: targetCanvas,
    antialias: true,
    alpha: true
  });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
  camera.position.set(0.35, 0.08, 6.2);

  const globe = new THREE.Group();
  // Start framed on Montréal (≈ 45.5°N, 73.6°W) facing the camera.
  globe.rotation.set(0.42, -0.85, 0.02);
  scene.add(globe);

  scene.add(new THREE.AmbientLight(0xffffff, 0.62));

  const keyLight = new THREE.DirectionalLight(0xfff4e0, 1.95);
  keyLight.position.set(-4.5, 3.2, 4.5);
  scene.add(keyLight);

  const rimLight = new THREE.DirectionalLight(0x8fd0e8, 1.05);
  rimLight.position.set(4.5, -1.5, 2.5);
  scene.add(rimLight);

  const radius = 2.05;

  // Real Earth, textured at runtime from the same CDN that serves three.js.
  const textureLoader = new THREE.TextureLoader();
  textureLoader.setCrossOrigin("anonymous");
  const textureBase = "https://cdn.jsdelivr.net/gh/mrdoob/three.js@r161/examples/textures/planets/";

  const earthMaterial = new THREE.MeshPhongMaterial({
    color: 0x27384a,
    specular: 0x2d5a6b,
    shininess: 14
  });
  textureLoader.load(textureBase + "earth_atmos_2048.jpg", (map) => {
    map.colorSpace = THREE.SRGBColorSpace;
    map.anisotropy = renderer.capabilities.getMaxAnisotropy();
    earthMaterial.map = map;
    earthMaterial.color.setHex(0xffffff);
    earthMaterial.needsUpdate = true;
  });
  textureLoader.load(textureBase + "earth_specular_2048.jpg", (spec) => {
    earthMaterial.specularMap = spec;
    earthMaterial.needsUpdate = true;
  });

  const sphere = new THREE.Mesh(new THREE.SphereGeometry(radius, 96, 96), earthMaterial);
  globe.add(sphere);

  // Atmospheric rim glow (fresnel) — strongest at the limb, fading toward centre.
  const atmosphere = new THREE.Mesh(
    new THREE.SphereGeometry(radius * 1.16, 64, 64),
    new THREE.ShaderMaterial({
      transparent: true,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      uniforms: { uColor: { value: new THREE.Color(0x74c0ec) } },
      vertexShader: [
        "varying vec3 vNormal;",
        "void main() {",
        "  vNormal = normalize(normalMatrix * normal);",
        "  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);",
        "}"
      ].join("\n"),
      fragmentShader: [
        "uniform vec3 uColor;",
        "varying vec3 vNormal;",
        "void main() {",
        "  float intensity = pow(0.66 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.4);",
        "  gl_FragColor = vec4(uColor, 1.0) * clamp(intensity, 0.0, 1.0);",
        "}"
      ].join("\n")
    })
  );
  globe.add(atmosphere);

  const resizeObserver = new ResizeObserver(resizeScene);
  resizeObserver.observe(targetCanvas);
  resizeScene();

  // Scrolling drives ONLY the passport + hero cards — never the globe's spin.
  const stageToLeg = {
    origin: "origin",
    berlin: "production",
    production: "production",
    projects: "projects",
    next: "next"
  };
  const legOrder = ["origin", "production", "projects", "next"];
  let activeStage = "";

  function setActiveStage(stage) {
    if (stage === activeStage) return;
    activeStage = stage;

    document.querySelectorAll("[data-journey-card]").forEach((card) => {
      card.classList.toggle("active", card.dataset.journeyCard === stage);
    });

    // Turn the passport to the page for the active leg. Pages before the active
    // one flip away (backface-hidden reveals the page beneath).
    const activeLeg = stageToLeg[stage] || "origin";
    const activeIndex = legOrder.indexOf(activeLeg);
    document.querySelectorAll(".passport-page").forEach((page) => {
      const idx = legOrder.indexOf(page.dataset.leg);
      page.classList.toggle("turned", idx > -1 && idx < activeIndex);
      page.style.zIndex = String(legOrder.length - idx);
    });

    document.documentElement.dataset.journeyStage = stage;
  }

  function updateStageFromScroll() {
    // The current stage is the last section whose top has crossed the trigger line.
    const sections = Array.from(document.querySelectorAll("[data-journey-stage]"));
    const line = window.innerHeight * 0.4;
    let current = sections[0];
    sections.forEach((section) => {
      if (section.getBoundingClientRect().top <= line) current = section;
    });

    // The final section (contact / "next") sits at the very bottom and can't scroll
    // up past the trigger line — so snap to it once we've reached the page bottom.
    const scrollBottom = window.scrollY + window.innerHeight;
    const atBottom = scrollBottom >= document.documentElement.scrollHeight - 4;
    if (atBottom && sections.length) {
      current = sections[sections.length - 1];
    }

    setActiveStage(current ? current.dataset.journeyStage : "origin");
  }

  function resizeScene() {
    const rect = targetCanvas.getBoundingClientRect();
    const width = Math.max(1, rect.width);
    const height = Math.max(1, rect.height);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.position.x = width < 760 ? 0.15 : 0.6;
    camera.position.y = width < 760 ? 0.58 : 0.1;
    camera.position.z = width < 760 ? 7.25 : 5.85;
    camera.updateProjectionMatrix();
  }

  const clock = new THREE.Clock();
  let frameId = 0;

  function animate() {
    const dt = Math.min(clock.getDelta(), 0.05);
    // Steady self-rotation, independent of scroll position.
    if (!prefersReducedMotion.matches) {
      globe.rotation.y += dt * 0.06;
    }
    renderer.render(scene, camera);
    frameId = window.requestAnimationFrame(animate);
  }

  updateStageFromScroll();
  window.addEventListener("scroll", updateStageFromScroll, { passive: true });
  window.addEventListener("resize", updateStageFromScroll);
  frameId = window.requestAnimationFrame(animate);

  window.addEventListener("pagehide", () => {
    window.cancelAnimationFrame(frameId);
    resizeObserver.disconnect();
    window.removeEventListener("scroll", updateStageFromScroll);
    window.removeEventListener("resize", updateStageFromScroll);
    renderer.dispose();
  });
}
