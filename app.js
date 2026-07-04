const projects = [
  {
    repo: "freshet",
    name: "Freshet",
    summary: "A freshness-first streaming-RAG system for on-call engineers: it ingests incident data through Kafka, indexes it within seconds, and answers questions with cited, recency-aware answers.",
    primaryLanguage: "Python",
    category: "Streaming RAG / Backend",
    repoUrl: "https://github.com/KrasiKirov/freshet",
    badge: "Pinned repo",
    source: "GitHub pinned repository list",
    images: [],
    stack: [
      { label: "Python", color: "blue" },
      { label: "Kafka", color: "yellow" },
      { label: "PostgreSQL", color: "blue" },
      { label: "FastAPI", color: "green" },
      { label: "Anthropic", color: "green" },
      { label: "Docker", color: "gray" }
    ],
    why: "During an incident, on-call engineers waste most of their time reconstructing context — what changed, what's related, what fixed something similar — from data scattered across tools, under pressure. The information that matters most is the newest, which is exactly what a nightly-batch index misses. Freshet continuously ingests operational events and indexes them within seconds, answering questions like \"what's happening with scheduler-api?\" with cited, timestamped, recency-aware answers over live incidents.",
    built: [
      ["Streaming ingestion", "A Kafka pipeline ingests operational events (alerts, deploys, metrics, incident chat, postmortems), normalizes them, and indexes them into a Postgres vector store within seconds, so the freshest context is queryable almost immediately. A live demo polls real public status feeds (Cloudflare, GitHub, OpenAI) through the full local streaming stack."],
      ["Hybrid retrieval & synthesis", "Dense (bge-base-en-v1.5) + lexical (Postgres full-text) retrieval with RRF fusion, cross-encoder reranking, citation verification, and abstention — hybrid wins recall@5 0.81 and nDCG@5 0.63 on a 160-query benchmark. Answers are LLM-written, grounded, and cited, with a keyless extractive fallback that stays grounded."],
      ["Autonomous responder (Autopilot)", "A separate Kafka consumer reacts to incident lifecycle events: when a new incident opens it debounces, investigates with a tool-using agent, and posts a cited incident brief — cause, runbook, status — to stdout or Slack. Each incident is briefed exactly once via a durable claim, so redelivery and restarts never double-post."]
    ]
  },
  {
    repo: "Loop",
    name: "Loop",
    summary: "A competitive, retention-first web app that drills DSA interview patterns with auto-graded cards, a chess-style skill rating, and head-to-head duels.",
    primaryLanguage: "JavaScript",
    category: "Full-Stack App",
    repoUrl: "https://github.com/KrasiKirov/Loop",
    badge: "Pinned repo",
    source: "GitHub pinned repository list",
    images: [
      { src: "assets/loop/hub.png", alt: "Loop pattern hub — pick a pattern, see mastery and rating, start drilling" },
      { src: "assets/loop/drill.png", alt: "Loop drill card — four options with a live skill-rating meter" }
    ],
    stack: [
      { label: "React", color: "blue" },
      { label: "Express", color: "yellow" },
      { label: "PostgreSQL", color: "blue" },
      { label: "JWT", color: "green" },
      { label: "Vercel", color: "gray" }
    ],
    why: "Studying DSA from static notes doesn't build the fast pattern-recognition interviews demand. Loop drills patterns with quick auto-graded cards, a chess-style rating that adapts to your level, spaced repetition, and duels. Practice stays competitive and retention-first.",
    built: [
      ["Frontend", "React (CRA) + React Router app with a pattern hub showing per-pattern mastery and rating, four fast card formats (identify the pattern, crux step, complexity, spot-the-bug), streaks, and an interview-date countdown."],
      ["Backend & grading", "Node/Express API with server-authoritative grading. Answer keys never reach the browser before you answer, so scores can't be faked. First-attempt-only Elo via a uniqueness constraint, and duel resolution serialized with a row lock plus atomic claim so concurrent submits can't double-apply rating."],
      ["Data & auth", "PostgreSQL with Row-Level Security isolating every user's attempts and duels at the database layer under a two-role least-privilege setup; JWT access tokens with rotating refresh tokens and reuse detection, rate limiting, a CORS allowlist, and schema validation on every request."]
    ]
  },
  {
    repo: "SpotifyPlaylistGenerator",
    name: "The Listening Room",
    summary: "A mobile app that turns natural-language mood descriptions into Spotify playlists using AI.",
    primaryLanguage: "TypeScript",
    category: "Mobile App",
    repoUrl: "https://github.com/KrasiKirov/SpotifyPlaylistGenerator",
    badge: "Pinned repo",
    source: "GitHub pinned repository list",
    images: [
      { src: "assets/listening-room/landing.png", alt: "The Listening Room — landing screen inviting you to pair with Spotify and compose a side" },
      { src: "assets/listening-room/compose.png", alt: "The Listening Room — describe an evening in plain language to compose a playlist" },
      { src: "assets/listening-room/tracklist.png", alt: "The Listening Room — preview and curate the AI-generated tracklist before saving" }
    ],
    stack: [
      { label: "React Native", color: "blue" },
      { label: "TypeScript", color: "blue" },
      { label: "FastAPI", color: "yellow" },
      { label: "OpenAI", color: "green" },
      { label: "Spotify API", color: "green" },
      { label: "Railway", color: "blue" }
    ],
    why: "Manual playlist curation is slow. Describe a mood or scenario in plain language and AI composes a tracklist, resolves each song on Spotify, and saves it as a private playlist.",
    built: [
      ["Mobile client", "React Native + Expo app with Spotify PKCE auth; access tokens live in secure storage and are never persisted server-side. Distributed as a standalone Android APK."],
      ["AI generation", "FastAPI backend deployed on Railway prompts OpenAI (gpt-4.1-mini) for a JSON-structured tracklist from the user's description plus optional genre, decade, and mood filters."],
      ["Resolve & save", "Matches generated tracks on Spotify, lets users preview and remove songs or rename the playlist, then writes it to their account."]
    ]
  },
  {
    repo: "BriefPDFReader",
    name: "BriefPDF Reader",
    summary: "Upload a PDF, choose a target length, and get a faithful AI summary rendered as clean Markdown.",
    primaryLanguage: "JavaScript",
    category: "Full-Stack App",
    repoUrl: "https://github.com/KrasiKirov/BriefPDFReader",
    badge: "Pinned repo",
    source: "GitHub pinned repository list",
    images: [
      { src: "assets/briefpdf/landing.png", alt: "BriefPDF Reader landing — an editorial document condenser; choose a PDF and set a target length, then condense" },
      { src: "assets/briefpdf/result.png", alt: "BriefPDF Reader summary — the length-controlled output rendered as a clean, typeset Markdown excerpt" }
    ],
    stack: [
      { label: "React", color: "blue" },
      { label: "Express", color: "yellow" },
      { label: "OpenAI", color: "green" },
      { label: "Vercel", color: "gray" },
      { label: "Railway", color: "blue" }
    ],
    why: "Reading a long PDF end to end is slow when you only need the gist. Drop in a document, pick how many words you want back (10–2500), and get a length-controlled summary.",
    built: [
      ["Frontend", "React (CRA) single-page UI with react-markdown and axios, deployed on Vercel; uploads the PDF and target length, then renders the returned summary as formatted Markdown."],
      ["Backend", "Express API on Railway (Docker) that extracts text with pdf.js-extract, counts and chunks tokens, and calls OpenAI (gpt-4.1-mini); a single pass for documents that fit the context window, recursive chunk-and-re-summarize for very large ones."],
      ["Hardening", "Per-IP rate limiting, request timeouts with retries, 20 MB PDF-only upload validation, sanitized errors, and CORS; the OpenAI key stays server-side and is never exposed to the browser."]
    ]
  },
  {
    repo: "EMG_TQ_Modelling",
    name: "EMG–TQ Modelling",
    summary: "Models the relationship between EMG signals and joint torque using system identification and machine learning.",
    primaryLanguage: "MATLAB",
    category: "Research / ML",
    repoUrl: "https://github.com/KrasiKirov/EMG_TQ_Modelling",
    badge: "Pinned repo",
    source: "GitHub pinned repository list",
    images: [],
    stack: [
      { label: "MATLAB", color: "yellow" },
      { label: "Python", color: "blue" },
      { label: "C++", color: "gray" },
      { label: "C", color: "gray" }
    ],
    why: "Predicting joint torque from surface EMG is a core problem in prosthetics and rehabilitation engineering. This project explores how system identification and AI/ML techniques can learn the nonlinear EMG–torque mapping from experimental data.",
    built: [
      ["System identification", "MATLAB-based pipeline for processing raw EMG and torque signals, extracting features, and fitting parametric models to capture the input–output dynamics of the neuromuscular system."],
      ["ML modelling", "Python scripts training regression models to predict torque from EMG feature vectors, comparing classical system-ID approaches against learned models."],
      ["C/C++ integration", "Low-level signal processing and real-time components in C and C++ for embedded or hardware-in-the-loop evaluation."]
    ]
  }
];

const state = {
  selectedRepo: projects[0].repo
};

// "loading" until the GitHub API round-trips, then "done" (whether it succeeded or not).
let githubStatus = "loading";

const elements = {
  servicesList: document.querySelector("#services-list"),
  activeServiceLabel: document.querySelector("#active-service-label"),
  activeServiceSummary: document.querySelector("#active-service-summary"),
  languageMetric: document.querySelector("#language-metric"),
  languageDelta: document.querySelector("#language-delta"),
  categoryMetric: document.querySelector("#category-metric"),
  categoryDelta: document.querySelector("#category-delta"),
  updatedMetric: document.querySelector("#updated-metric"),
  updatedDelta: document.querySelector("#updated-delta"),
  inspectorTitle: document.querySelector("#inspector-title"),
  inspectorContent: document.querySelector("#inspector-content"),
  repoLink: document.querySelector("#repo-link"),
  serviceCount: document.querySelector("#service-count"),
  lightbox: document.querySelector("#lightbox"),
  lightboxImage: document.querySelector("#lightbox-image")
};

function selectedProject() {
  return projects.find((project) => project.repo === state.selectedRepo) || projects[0];
}

function formatDate(dateString) {
  if (!dateString) return "-";
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(dateString));
}

// Repo "last updated" value: real date, a loading shimmer, or a graceful fallback.
function updatedText(project) {
  if (project.github) return formatDate(project.github.pushed_at || project.github.updated_at);
  if (githubStatus === "loading") return '<span class="skeleton skeleton-inline"></span>';
  return "—";
}

function renderProjects() {
  elements.serviceCount.textContent = `${projects.length} linked`;
  elements.servicesList.innerHTML = projects
    .map((project) => {
      const active = project.repo === state.selectedRepo ? "active" : "";
      const language = project.github?.language || project.primaryLanguage;
      const category = project.category || "-";
      const badges = project.stack
        .map((t) => `<span class="badge badge-${t.color}">${t.label}</span>`)
        .join("");
      return `
        <button class="project-card ${active}" type="button" data-service-id="${project.repo}">
          <div class="project-card-header">
            <div>
              <strong>${project.name}</strong>
              <small>${project.summary}</small>
            </div>
          </div>
          <div class="stack-badges">${badges}</div>
          <div class="project-meta">
            <div><span>Language</span><strong>${language || "-"}</strong></div>
            <div><span>Category</span><strong>${category}</strong></div>
            <div><span>Last Updated</span><strong>${updatedText(project)}</strong></div>
          </div>
        </button>
      `;
    })
    .join("");
}

function renderMetrics(project) {
  const github = project.github;
  elements.activeServiceLabel.textContent = project.repo;
  elements.activeServiceSummary.textContent = project.summary;
  elements.inspectorTitle.textContent = project.name;
  elements.repoLink.href = project.repoUrl;

  const language = github?.language || project.primaryLanguage || "-";
  elements.languageMetric.textContent = language;
  elements.languageDelta.textContent = "primary language";
  
  elements.categoryMetric.textContent = project.category || "-";
  elements.categoryDelta.textContent = "project type";

  
  if (github) {
    elements.updatedMetric.textContent = formatDate(github.pushed_at || github.updated_at);
    elements.updatedMetric.classList.remove("skeleton");
    elements.updatedDelta.textContent = "last update";
  } else if (githubStatus === "loading") {
    elements.updatedMetric.textContent = "";
    elements.updatedMetric.classList.add("skeleton");
    elements.updatedDelta.textContent = "checking GitHub…";
  } else {
    elements.updatedMetric.textContent = "—";
    elements.updatedMetric.classList.remove("skeleton");
    elements.updatedDelta.textContent = "GitHub unavailable";
  }
}

function languageEntries(project) {
  if (project.languages && Object.keys(project.languages).length) {
    return Object.entries(project.languages);
  }
  return [[project.primaryLanguage || "Unknown", 1]];
}

function buildLanguageChartSVG(project) {
  const entries = languageEntries(project);
  const total = entries.reduce((sum, [, value]) => sum + value, 0) || 1;
  const colors = ["#1a6b91", "#c9552f", "#2c7a49", "#d99a24", "#5a8fa6", "#45535e"];
  let y = 58;

  const rows = entries
    .slice(0, 6)
    .map(([language, value], index) => {
      const pct = Math.round((value / total) * 1000) / 10;
      const width = Math.max(10, (value / total) * 460);
      const color = colors[index % colors.length];
      const row = `
        <text class="chart-label" x="34" y="${y - 8}">${language}</text>
        <rect x="210" y="${y - 24}" width="460" height="18" rx="4" fill="#e3dccb" />
        <rect x="210" y="${y - 24}" width="${width}" height="18" rx="4" fill="${color}" />
        <text class="chart-label" x="690" y="${y - 9}">${pct}%</text>
      `;
      y += 36;
      return row;
    })
    .join("");

  const svgHeight = Math.max(80, 22 + Math.min(entries.length, 6) * 36);
  return `<svg class="language-chart-inline" viewBox="0 0 760 ${svgHeight}" role="img" aria-label="Repository language distribution">${rows}</svg>`;
}

function renderList(title, rows) {
  return `
    <section class="inspector-block">
      <h4>${title}</h4>
      <ul class="inspector-list">
        ${rows.map(([label, text]) => `<li><span>${label}</span><strong>${text}</strong></li>`).join("")}
      </ul>
    </section>
  `;
}

function renderSimpleList(title, rows) {
  return `
    <section class="inspector-block">
      <h4>${title}</h4>
      <ul class="inspector-list">
        ${rows.map((text) => `<li><span>Next</span><strong>${text}</strong></li>`).join("")}
      </ul>
    </section>
  `;
}

function renderGallery(project) {
  if (!project.images?.length) return "";
  const shots = project.images
    .map(
      (image) => `
        <button class="project-shot" type="button" data-lightbox-src="${image.src}" data-lightbox-alt="${image.alt}" aria-label="Enlarge screenshot: ${image.alt}">
          <img src="${image.src}" alt="${image.alt}" loading="lazy" />
        </button>`
    )
    .join("");
  return `
    <section class="inspector-block">
      <h4>A look inside</h4>
      <div class="project-shots">${shots}</div>
    </section>
  `;
}

function renderProjectStory(project) {
  const badges = project.stack
    .map((t) => `<span class="badge badge-${t.color}">${t.label}</span>`)
    .join("");
  elements.inspectorContent.innerHTML = `
    <div class="stack-badges">${badges}</div>
    ${renderGallery(project)}
    <section class="inspector-block">
      <h4>Why I built it</h4>
      <p>${project.why}</p>
    </section>
    ${renderList("What I built", project.built)}
    <section class="inspector-block">
      <h4>Language breakdown</h4>
      ${buildLanguageChartSVG(project)}
    </section>
  `;
}

function render() {
  const project = selectedProject();
  renderProjects();
  renderMetrics(project);
  renderProjectStory(project);
}

function selectProject(repo) {
  const project = projects.find((item) => item.repo === repo);
  if (!project) return;
  state.selectedRepo = project.repo;
  render();
}

function applyGithubData(data) {
  if (data && typeof data.publicRepos === "number") {
    const el = document.querySelector("#repo-count");
    if (el) el.textContent = String(data.publicRepos);
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

// Read the precomputed snapshot (built by CI) — one same-origin request, no GitHub
// API calls from the browser, so no rate limits and instant load.
async function refreshGithubData() {
  githubStatus = "loading";
  render();
  try {
    const response = await fetch("./github-data.json", { cache: "no-cache" });
    if (response.ok) applyGithubData(await response.json());
  } catch {
    // snapshot missing/unreachable — render fallbacks ("—", static repo count) handle it
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
    const projectButton = event.target.closest("[data-service-id]");
    const actionButton = event.target.closest("[data-action]");
    const scrollButton = event.target.closest("[data-scroll-target]");
    const shotButton = event.target.closest("[data-lightbox-src]");
    const lightboxClose = event.target.closest("[data-lightbox-close]");

    if (shotButton) {
      openLightbox(shotButton.dataset.lightboxSrc, shotButton.dataset.lightboxAlt);
      return;
    }

    if (lightboxClose || event.target === elements.lightbox) {
      closeLightbox();
      return;
    }

    if (scrollButton) {
      const target = document.getElementById(scrollButton.dataset.scrollTarget);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }

    if (projectButton) {
      selectProject(projectButton.dataset.serviceId);
    }

    if (!actionButton) return;

    const action = actionButton.dataset.action;
    if (action === "refresh-github") refreshGithubData();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeLightbox();
  });
}

function boot() {
  bindEvents();
  render();
  refreshGithubData();
}

boot();
