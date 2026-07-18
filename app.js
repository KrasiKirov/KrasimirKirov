const projects = [
  {
    repo: "freshet",
    name: "Freshet",
    summary: "A freshness-first streaming-RAG system for on-call engineers: it ingests incident data through Kafka, indexes it within seconds, and answers questions with cited, recency-aware answers.",
    primaryLanguage: "Python",
    category: "Streaming RAG / Backend",
    repoUrl: "https://github.com/KrasiKirov/freshet",
    flagship: true,
    coords: "63.42° N · 19.09° W",
    role: "Solo",
    status: "Benchmarked · live demo",
    keyMetric: "0.81 recall@5",
    uses: "python kafka postgresql pgvector fastapi rag anthropic docker sql",
    elevator: "Freshness-first streaming RAG that answers on-call questions over live incidents in seconds.",
    problem:
      "During an incident, on-call engineers burn their first minutes reconstructing context — what changed, what's related, what fixed something similar — from data scattered across tools. The information that matters most is the newest, which is exactly what a nightly-batch index misses.",
    approach:
      "A Kafka pipeline ingests operational events (alerts, deploys, metrics, incident chat, postmortems), normalizes them, and indexes them into Postgres/pgvector within seconds. Queries run hybrid retrieval — dense bge-base embeddings plus Postgres full-text, fused with RRF and cross-encoder reranked — and answers come back LLM-written, grounded and cited. A separate Autopilot consumer reacts to incident lifecycle events and posts a cited brief on its own.",
    outcome:
      "Hybrid retrieval reaches recall@5 0.81 and nDCG@5 0.63 on a 160-query benchmark, beating either retrieval arm alone. A live demo drives the full local streaming stack against real Cloudflare, GitHub, and OpenAI status feeds, and each incident is briefed exactly once via a durable claim, so redelivery and restarts never double-post.",
    hardPart:
      "Making retrieval trustworthy rather than merely plausible: RRF-fused dense + lexical retrieval, cross-encoder reranking, citation verification, and abstention — so it answers with sources or admits it doesn't know, instead of hallucinating in the middle of an incident.",
    badge: "Pinned repo",
    source: "GitHub pinned repository list",
    images: [
      { src: "assets/freshet/live-demo.gif", alt: "Freshet live demo — real public status-feed incidents ingested through Kafka and answered with cited, recency-aware answers" },
      { src: "assets/freshet/architecture.svg", alt: "Freshet architecture — Kafka ingestion into Postgres with pgvector, hybrid retrieval for cited answers, and the Autopilot agent posting cited Slack briefs" }
    ],
    numbers: [
      ["recall@5", "0.81 with hybrid retrieval on a 160-query benchmark — dense + lexical arms fused with RRF, then cross-encoder reranked"],
      ["nDCG@5", "0.63 — hybrid decisively beats either retrieval arm on ranking quality"],
      ["Freshness", "events are queryable within seconds of ingestion; the live demo polls real Cloudflare, GitHub, and OpenAI status feeds"]
    ],
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
    liveUrl: "https://loop-dsa.vercel.app",
    coords: "46.20° N · 6.14° E",
    role: "Solo",
    status: "Live",
    keyMetric: "RLS + concurrency-safe Elo",
    uses: "react node postgresql javascript sql",
    elevator: "Competitive DSA interview prep with a chess-style rating and cheat-proof grading.",
    problem:
      "Studying DSA from static notes doesn't build the fast pattern recognition interviews actually test.",
    approach:
      "A React pattern hub with four quick card formats — identify the pattern, crux step, complexity, spot-the-bug — plus spaced repetition, streaks, and head-to-head duels. A Node/Express API grades server-side, and PostgreSQL Row-Level Security isolates every user's attempts and duels at the database layer under a two-role least-privilege setup.",
    outcome:
      "Deployed and playable: answer keys never reach the browser before you answer, so scores can't be faked, and concurrent duel submits can't double-apply a rating change.",
    hardPart:
      "Keeping the rating honest under concurrency: first-attempt-only Elo enforced by a uniqueness constraint, and duel resolution serialized with a row lock plus an atomic claim, so two simultaneous submits can never apply the same rating change twice.",
    badge: "Pinned repo",
    source: "GitHub pinned repository list",
    images: [
      { src: "assets/loop/architecture.svg", alt: "Loop architecture — server-authoritative grading into PostgreSQL with Row-Level Security, and duel submits serialised by a row lock and atomic claim before the Elo update" },
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
    coords: "40.71° N · 74.01° W",
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
    liveUrl: "https://brief-pdf-reader.vercel.app",
    coords: "51.51° N · 0.13° W",
    role: "Solo",
    status: "Live",
    keyMetric: "10–2,500 word control",
    uses: "react node openai javascript",
    elevator: "Drop in a PDF, set a word budget, get a faithful summary back.",
    problem:
      "Reading a long PDF end to end is slow when you only need the gist — and most summarizers ignore how long you actually want the result to be.",
    approach:
      "A React SPA uploads the document and a target length. An Express API on Railway extracts text with pdf.js-extract, counts and chunks tokens, and calls OpenAI — a single pass when the document fits the context window, recursive chunk-and-re-summarize when it doesn't.",
    outcome:
      "Deployed and length-controlled from 10 to 2,500 words, with per-IP rate limiting, request timeouts and retries, 20 MB PDF-only validation, and the API key kept server-side.",
    hardPart:
      "Staying faithful past the context window: recursively chunking and re-summarizing large documents so the final summary still reflects the whole PDF, not just the first slice that happened to fit.",
    badge: "Pinned repo",
    source: "GitHub pinned repository list",
    images: [
      { src: "assets/briefpdf/architecture.svg", alt: "BriefPDF Reader architecture — extract and chunk tokens, then summarise in a single pass or recursively chunk-and-re-summarise when the document exceeds the context window" },
      { src: "assets/briefpdf/landing.jpg", alt: "BriefPDF Reader landing — an editorial document condenser; choose a PDF and set a target length, then condense" },
      { src: "assets/briefpdf/result.jpg", alt: "BriefPDF Reader summary — the length-controlled output rendered as a clean, typeset Markdown excerpt" }
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
    coords: "45.50° N · 73.58° W",
    role: "Research",
    status: "Research",
    keyMetric: "System-ID vs ML",
    uses: "python c",
    elevator: "Predicting joint torque from EMG signals with system identification and machine learning.",
    problem:
      "Predicting joint torque from surface EMG is a core problem in prosthetics and rehabilitation engineering — and the EMG-to-torque relationship is nonlinear and noisy.",
    approach:
      "A MATLAB pipeline processes raw EMG and torque signals, extracts features, and fits parametric models to the neuromuscular input–output dynamics. Python scripts train regression models on the same feature vectors, and C/C++ components handle low-level signal processing for embedded or hardware-in-the-loop evaluation.",
    outcome:
      "A side-by-side comparison of classical system identification against learned regressors on real experimental data.",
    hardPart:
      "Separating what the nonlinear neuromuscular dynamics actually explain from what a model is merely memorising — by holding classical system identification and learned regressors to the same experimental data and features.",
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

// "loading" until the GitHub API round-trips, then "done" (whether it succeeded or not).
let githubStatus = "loading";

// Public-repo total for the "5 of N repos" framing; overwritten from the snapshot.
let publicRepos = 24;

const elements = {
  flagshipSlot: document.querySelector("#flagship-slot"),
  fleetSlot: document.querySelector("#fleet-slot"),
  serviceCount: document.querySelector("#service-count"),
  lightbox: document.querySelector("#lightbox"),
  lightboxImage: document.querySelector("#lightbox-image")
};

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

function stackTokens(project) {
  return project.stack.map((t) => `<span class="badge badge-${t.color}">${t.label}</span>`).join("");
}

function specRow(label, value) {
  return `<div><span>${label}</span><strong>${value}</strong></div>`;
}

function projectActions(project) {
  const live = project.liveUrl
    ? `<a class="primary-button compact" href="${project.liveUrl}" target="_blank" rel="noreferrer">Live Demo</a>`
    : "";
  return `<div class="story-actions">${live}<a class="secondary-button compact" href="${project.repoUrl}" target="_blank" rel="noreferrer">Open Repo</a></div>`;
}

function hardPartBlock(project, small) {
  return `
    <div class="hard-part${small ? " hard-part-sm" : ""}">
      <span class="hp-label">The hard part</span>
      <p>${project.hardPart}</p>
    </div>`;
}

function fieldReportBlocks(project) {
  return `
    <section class="fr-block"><h4>Problem</h4><p>${project.problem}</p></section>
    <section class="fr-block"><h4>Approach</h4><p>${project.approach}</p></section>
    <section class="fr-block"><h4>Outcome</h4><p>${project.outcome}</p></section>`;
}

function projectId(project) {
  return `project-${project.repo.toLowerCase()}`;
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

function renderFlagship(project) {
  const language = project.github?.language || project.primaryLanguage || "-";
  elements.flagshipSlot.innerHTML = `
    <article class="flagship" id="${projectId(project)}" data-uses="${project.uses}">
      <div class="flagship-head">
        <div class="flagship-title">
          <span class="fr-coords">${project.coords}</span>
          <h3>${project.name}</h3>
          <p class="fr-elevator">${project.elevator}</p>
        </div>
        ${projectActions(project)}
      </div>
      <div class="flagship-body">
        <aside class="spec-sheet">
          ${specRow("Role", project.role)}
          ${specRow("Status", project.status)}
          ${specRow("Key metric", project.keyMetric)}
          ${specRow("Language", language)}
          ${specRow("Updated", updatedText(project))}
          <div class="spec-stack">${stackTokens(project)}</div>
        </aside>
        <div class="flagship-report">
          ${fieldReportBlocks(project)}
          ${hardPartBlock(project)}
          ${renderGallery(project)}
          ${project.numbers ? renderList("Numbers that back it", project.numbers) : ""}
          <section class="inspector-block">
            <h4>Language breakdown</h4>
            ${buildLanguageChartSVG(project)}
          </section>
        </div>
      </div>
    </article>`;
}

function renderFleet(list) {
  elements.fleetSlot.innerHTML = list
    .map(
      (project) => `
    <article class="field-report" id="${projectId(project)}" data-uses="${project.uses}">
      <div class="fr-top">
        <span class="fr-coords">${project.coords}</span>
        <span class="fr-status">${project.status}</span>
      </div>
      <h4>${project.name}</h4>
      <p class="fr-elevator">${project.elevator}</p>
      <div class="stack-badges">${stackTokens(project)}</div>
      ${hardPartBlock(project, true)}
      <span class="fr-metric">${project.keyMetric}</span>
      <details class="fr-more">
        <summary>Full field report</summary>
        <div class="fr-more-body">
          ${fieldReportBlocks(project)}
          ${renderGallery(project)}
        </div>
      </details>
      ${projectActions(project)}
    </article>`
    )
    .join("");
}

function renderProjects() {
  elements.serviceCount.textContent = `${projects.length} of ${publicRepos} repos`;
  const flagship = projects.find((project) => project.flagship) || projects[0];
  renderFlagship(flagship);
  renderFleet(projects.filter((project) => project !== flagship));
}

function render() {
  renderProjects();
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
    const actionButton = event.target.closest("[data-action]");
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

    if (!actionButton) return;

    const action = actionButton.dataset.action;
    if (action === "refresh-github") refreshGithubData();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeLightbox();
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
    const card = project ? document.getElementById(projectId(project)) : null;
    (card || document.getElementById("projects"))?.scrollIntoView({ behavior: "instant" });
    if (card) {
      card.classList.add("project-flash");
      setTimeout(() => card.classList.remove("project-flash"), 1600);
    }
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

// Field-kit cross-link: pointing at a tool traces where it was actually used,
// highlighting the matching experience and project cards.
function initToolCrossLink() {
  const tools = [...document.querySelectorAll(".tool[data-tool]")];
  if (!tools.length) return;

  const clear = () => {
    document.querySelectorAll(".tool-highlight").forEach((el) => el.classList.remove("tool-highlight"));
    document.querySelectorAll(".tool-active").forEach((el) => el.classList.remove("tool-active"));
    document.body.classList.remove("tool-tracing");
  };

  const trace = (tool) => {
    clear();
    const slug = tool.dataset.tool;
    const matches = document.querySelectorAll(`[data-uses~="${slug}"]`);
    if (!matches.length) return;
    tool.classList.add("tool-active");
    matches.forEach((el) => el.classList.add("tool-highlight"));
    document.body.classList.add("tool-tracing");
  };

  tools.forEach((tool) => {
    // focusable so the trace is reachable by keyboard too
    tool.tabIndex = 0;
    tool.addEventListener("mouseenter", () => trace(tool));
    tool.addEventListener("focus", () => trace(tool));
    tool.addEventListener("mouseleave", clear);
    tool.addEventListener("blur", clear);
  });
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
  render();
  // cross-link runs after render so the freshly painted project cards are wired
  initToolCrossLink();
  const target = deepLinkTarget();
  if (target) scrollToProject(target);
  initCountUp();
  refreshGithubData();
  window.addEventListener("hashchange", () => {
    const next = deepLinkTarget();
    if (next) scrollToProject(next);
  });
}

boot();
