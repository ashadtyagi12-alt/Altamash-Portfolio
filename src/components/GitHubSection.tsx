import React, { useState, useEffect } from 'react';
import { portfolioConfig } from '../config/portfolio.config';
import { GitHubRepo } from '../types/portfolio';
import { Github, Star, GitFork, ArrowUpRight } from 'lucide-react';

export const GitHubSection: React.FC = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>(portfolioConfig.manualRepos);
  const [isLiveFromAPI, setIsLiveFromAPI] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const fetchRepos = async () => {
      try {
        const username = portfolioConfig.personal.githubUsername;
        const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`, {
          signal: controller.signal,
          headers: {
            Accept: 'application/vnd.github.v3+json',
          },
        });

        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setRepos(
              data.map((r: any) => ({
                id: r.id,
                name: r.name,
                description: r.description,
                html_url: r.html_url,
                language: r.language,
                stargazers_count: r.stargazers_count,
                forks_count: r.forks_count,
                updated_at: r.updated_at,
                isSample: false,
              }))
            );
            setIsLiveFromAPI(true);
          }
        }
      } catch {
        // Fallback to portfolioConfig.manualRepos cleanly
      } finally {
        clearTimeout(timeoutId);
      }
    };

    fetchRepos();

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, []);

  return (
    <section
      id="github-section"
      className="relative py-28 md:py-36 bg-[#07080D] border-t border-white/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Label */}
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs font-bold tracking-widest text-coral uppercase">
            05 / OPEN SOURCE &amp; CODE
          </span>
          <span className="w-12 h-[1px] bg-coral/40" />
        </div>

        {/* 2-Column Layout with Sticky Left Column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Sticky Left Column (5 cols) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <h2
              data-build-id="github-headline"
              data-build-type="heading"
              data-build-label="Building Learning Creating"
              className="font-display text-4xl sm:text-6xl md:text-7xl leading-[0.95] tracking-tight uppercase mb-6"
            >
              <span className="text-white block">BUILDING.</span>
              <span className="text-white block">LEARNING.</span>
              <span className="text-coral block">CREATING.</span>
            </h2>

            <p className="text-sm md:text-base text-text-secondary leading-relaxed mb-8">
              Open source repositories, internal libraries, and experimental scripts. Every line reflects continuous hands-on learning in modern TypeScript, asynchronous Python, and front-end performance tuning.
            </p>

            {/* Profile Card */}
            <div
              data-build-id="github-profile-card"
              data-build-type="project-card"
              data-build-label="GitHub Profile Card"
              className="bg-[#0C0F1A] p-6 rounded-2xl border border-white/5 mb-8"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-coral border border-coral/30">
                  <Github size={24} />
                </div>
                <div>
                  <h3 className="font-display text-lg text-white uppercase">
                    github.com/{portfolioConfig.personal.githubUsername}
                  </h3>
                  <span className="text-xs font-mono text-text-muted">
                    Active Code Repositories
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs font-mono pt-4 border-t border-white/5">
                <span className="text-text-muted">
                  API Status: {isLiveFromAPI ? 'Live Sync' : 'Verified List'}
                </span>
                <span className="inline-flex items-center gap-1.5 text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Public</span>
                </span>
              </div>
            </div>

            <a
              href={portfolioConfig.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-coral text-coral hover:bg-coral hover:text-white transition-all duration-300 text-xs uppercase tracking-wider font-semibold group shadow-[0_0_20px_rgba(255,59,71,0.2)]"
            >
              <Github size={16} />
              <span>Visit GitHub Profile</span>
              <ArrowUpRight
                size={14}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </a>
          </div>

          {/* Right Column: Featured Repositories List (7 cols) */}
          <div className="lg:col-span-7 flex flex-col divide-y divide-white/5">
            {repos.map((repo, idx) => (
              <a
                key={repo.id || idx}
                data-build-id={`github-repo-${idx}`}
                data-build-type="repo-row"
                data-build-label={`Repo: ${repo.name}`}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group py-7 sm:py-8 px-4 -mx-4 rounded-xl transition-all duration-300 hover:bg-white/[0.03] flex flex-col justify-between"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-coral font-bold">
                      0{idx + 1}
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl text-white group-hover:text-coral transition-colors tracking-wide">
                      {repo.name}
                    </h3>
                  </div>

                  <span className="p-2 rounded-full bg-white/5 group-hover:bg-coral group-hover:text-white text-text-muted transition-all duration-300 flex-shrink-0">
                    <ArrowUpRight size={16} />
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-4 max-w-xl">
                  {repo.description || 'Modern software development project and experimental codebase.'}
                </p>

                <div className="flex items-center gap-5 text-xs font-mono text-text-muted">
                  {repo.language && (
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-coral" />
                      <span>{repo.language}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-1">
                    <Star size={13} className="text-white/40" />
                    <span>{repo.stargazers_count}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <GitFork size={13} className="text-white/40" />
                    <span>{repo.forks_count}</span>
                  </div>

                  <span className="text-[11px] text-white/30 ml-auto hidden sm:inline-block">
                    Updated {repo.updated_at ? repo.updated_at.slice(0, 10) : 'Recent'}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
