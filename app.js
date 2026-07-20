const projects = [
  {
    repo: "freshet",
    name: "Freshet",
    repoUrl: "https://github.com/KrasiKirov/freshet",
    flagship: true,
    role: "Solo",
    status: "Benchmarked · live demo",
    keyMetric: "0.81 recall@5",
    uses: "python kafka postgresql pgvector fastapi rag anthropic docker sql",
    elevator: "Freshness-first streaming RAG that answers on-call questions over live incidents in seconds.",
    problem:
      "During an incident, on-call engineers burn their first minutes reconstructing context: what changed, what's related, what fixed something similar, all from data scattered across tools. The information that matters most is the newest, which is exactly what a nightly-batch index misses.",
    approach:
      "A Kafka pipeline ingests operational events (alerts, deploys, metrics, incident chat, postmortems), normalizes them, and indexes them into Postgres/pgvector within seconds. Queries run hybrid retrieval (dense bge-base embeddings plus Postgres full-text, fused with RRF and cross-encoder reranked), and answers come back LLM-written, grounded and cited. A separate Autopilot consumer reacts to incident lifecycle events and posts a cited brief on its own.",
    outcome:
      "Hybrid retrieval reaches recall@5 0.81 and nDCG@5 0.63 on a 160-query benchmark, beating either retrieval arm alone. A live demo drives the full local streaming stack against real Cloudflare, GitHub, and OpenAI status feeds, and each incident is briefed exactly once via a durable claim, so redelivery and restarts never double-post.",
    hardPart:
      "Making retrieval trustworthy rather than merely plausible: RRF-fused dense + lexical retrieval, cross-encoder reranking, citation verification, and abstention, so it answers with sources or admits it doesn't know instead of hallucinating in the middle of an incident.",
    images: [
      { src: "assets/freshet/live-demo.gif", alt: "Freshet live demo: real public status-feed incidents ingested through Kafka and answered with cited, recency-aware answers" },
      { src: "assets/freshet/architecture.svg", alt: "Freshet architecture: Kafka ingestion into Postgres with pgvector, hybrid retrieval for cited answers, and the Autopilot agent posting cited Slack briefs" }
    ],
    numbers: [
      ["recall@5", "0.81 with hybrid retrieval on a 160-query benchmark; dense + lexical arms fused with RRF, then cross-encoder reranked"],
      ["nDCG@5", "0.63; hybrid decisively beats either retrieval arm on ranking quality"],
      ["Freshness", "events are queryable within seconds of ingestion; the live demo polls real Cloudflare, GitHub, and OpenAI status feeds"]
    ],
    stack: [
      { label: "Python", color: "blue" },
      { label: "Kafka", color: "yellow" },
      { label: "PostgreSQL", color: "blue" },
      { label: "FastAPI", color: "green" },
      { label: "Anthropic", color: "green" },
      { label: "Docker", color: "gray" }
    ]
  },
  {
    repo: "Loop",
    name: "Loop",
    repoUrl: "https://github.com/KrasiKirov/Loop",
    liveUrl: "https://loop-dsa.vercel.app",
    role: "Solo",
    status: "Live",
    keyMetric: "RLS + concurrency-safe Elo",
    uses: "react node postgresql javascript sql",
    elevator: "Competitive DSA interview prep with a chess-style rating and cheat-proof grading.",
    problem:
      "Studying DSA from static notes doesn't build the fast pattern recognition interviews actually test.",
    approach:
      "A React pattern hub with four quick card formats (identify the pattern, crux step, complexity, spot-the-bug), plus spaced repetition, streaks, and head-to-head duels. A Node/Express API grades server-side, and PostgreSQL Row-Level Security isolates every user's attempts and duels at the database layer under a two-role least-privilege setup.",
    outcome:
      "Deployed and playable: answer keys never reach the browser before you answer, so scores can't be faked, and concurrent duel submits can't double-apply a rating change.",
    hardPart:
      "Keeping the rating honest under concurrency: first-attempt-only Elo enforced by a uniqueness constraint, and duel resolution serialized with a row lock plus an atomic claim, so two simultaneous submits can never apply the same rating change twice.",
    images: [
      { src: "assets/loop/architecture.svg", alt: "Loop architecture: server-authoritative grading into PostgreSQL with Row-Level Security, and duel submits serialised by a row lock and atomic claim before the Elo update" },
      { src: "assets/loop/hub.png", alt: "Loop pattern hub: pick a pattern, see mastery and rating, start drilling" },
      { src: "assets/loop/drill.png", alt: "Loop drill card: four options with a live skill-rating meter" }
    ],
    stack: [
      { label: "React", color: "blue" },
      { label: "Express", color: "yellow" },
      { label: "PostgreSQL", color: "blue" },
      { label: "JWT", color: "green" },
      { label: "Vercel", color: "gray" }
    ]
  },
  {
    repo: "SpotifyPlaylistGenerator",
    name: "The Listening Room",
    repoUrl: "https://github.com/KrasiKirov/SpotifyPlaylistGenerator",
    role: "Solo",
    status: "Android APK",
    keyMetric: "Mood → playlist",
    uses: "typescript react fastapi openai python",
    elevator: "Describe an evening in plain language; get a Spotify playlist composed for it.",
    problem:
      "Manual playlist curation is slow, and a mood is hard to express as a search query.",
    approach:
      "A React Native + Expo app authenticates with Spotify via PKCE, keeping access tokens in device secure storage. A FastAPI backend on Railway prompts OpenAI for a JSON-structured tracklist from the user's description plus optional genre, decade, and mood filters, then resolves each generated track against the Spotify catalog.",
    outcome:
      "Shipped as a standalone Android APK: users preview, remove, or rename before it writes a private playlist straight to their account.",
    hardPart:
      "Handling mobile auth properly: PKCE with access tokens living only in device secure storage and never persisted server-side, plus structured-JSON prompting so the songs the model invents reliably resolve to real catalog entries.",
    images: [
      { src: "assets/listening-room/architecture.svg", alt: "The Listening Room architecture: React Native app with Spotify PKCE auth keeping tokens in device secure storage, a FastAPI backend prompting OpenAI for a JSON tracklist, and each track resolved against the Spotify catalog before saving a private playlist" },
      { src: "assets/listening-room/landing.png", alt: "The Listening Room: landing screen inviting you to pair with Spotify and compose a side" },
      { src: "assets/listening-room/compose.png", alt: "The Listening Room: describe an evening in plain language to compose a playlist" },
      { src: "assets/listening-room/tracklist.png", alt: "The Listening Room: preview and curate the AI-generated tracklist before saving" }
    ],
    stack: [
      { label: "React Native", color: "blue" },
      { label: "TypeScript", color: "blue" },
      { label: "FastAPI", color: "yellow" },
      { label: "OpenAI", color: "green" },
      { label: "Spotify API", color: "green" },
      { label: "Railway", color: "blue" }
    ]
  },
  {
    repo: "BriefPDFReader",
    name: "BriefPDF Reader",
    repoUrl: "https://github.com/KrasiKirov/BriefPDFReader",
    liveUrl: "https://brief-pdf-reader.vercel.app",
    role: "Solo",
    status: "Live",
    keyMetric: "10–2,500 word control",
    uses: "react node openai javascript",
    elevator: "Drop in a PDF, set a word budget, get a faithful summary back.",
    problem:
      "Reading a long PDF end to end is slow when you only need the gist, and most summarizers ignore how long you actually want the result to be.",
    approach:
      "A React SPA uploads the document and a target length. An Express API on Railway extracts text with pdf.js-extract, counts and chunks tokens, and calls OpenAI: a single pass when the document fits the context window, recursive chunk-and-re-summarize when it doesn't.",
    outcome:
      "Deployed and length-controlled from 10 to 2,500 words, with per-IP rate limiting, request timeouts and retries, 20 MB PDF-only validation, and the API key kept server-side.",
    hardPart:
      "Staying faithful past the context window: recursively chunking and re-summarizing large documents so the final summary still reflects the whole PDF, not just the first slice that happened to fit.",
    images: [
      { src: "assets/briefpdf/architecture.svg", alt: "BriefPDF Reader architecture: extract and chunk tokens, then summarise in a single pass or recursively chunk-and-re-summarise when the document exceeds the context window" },
      { src: "assets/briefpdf/landing.jpg", alt: "BriefPDF Reader landing: an editorial document condenser; choose a PDF and set a target length, then condense" },
      { src: "assets/briefpdf/result.jpg", alt: "BriefPDF Reader summary: the length-controlled output rendered as a clean, typeset Markdown excerpt" }
    ],
    stack: [
      { label: "React", color: "blue" },
      { label: "Express", color: "yellow" },
      { label: "OpenAI", color: "green" },
      { label: "Vercel", color: "gray" },
      { label: "Railway", color: "blue" }
    ]
  },
  {
    repo: "EMG_TQ_Modelling",
    name: "EMG to Torque LSTM",
    repoUrl: "https://github.com/KrasiKirov/EMG_TQ_Modelling",
    role: "Research",
    status: "R² ≥ 0.96",
    keyMetric: "pooled R² ≥ 0.96",
    uses: "python tensorflow keras c",
    elevator: "An LSTM that predicts ankle torque from four-channel surface EMG, validated within and across subjects.",
    problem:
      "Predicting joint torque from surface EMG underpins prosthetics and rehabilitation, but the signal is noisy, nonlinear, and varies enormously between people and joint positions. A model can look excellent on paper and still be memorising one subject's quirks.",
    approach:
      "A signal pipeline turns raw sEMG into clean envelopes: bandpass, rectify, low-pass, then MVC normalisation so channels are comparable across subjects. Those envelopes are cut into windows and fed to an LSTM built in TensorFlow/Keras, which learns the temporal relationship between muscle activation and the torque that follows.",
    outcome:
      "Pooled R² ≥ 0.96 predicting ankle torque, evaluated both within-subject and cross-subject, with per-position R² and RMSE reported across eight joint angles rather than a single headline average.",
    hardPart:
      "Keeping the evaluation honest: windowing the signal so no samples leak between train and test, and reporting cross-subject generalisation across eight joint positions, because a leaky split or a pooled-only score would flatter the model into looking far better than it is.",
    images: [
      { src: "assets/emg/architecture.svg", alt: "EMG to torque pipeline: four-channel sEMG is bandpassed, rectified, low-pass filtered and MVC-normalised into envelopes, cut into leakage-free windows, then fed to a TensorFlow/Keras LSTM that predicts ankle torque, scored by within- and cross-subject R² and RMSE" }
    ],
    stack: [
      { label: "Python", color: "blue" },
      { label: "TensorFlow", color: "yellow" },
      { label: "Keras", color: "yellow" },
      { label: "MATLAB", color: "gray" },
      { label: "C/C++", color: "gray" }
    ]
  }
];

// "loading" until the GitHub API round-trips, then "done" (whether it succeeded or not).
let githubStatus = "loading";

// Public-repo total for the "5 of N repos" framing; overwritten from the snapshot.
let publicRepos = 24;

// Which project the console has on stage.
let selectedRepo = projects[0].repo;

const elements = {
  serviceCount: document.querySelector("#service-count"),
  lightbox: document.querySelector("#lightbox"),
  lightboxImage: document.querySelector("#lightbox-image")
};

function formatDate(dateString) {
  if (!dateString) return "-";
  return new Intl.DateTimeFormat("en", { month: "long", year: "numeric" }).format(new Date(dateString));
}

// Repo "last updated" value: real date, a loading shimmer, or a graceful fallback.
function updatedText(project) {
  if (project.github) return formatDate(project.github.pushed_at || project.github.updated_at);
  if (githubStatus === "loading") return '<span class="skeleton skeleton-inline"></span>';
  return "n/a";
}

function projectActions(project) {
  const live = project.liveUrl
    ? `<a class="primary-button compact" href="${project.liveUrl}" target="_blank" rel="noreferrer">Live Demo</a>`
    : "";
  return `<div class="story-actions">${live}<a class="secondary-button compact" href="${project.repoUrl}" target="_blank" rel="noreferrer">Open Repo</a></div>`;
}

function hardPartBlock(project) {
  return `
    <div class="hard-part">
      <span class="hp-label">The hard part</span>
      <p>${project.hardPart}</p>
    </div>`;
}

function projectId(project) {
  return `project-${project.repo.toLowerCase()}`;
}

function mediaViewer(project) {
  if (!project.images?.length) return "";
  const main = project.images[0];
  const thumbs = project.images.length > 1
    ? `<div class="media-thumbs">${project.images
        .map((im, i) => `<button class="media-thumb${i === 0 ? " active" : ""}" type="button" data-media="${i}" aria-label="View ${im.alt}"><img src="${im.src}" alt="" loading="lazy" /></button>`)
        .join("")}</div>`
    : "";
  return `
      <div class="media-viewer">
        <button class="media-main" type="button" data-lightbox-src="${main.src}" data-lightbox-alt="${main.alt}" aria-label="Enlarge: ${main.alt}">
          <img id="media-main-img" src="${main.src}" alt="${main.alt}" />
        </button>
        ${thumbs}
      </div>`;
}

function renderRail() {
  document.querySelector("#console-rail").innerHTML = projects
    .map((project) => {
      const on = project.repo === selectedRepo;
      return `
      <button class="rail-tab${on ? " active" : ""}" type="button" role="tab"
        id="tab-${project.repo.toLowerCase()}" aria-selected="${on}" aria-controls="console-stage"
        tabindex="${on ? "0" : "-1"}" data-select="${project.repo}"
        data-uses="${project.uses}" data-label="${project.name}">
        <span class="rail-top"><span class="rail-name">${project.name}</span><span class="rail-status">${project.status}</span></span>
        <span class="rail-line">${project.elevator}</span>
        <span class="rail-period">Last updated ${updatedText(project)}</span>
      </button>`;
    })
    .join("");
}

function renderStage() {
  const project = projects.find((item) => item.repo === selectedRepo) || projects[0];
  const instruments = [
    ["Role", project.role],
    ["Status", project.status],
    ["Key metric", project.keyMetric],
    ["Last updated", updatedText(project)]
  ]
    .map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`)
    .join("");
  const proof = project.numbers
    ? `<div class="proof-row">${project.numbers
        .map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`)
        .join("")}</div>`
    : "";
  document.querySelector("#console-stage").innerHTML = `
    <article class="stage-inner" id="${projectId(project)}" role="tabpanel"
      aria-labelledby="tab-${project.repo.toLowerCase()}" tabindex="0">
      ${mediaViewer(project)}
      <div class="instrument-strip">${instruments}${projectActions(project)}</div>
      ${hardPartBlock(project)}
      <div class="pao">
        <section><h4>Problem</h4><p>${project.problem}</p></section>
        <section><h4>Approach</h4><p>${project.approach}</p></section>
        <section><h4>Outcome</h4><p>${project.outcome}</p></section>
      </div>
      ${proof}
    </article>`;
}

function renderProjects() {
  document.querySelector("#service-count").textContent = `${projects.length} of ${publicRepos} repos`;
  renderRail();
  renderStage();
}

function render() {
  renderProjects();
}

function selectProject(repo, focusTab) {
  const project = projects.find((item) => item.repo === repo);
  if (!project) return;
  selectedRepo = project.repo;
  renderProjects();
  history.replaceState(null, "", `#projects/${project.repo}`);
  if (focusTab) document.querySelector(`#tab-${project.repo.toLowerCase()}`)?.focus();
}

function applyGithubData(data) {
  if (data && typeof data.publicRepos === "number") {
    publicRepos = data.publicRepos;
  }
  const repos = (data && data.repos) || {};
  for (const project of projects) {
    const entry = repos[project.repo];
    if (!entry) continue;
    project.github = {
      pushed_at: entry.pushed_at,
      updated_at: entry.updated_at,
      language: entry.language
    };
    if (entry.languages && Object.keys(entry.languages).length) {
      project.languages = entry.languages;
    }
  }
}

// Read the precomputed snapshot (built by CI): one same-origin request, no GitHub
// API calls from the browser, so no rate limits and instant load.
async function refreshGithubData() {
  githubStatus = "loading";
  render();
  try {
    const response = await fetch("./github-data.json", { cache: "no-cache" });
    if (response.ok) applyGithubData(await response.json());
  } catch {
    // snapshot missing/unreachable: render fallbacks ("n/a", static repo count) handle it
  }
  githubStatus = "done";
  render();
}

function openLightbox(src, alt) {
  if (!elements.lightbox) return;
  elements.lightboxImage.src = src;
  elements.lightboxImage.alt = alt || "";
  elements.lightbox.hidden = false;
  document.body.classList.add("lightbox-open");
}

function closeLightbox() {
  if (!elements.lightbox) return;
  elements.lightbox.hidden = true;
  elements.lightboxImage.src = "";
  document.body.classList.remove("lightbox-open");
}

function bindEvents() {
  document.addEventListener("click", (event) => {
    const actionButton = event.target.closest("[data-action]");
    const shotButton = event.target.closest("[data-lightbox-src]");
    const lightboxClose = event.target.closest("[data-lightbox-close]");
    const tab = event.target.closest("[data-select]");
    const thumb = event.target.closest("[data-media]");

    if (tab) {
      selectProject(tab.dataset.select);
      return;
    }

    // swap the stage's main image without re-rendering the whole stage
    if (thumb) {
      const project = projects.find((item) => item.repo === selectedRepo);
      const image = project?.images?.[Number(thumb.dataset.media)];
      const main = document.querySelector(".media-main");
      const img = document.querySelector("#media-main-img");
      if (image && main && img) {
        img.src = image.src;
        img.alt = image.alt;
        main.dataset.lightboxSrc = image.src;
        main.dataset.lightboxAlt = image.alt;
        document.querySelectorAll(".media-thumb").forEach((t) => t.classList.toggle("active", t === thumb));
      }
      return;
    }

    if (shotButton) {
      openLightbox(shotButton.dataset.lightboxSrc, shotButton.dataset.lightboxAlt);
      return;
    }

    if (lightboxClose || event.target === elements.lightbox) {
      closeLightbox();
      return;
    }

    if (!actionButton) return;

    const action = actionButton.dataset.action;
    if (action === "refresh-github") refreshGithubData();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeLightbox();
  });

  // standard tablist keyboard behaviour on the project rail
  document.querySelector("#console-rail")?.addEventListener("keydown", (event) => {
    const keys = ["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft", "Home", "End"];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    const i = projects.findIndex((item) => item.repo === selectedRepo);
    let n = i;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") n = (i + 1) % projects.length;
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") n = (i - 1 + projects.length) % projects.length;
    if (event.key === "Home") n = 0;
    if (event.key === "End") n = projects.length - 1;
    selectProject(projects[n].repo, true);
  });
}

// Deep links: #projects/<repo> jumps to that project's card and flags it.
function deepLinkTarget() {
  const match = location.hash.match(/^#projects\/(.+)$/i);
  if (!match) return null;
  const wanted = decodeURIComponent(match[1]).toLowerCase();
  return projects.find((project) => project.repo.toLowerCase() === wanted) || null;
}

function scrollToProject(project) {
  // Instant jump (smooth scrolling gets interrupted by layout shifts while the
  // page is still loading). Scroll restoration must be off, or the browser's
  // deferred restore overrides this after load.
  history.scrollRestoration = "manual";
  const scroll = () => {
    const console_ = document.querySelector(".console");
    (console_ || document.getElementById("projects"))?.scrollIntoView({ behavior: "instant" });
  };
  // setTimeout, not requestAnimationFrame: rAF never fires in a background tab.
  // Re-anchor after load (and once more shortly after) so late layout shifts
  // from image loads can't leave the section misaligned.
  setTimeout(scroll, 0);
  const settle = () => {
    setTimeout(scroll, 0);
    setTimeout(scroll, 250);
  };
  if (document.readyState === "complete") settle();
  else window.addEventListener("load", settle, { once: true });
}

// Animate the proof-strip stats from 0 to their value the first time they
// scroll into view. Reduced-motion users just get the final numbers.
function initCountUp() {
  const strip = document.querySelector(".proof-strip");
  if (!strip) return;
  const stats = [...strip.querySelectorAll("[data-count]")];
  if (!stats.length) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const run = (el) => {
    const target = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimals || "0", 10);
    const duration = 900;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      el.textContent = (target * eased).toFixed(decimals);
      if (t < 1) requestAnimationFrame(tick);
      else el.textContent = target.toFixed(decimals);
    };
    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      stats.forEach(run);
      observer.disconnect();
    });
  }, { threshold: 0.4 });
  observer.observe(strip);
}

// Group counts are derived, so editing the kit can never desync them.
function labelGaugeCounts() {
  document.querySelectorAll(".gauge").forEach((gauge) => {
    const count = gauge.querySelectorAll(".tool, .course").length;
    const slot = gauge.querySelector(".gauge-count");
    if (slot) slot.textContent = String(count).padStart(2, "0");
  });
}

// Field-kit: pointing at a tool shows a bubble naming where it was used.
function initToolCrossLink() {
  const tools = [...document.querySelectorAll(".tool[data-tool]")];
  if (!tools.length) return;

  let bubble = document.querySelector(".tool-bubble");
  if (!bubble) {
    bubble = document.createElement("div");
    bubble.className = "tool-bubble";
    bubble.setAttribute("role", "tooltip");
    bubble.hidden = true;
    document.body.appendChild(bubble);
  }

  const hide = () => {
    bubble.hidden = true;
    document.querySelectorAll(".tool-active").forEach((el) => el.classList.remove("tool-active"));
  };

  const show = (tool) => {
    const slug = tool.dataset.tool;
    // places that exist as cards on this page …
    const places = [...document.querySelectorAll(`[data-uses~="${slug}"]`)]
      .map((el) => el.dataset.label)
      .filter(Boolean);
    // … plus any that don't (coursework, older repos, "everywhere")
    const extra = (tool.dataset.places || "")
      .split("|")
      .map((s) => s.trim())
      .filter(Boolean);
    const all = places.concat(extra);
    if (!all.length) return;

    bubble.innerHTML =
      `<span class="tb-label">Used at</span>` +
      all.map((p) => `<span class="tb-place">${p}</span>`).join("");
    bubble.hidden = false;
    tool.classList.add("tool-active");

    // position centred above the token, clamped to the viewport
    const r = tool.getBoundingClientRect();
    const b = bubble.getBoundingClientRect();
    const margin = 10;
    const centre = r.left + r.width / 2;
    let left = centre - b.width / 2;
    left = Math.max(margin, Math.min(left, window.innerWidth - b.width - margin));
    let top = r.top - b.height - 9;
    bubble.classList.toggle("below", top < margin);
    if (top < margin) top = r.bottom + 9;
    bubble.style.left = `${left + window.scrollX}px`;
    bubble.style.top = `${top + window.scrollY}px`;
    // keep the arrow pointing at the token even after clamping
    const arrowX = Math.max(12, Math.min(centre - left, b.width - 12));
    bubble.style.setProperty("--arrow-x", `${arrowX}px`);
  };

  tools.forEach((tool) => {
    tool.tabIndex = 0;
    tool.addEventListener("mouseenter", () => show(tool));
    tool.addEventListener("focus", () => show(tool));
    tool.addEventListener("mouseleave", hide);
    tool.addEventListener("blur", hide);
  });
  window.addEventListener("scroll", hide, { passive: true });
}

// Dark-mode toggle. The pre-paint script in <head> already set data-theme;
// here we just sync the button and let clicks flip + persist it.
function initThemeToggle() {
  const toggle = document.querySelector("#theme-toggle");
  if (!toggle) return;
  const sync = () => {
    const dark = document.documentElement.dataset.theme === "dark";
    toggle.setAttribute("aria-pressed", String(dark));
  };
  sync();
  toggle.addEventListener("click", () => {
    const dark = document.documentElement.dataset.theme !== "dark";
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch (e) {}
    sync();
  });
}

function boot() {
  bindEvents();
  initThemeToggle();
  const target = deepLinkTarget();
  if (target) selectedRepo = target.repo;
  render();
  // the tool tokens are static markup, so this wires once
  initToolCrossLink();
  labelGaugeCounts();
  if (target) scrollToProject(target);
  initCountUp();
  refreshGithubData();
  window.addEventListener("hashchange", () => {
    const next = deepLinkTarget();
    if (next) {
      selectProject(next.repo);
      scrollToProject(next);
    }
  });
}

boot();
