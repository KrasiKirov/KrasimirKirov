const projects = [
  {
    repo: "Adaptive-Learning-App",
    name: "QuestionForger",
    summary: "I built this as an adaptive learning app for practicing difficult university-level courses.",
    primaryLanguage: "JavaScript",
    repoUrl: "https://github.com/KrasiKirov/Adaptive-Learning-App",
    badge: "README",
    source: "README + GitHub profile",
    why: "I wanted studying to feel more active than repeatedly reviewing static notes. The idea was to give students questions that adjust to their level and keep practice challenging without becoming discouraging.",
    built: [
      ["Frontend", "I used React, JavaScript, HTML, and CSS for the practice interface."],
      ["Backend", "I connected the app to an SQL-backed question system."],
      ["Learning loop", "I focused on adaptive difficulty, varied question types, and a clearer path toward classroom use."]
    ],
    learned: [
      ["React", "This was one of the projects where I learned the full React workflow by building through the uncertainty."],
      ["Data access", "Fetching questions from the database was harder than expected, which made the backend boundary more important."],
      ["Product thinking", "The next feature I would add is a leaderboard or instructor workflow, because the README already points in that direction."]
    ],
    next: [
      "I should add screenshots or a short demo GIF.",
      "I should document the SQL schema and question selection logic.",
      "I should add setup instructions so someone can run it quickly."
    ]
  },
  {
    repo: "GitFit",
    name: "GitFit",
    summary: "I built this as a fitness registration app with accounts, class registration, and role-aware access.",
    primaryLanguage: "Java",
    repoUrl: "https://github.com/KrasiKirov/GitFit",
    badge: "Resume + profile",
    source: "Resume project bullets + GitHub profile README",
    why: "I wanted to build a full-stack app where the backend had real responsibility: users, sessions, registration rules, authentication, and data consistency.",
    built: [
      ["Frontend", "I used Vue.js for responsive user-facing flows."],
      ["Backend", "I used Spring Boot with PostgreSQL to manage users, classes, and session registrations."],
      ["Security", "I added password encryption and role-based access control."]
    ],
    learned: [
      ["Boundaries", "This project made the frontend/backend split more concrete for me."],
      ["Data integrity", "Class registration is a good example of a simple UI hiding real consistency concerns."],
      ["Security", "Authentication work taught me to be more specific about what I claim and what I can prove."]
    ],
    next: [
      "I should add an architecture diagram to the README.",
      "I should document the API endpoints and database tables.",
      "I should add screenshots of the user and admin flows."
    ]
  },
  {
    repo: "Hotel-Asset-Management-System",
    name: "Hotel Asset Management System",
    summary: "I have this pinned as a Java project, but I need to document the system before I make deeper claims about it.",
    primaryLanguage: "Java",
    repoUrl: "https://github.com/KrasiKirov/Hotel-Asset-Management-System",
    badge: "Pinned repo",
    source: "GitHub pinned repository list",
    why: "I want this project to become a clearer case study, but right now the public evidence is mostly the repository name and language.",
    built: [
      ["Verified", "I can safely show that this is one of my pinned public repositories."],
      ["Language", "GitHub shows Java as the main language."],
      ["Current gap", "I should not claim architecture, users, or metrics until I document them."]
    ],
    learned: [
      ["Portfolio honesty", "A project card can be useful even when it says what I still need to explain."],
      ["Documentation", "The next improvement is not more styling. It is a better README."],
      ["Positioning", "This could become a systems/data-model story if I document the domain properly."]
    ],
    next: [
      "I should add a problem statement and user flow.",
      "I should document the data model.",
      "I should add build and run instructions."
    ]
  },
  {
    repo: "MyFitnessCompanion",
    name: "MyFitnessCompanion",
    summary: "I have this pinned as a CSS-heavy project, and I should frame it around UI/product work unless I add more technical documentation.",
    primaryLanguage: "CSS",
    repoUrl: "https://github.com/KrasiKirov/MyFitnessCompanion",
    badge: "Pinned repo",
    source: "GitHub pinned repository list",
    why: "This is a supporting project in my portfolio. I should use it to show interface thinking, not backend depth.",
    built: [
      ["Verified", "I can safely show that this is one of my pinned public repositories."],
      ["Language", "GitHub shows CSS as the main language."],
      ["Current gap", "I need screenshots and context before this becomes a strong project story."]
    ],
    learned: [
      ["Visual polish", "Small frontend projects are useful when the interaction and screenshots are clear."],
      ["Scope", "Not every project needs to be a deep systems case study."],
      ["Presentation", "This would benefit from a short narrative about the user experience."]
    ],
    next: [
      "I should add screenshots.",
      "I should clarify whether it is a static frontend, web app, or prototype.",
      "I should add a deployment link if one exists."
    ]
  },
  {
    repo: "BriefPDFReader",
    name: "BriefPDFReader",
    summary: "I have this pinned as a JavaScript project, but I should document the document workflow before I describe it in detail.",
    primaryLanguage: "JavaScript",
    repoUrl: "https://github.com/KrasiKirov/BriefPDFReader",
    badge: "Pinned repo",
    source: "GitHub pinned repository list",
    why: "This could become a strong project if I explain the input, output, and reading workflow clearly.",
    built: [
      ["Verified", "I can safely show that this is one of my pinned public repositories."],
      ["Language", "GitHub shows JavaScript as the main language."],
      ["Current gap", "I should not claim parsing, summarization, or AI behavior until the README proves it."]
    ],
    learned: [
      ["Evidence", "A good portfolio should not make the reader guess what a repo does."],
      ["Workflow", "Document tools need especially clear examples because the value is in before/after output."],
      ["Next step", "A sample PDF and sample result would make this much easier to evaluate."]
    ],
    next: [
      "I should add a README explaining input and output.",
      "I should add screenshots or sample output.",
      "I should clarify whether it runs locally, in the browser, or through an API."
    ]
  },
  {
    repo: "SpotifyPlaylistGenerator",
    name: "SpotifyPlaylistGenerator",
    summary: "I have this pinned as a Python project, and it could become a cleaner API-integration story with better docs.",
    primaryLanguage: "Python",
    repoUrl: "https://github.com/KrasiKirov/SpotifyPlaylistGenerator",
    badge: "Pinned repo",
    source: "GitHub pinned repository list",
    why: "This is a good candidate for showing how I work with external services, but I need to document the integration path first.",
    built: [
      ["Verified", "I can safely show that this is one of my pinned public repositories."],
      ["Language", "GitHub shows Python as the main language."],
      ["Current gap", "I should not claim API behavior until I document it in the repo."]
    ],
    learned: [
      ["Integration", "External API projects need clear setup instructions and environment variable docs."],
      ["Reliability", "A good integration story should mention errors, rate limits, and retries if they apply."],
      ["Presentation", "This should become a concise project page once the README is stronger."]
    ],
    next: [
      "I should add setup instructions and required environment variables.",
      "I should document Spotify API usage if applicable.",
      "I should add a short architecture diagram if there is a service boundary."
    ]
  }
];

const state = {
  selectedRepo: projects[0].repo,
  logs: []
};

const elements = {
  servicesList: document.querySelector("#services-list"),
  activeServiceLabel: document.querySelector("#active-service-label"),
  activeServiceSummary: document.querySelector("#active-service-summary"),
  starsMetric: document.querySelector("#latency-metric"),
  starsDelta: document.querySelector("#latency-delta"),
  forksMetric: document.querySelector("#test-metric"),
  forksDelta: document.querySelector("#test-delta"),
  updatedMetric: document.querySelector("#query-metric"),
  updatedDelta: document.querySelector("#query-delta"),
  chart: document.querySelector("#language-chart"),
  inspectorTitle: document.querySelector("#inspector-title"),
  inspectorContent: document.querySelector("#inspector-content"),
  repoLink: document.querySelector("#repo-link"),
  sourceOutput: document.querySelector("#source-output"),
  serviceCount: document.querySelector("#service-count")
};

function selectedProject() {
  return projects.find((project) => project.repo === state.selectedRepo) || projects[0];
}

function timestamp() {
  return new Date().toISOString().replace("T", " ").slice(0, 19);
}

function addLog(message, payload) {
  const suffix = payload ? ` ${JSON.stringify(payload)}` : "";
  state.logs = [`[${timestamp()}] ${message}${suffix}`, ...state.logs].slice(0, 40);
  renderLogs();
}

function formatDate(dateString) {
  if (!dateString) return "-";
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(dateString));
}

function renderProjects() {
  elements.serviceCount.textContent = `${projects.length} linked`;
  elements.servicesList.innerHTML = projects
    .map((project) => {
      const active = project.repo === state.selectedRepo ? "active" : "";
      const stars = project.github?.stargazers_count ?? "-";
      const forks = project.github?.forks_count ?? "-";
      const language = project.github?.language || project.primaryLanguage;
      return `
        <button class="project-card ${active}" type="button" data-service-id="${project.repo}">
          <div class="project-card-header">
            <div>
              <strong>${project.name}</strong>
              <small>${project.summary}</small>
            </div>
            <span class="pill">${project.badge}</span>
          </div>
          <div class="project-meta">
            <div><span>Language</span><strong>${language || "-"}</strong></div>
            <div><span>Stars</span><strong>${stars}</strong></div>
            <div><span>Forks</span><strong>${forks}</strong></div>
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

  elements.starsMetric.textContent = github ? github.stargazers_count : "-";
  elements.starsDelta.textContent = github ? "public GitHub value" : "waiting for GitHub API";
  elements.forksMetric.textContent = github ? github.forks_count : "-";
  elements.forksDelta.textContent = github ? `${github.open_issues_count} open issues shown by API` : "waiting for GitHub API";
  elements.updatedMetric.textContent = github ? formatDate(github.pushed_at || github.updated_at) : "-";
  elements.updatedDelta.textContent = github ? "last push/update from GitHub" : "waiting for GitHub API";
}

function languageEntries(project) {
  if (project.languages && Object.keys(project.languages).length) {
    return Object.entries(project.languages);
  }
  return [[project.primaryLanguage || "Unknown", 1]];
}

function renderLanguageChart(project) {
  const entries = languageEntries(project);
  const total = entries.reduce((sum, [, value]) => sum + value, 0) || 1;
  const colors = ["#2864d8", "#168f5f", "#d85644", "#f0b429", "#7d5bd6", "#425466"];
  let y = 58;

  const rows = entries
    .slice(0, 6)
    .map(([language, value], index) => {
      const pct = Math.round((value / total) * 1000) / 10;
      const width = Math.max(10, (value / total) * 460);
      const color = colors[index % colors.length];
      const row = `
        <text class="chart-label" x="34" y="${y - 8}">${language}</text>
        <rect x="210" y="${y - 24}" width="460" height="18" rx="4" fill="#e7edf3" />
        <rect x="210" y="${y - 24}" width="${width}" height="18" rx="4" fill="${color}" />
        <text class="chart-label" x="690" y="${y - 9}">${pct}%</text>
      `;
      y += 36;
      return row;
    })
    .join("");

  const source = project.languages ? "GitHub languages endpoint" : "profile language fallback";
  elements.chart.innerHTML = `
    <text class="chart-label" x="34" y="28">I’m showing the selected repo’s language mix.</text>
    <text class="chart-label" x="470" y="28">${source}</text>
    ${rows}
  `;
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

function renderProjectStory(project) {
  elements.inspectorContent.innerHTML = `
    <section class="inspector-block">
      <h4>Why I built it</h4>
      <p>${project.why}</p>
      <p><strong>Source I’m using:</strong> ${project.source}</p>
    </section>
    ${renderList("What I built", project.built)}
    ${renderList("What I learned", project.learned)}
    ${renderSimpleList("What I should improve next", project.next)}
  `;
}

function renderLogs() {
  elements.sourceOutput.textContent = state.logs.join("\n");
}

function render() {
  const project = selectedProject();
  renderProjects();
  renderMetrics(project);
  renderLanguageChart(project);
  renderProjectStory(project);
  renderLogs();
}

function selectProject(repo) {
  const project = projects.find((item) => item.repo === repo);
  if (!project) return;
  state.selectedRepo = project.repo;
  addLog(`I selected ${project.name}.`, { repo: project.repo, source: project.source });
  render();
}

async function fetchRepoMetadata(project) {
  const repoResponse = await fetch(`https://api.github.com/repos/KrasiKirov/${project.repo}`);
  if (!repoResponse.ok) throw new Error(`${project.repo}: ${repoResponse.status}`);
  const repo = await repoResponse.json();

  let languages = null;
  if (repo.languages_url) {
    const languageResponse = await fetch(repo.languages_url);
    if (languageResponse.ok) {
      languages = await languageResponse.json();
    }
  }

  project.github = repo;
  project.languages = languages;
}

async function refreshGithubData() {
  addLog("I’m refreshing public GitHub metadata for my pinned repos.");
  render();

  const results = await Promise.allSettled(projects.map(fetchRepoMetadata));
  const loaded = results.filter((result) => result.status === "fulfilled").length;
  const failed = results.length - loaded;

  addLog(failed ? "Some GitHub metadata did not load." : "I loaded GitHub metadata for every pinned repo.", {
    loaded,
    failed
  });
  render();
}

function bindEvents() {
  document.addEventListener("click", (event) => {
    const projectButton = event.target.closest("[data-service-id]");
    const actionButton = event.target.closest("[data-action]");
    const scrollButton = event.target.closest("[data-scroll-target]");

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
    if (action === "clear-logs") {
      state.logs = [];
      renderLogs();
    }
  });
}

function boot() {
  bindEvents();
  addLog("I loaded the portfolio with first-person project notes.");
  render();
  refreshGithubData();
}

boot();
