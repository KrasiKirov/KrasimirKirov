const projects = [
  {
    repo: "Adaptive-Learning-App",
    name: "QuestionForger",
    summary: "Static flashcards don't adapt to difficulty — this platform uses Elo ratings to adjust questions in real time.",
    primaryLanguage: "JavaScript",
    category: "Full-Stack App",
    repoUrl: "https://github.com/KrasiKirov/Adaptive-Learning-App",
    badge: "README",
    source: "README + GitHub profile",
    stack: [
      { label: "React", color: "blue" },
      { label: "Node.js", color: "blue" },
      { label: "SQL Server", color: "blue" }
    ],
    why: "I wanted studying to feel more active than repeatedly reviewing static notes. The idea was to give students questions that adjust to their level and keep practice challenging without becoming discouraging.",
    built: [
      ["Frontend", "React components for the practice interface — question display, answer input, and adaptive feedback after each response."],
      ["Backend", "Node.js API connected to a SQL Server question bank; Elo rating logic updates each question's difficulty weight after every answer."],
      ["Auth", "Account creation and session tracking so progress persists across visits."]
    ]
  },
  {
    repo: "GitFit",
    name: "GitFit",
    summary: "Fitness class registration with user accounts, role-based access, and data consistency across sessions.",
    primaryLanguage: "Java",
    category: "Full-Stack App",
    repoUrl: "https://github.com/KrasiKirov/GitFit",
    badge: "Resume + profile",
    source: "Resume project bullets + GitHub profile README",
    stack: [
      { label: "Java", color: "green" },
      { label: "Spring Boot", color: "green" },
      { label: "PostgreSQL", color: "green" },
      { label: "Vue.js", color: "blue" }
    ],
    why: "I wanted to build a full-stack app where the backend had real responsibility: users, sessions, registration rules, authentication, and data consistency.",
    built: [
      ["Frontend", "Vue.js components for class browsing, registration flows, and user/admin dashboards."],
      ["Backend", "Spring Boot REST API managing users, classes, and session registrations against a PostgreSQL database."],
      ["Security", "Password encryption (BCrypt) and role-based access control — regular users vs. admins see different endpoints."]
    ]
  },
  {
    repo: "Hotel-Asset-Management-System",
    name: "Hotel Asset Management System",
    summary: "Asset lifecycle tracking for a hotel — inventory, maintenance schedules, and structured data model.",
    primaryLanguage: "Java",
    category: "Backend System",
    repoUrl: "https://github.com/KrasiKirov/Hotel-Asset-Management-System",
    badge: "Pinned repo",
    source: "GitHub pinned repository list",
    stack: [
      { label: "Java", color: "green" },
      { label: "Spring Boot", color: "green" }
    ],
    why: "Built to manage the operational lifecycle of hotel assets — tracking what exists, where it is, when it needs maintenance, and when it should be retired.",
    built: [
      ["Backend", "Java and Spring Boot for the core domain logic — asset records, status transitions, and maintenance scheduling."],
      ["Database", "Structured schema for inventory tracking, maintenance events, and asset lifecycle state."],
      ["Domain", "Business rules around asset categories, maintenance intervals, and lifecycle stages."]
    ]
  },
  {
    repo: "MyFitnessCompanion",
    name: "MyFitnessCompanion",
    summary: "Fitness tracking interface focused on responsive layout and clean interaction patterns.",
    primaryLanguage: "CSS",
    category: "Frontend",
    repoUrl: "https://github.com/KrasiKirov/MyFitnessCompanion",
    badge: "Pinned repo",
    source: "GitHub pinned repository list",
    stack: [
      { label: "HTML", color: "gray" },
      { label: "CSS", color: "gray" },
      { label: "JavaScript", color: "blue" }
    ],
    why: "A frontend-focused project for practicing responsive design and consistent UI patterns across a fitness tracking context.",
    built: [
      ["Layout", "CSS-heavy responsive layout that adapts across screen sizes without a framework."],
      ["Interface", "HTML and JavaScript for fitness tracking views — workout logging and progress display."],
      ["Styling", "Custom CSS for visual consistency, spacing, and interaction states."]
    ]
  },
  {
    repo: "BriefPDFReader",
    name: "BriefPDFReader",
    summary: "Tool for extracting and summarising content from PDF documents.",
    primaryLanguage: "JavaScript",
    category: "Document Tool",
    repoUrl: "https://github.com/KrasiKirov/BriefPDFReader",
    badge: "Pinned repo",
    source: "GitHub pinned repository list",
    stack: [
      { label: "JavaScript", color: "blue" }
    ],
    why: "Built to reduce the time needed to get the key points out of long PDF documents.",
    built: [
      ["Parsing", "JavaScript-based PDF content extraction — reads document structure and pulls out text by section."],
      ["Summarisation", "Logic to condense extracted content into a readable brief."],
      ["Output", "Clean display of the summary result for quick review."]
    ]
  },
  {
    repo: "SpotifyPlaylistGenerator",
    name: "SpotifyPlaylistGenerator",
    summary: "Automates playlist creation by integrating with the Spotify API based on user-defined criteria.",
    primaryLanguage: "Python",
    category: "API Tool",
    repoUrl: "https://github.com/KrasiKirov/SpotifyPlaylistGenerator",
    badge: "Pinned repo",
    source: "GitHub pinned repository list",
    stack: [
      { label: "Python", color: "yellow" },
      { label: "Spotify API", color: "yellow" }
    ],
    why: "Manual playlist curation is slow. This tool takes user-defined criteria and builds a playlist automatically through the Spotify API.",
    built: [
      ["Integration", "Python client for the Spotify API — handles OAuth, search, and playlist write operations."],
      ["Logic", "Criteria-based track selection: genre, tempo, mood, or seed tracks drive the playlist composition."],
      ["Output", "Creates or updates a Spotify playlist directly in the user's account."]
    ]
  }
];

const state = {
  selectedRepo: projects[0].repo
};

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
  serviceCount: document.querySelector("#service-count")
};

function selectedProject() {
  return projects.find((project) => project.repo === state.selectedRepo) || projects[0];
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
            <div><span>Last Updated</span><strong>${project.github ? formatDate(project.github.pushed_at || project.github.updated_at) : "-"}</strong></div>
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

  
  elements.updatedMetric.textContent = github ? formatDate(github.pushed_at || github.updated_at) : "-";
  elements.updatedDelta.textContent = github ? "last update" : "waiting for GitHub API";
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

function renderProjectStory(project) {
  const badges = project.stack
    .map((t) => `<span class="badge badge-${t.color}">${t.label}</span>`)
    .join("");
  elements.inspectorContent.innerHTML = `
    <div class="stack-badges">${badges}</div>
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
  render();
  await Promise.allSettled(projects.map(fetchRepoMetadata));
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
  });
}

function boot() {
  bindEvents();
  render();
  refreshGithubData();
}

boot();
