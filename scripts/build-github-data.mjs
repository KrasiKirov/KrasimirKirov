#!/usr/bin/env node
/*
 * Builds github-data.json: repo metadata + language breakdowns + public-repo
 * count for the portfolio. Run in CI with GITHUB_TOKEN (5,000 req/hr) or locally
 * unauthenticated (60 req/hr — fine for a one-off). The browser then reads the
 * generated file instead of hitting the GitHub API, so page loads make zero API
 * calls and never hit a rate limit.
 *
 * Usage: node scripts/build-github-data.mjs
 */
import { writeFileSync } from "node:fs";

const USER = "KrasiKirov";
// Keep in sync with the repos referenced in app.js `projects`.
const REPOS = ["freshet", "Loop", "SpotifyPlaylistGenerator", "BriefPDFReader", "EMG_TQ_Modelling"];

const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || "";
const headers = {
  Accept: "application/vnd.github+json",
  "User-Agent": "krasimirkirov-portfolio-build",
  ...(token ? { Authorization: `Bearer ${token}` } : {})
};

async function getJSON(url) {
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} — ${url}`);
  return res.json();
}

async function main() {
  const data = { generatedAt: new Date().toISOString(), publicRepos: null, repos: {} };

  try {
    const user = await getJSON(`https://api.github.com/users/${USER}`);
    if (typeof user.public_repos === "number") data.publicRepos = user.public_repos;
  } catch (err) {
    console.warn("user fetch failed:", err.message);
  }

  for (const repo of REPOS) {
    try {
      const meta = await getJSON(`https://api.github.com/repos/${USER}/${repo}`);
      let languages = null;
      try {
        languages = await getJSON(`https://api.github.com/repos/${USER}/${repo}/languages`);
      } catch (err) {
        console.warn(`languages for ${repo} failed:`, err.message);
      }
      data.repos[repo] = {
        pushed_at: meta.pushed_at || null,
        updated_at: meta.updated_at || null,
        language: meta.language || null,
        languages
      };
    } catch (err) {
      console.warn(`repo ${repo} skipped:`, err.message);
    }
  }

  const out = new URL("../github-data.json", import.meta.url);
  writeFileSync(out, JSON.stringify(data, null, 2) + "\n");
  console.log(
    `Wrote github-data.json — ${Object.keys(data.repos).length}/${REPOS.length} repos, publicRepos=${data.publicRepos}, auth=${token ? "yes" : "no"}`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
