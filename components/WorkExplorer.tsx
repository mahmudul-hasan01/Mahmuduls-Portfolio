"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { allProjects, filterTabs, countByTag, Project } from "@/data/projects";

type ViewMode = "list" | "grid";

export default function WorkExplorer() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [view, setView] = useState<ViewMode>("list");
  const quickX = useRef<gsap.QuickToFunc>();
  const quickY = useRef<gsap.QuickToFunc>();

  const filtered = useMemo(() => {
    if (filter === "all") return allProjects;
    return allProjects.filter((p) => p.category.toLowerCase() === filter);
  }, [filter]);

  useEffect(() => {
    quickX.current = gsap.quickTo(previewRef.current, "x", {
      duration: 0.55,
      ease: "power3.out",
    });
    quickY.current = gsap.quickTo(previewRef.current, "y", {
      duration: 0.55,
      ease: "power3.out",
    });
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".work-item",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", stagger: 0.04 }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [filtered, view]);

  const onMove = (e: React.MouseEvent) => {
    const bounds = sectionRef.current?.getBoundingClientRect();
    if (!bounds) return;
    quickX.current?.(e.clientX - bounds.left);
    quickY.current?.(e.clientY - bounds.top);
  };

  const showPreview = (p: Project) => {
    setActive(p);
    gsap.to(previewRef.current, {
      autoAlpha: 1,
      scale: 1,
      duration: 0.45,
      ease: "power3.out",
    });
    gsap.fromTo(
      imgWrapRef.current,
      { clipPath: "inset(0 0 100% 0)" },
      { clipPath: "inset(0 0 0% 0)", duration: 0.55, ease: "power3.out" }
    );
  };

  const hidePreview = () => {
    gsap.to(previewRef.current, {
      autoAlpha: 0,
      scale: 0.92,
      duration: 0.35,
      ease: "power3.in",
    });
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMove}
      className="relative px-4 sm:px-6 md:px-10 pt-10 md:pt-16 pb-24"
    >
      <h1 className="font-grotesk font-medium tracking-tightest text-[10vw] md:text-[4.6vw] leading-[1.02]">
        Building next level
        <br />
        digital experiences
      </h1>

      <div className="flex flex-wrap items-center justify-between gap-4 mt-10">
        <div className="flex flex-wrap items-center gap-2">
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-mono uppercase tracking-widest2 transition-colors ${
                filter === tab.key
                  ? "bg-ink text-paper border-ink"
                  : "border-ink/25 text-ink/70 hover:border-ink/60"
              }`}
            >
              {tab.label}
              <span
                className={`text-[10px] ${
                  filter === tab.key ? "text-paper/60" : "text-muted"
                }`}
              >
                {countByTag(tab.key)}
              </span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setView("list")}
            aria-label="List view"
            className={`h-9 w-9 grid place-items-center rounded-full border transition-colors ${
              view === "list"
                ? "bg-ink text-paper border-ink"
                : "border-ink/25 text-ink/60 hover:border-ink/60"
            }`}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <line x1="1" y1="2" x2="13" y2="2" stroke="currentColor" strokeWidth="1.4" />
              <line x1="1" y1="7" x2="13" y2="7" stroke="currentColor" strokeWidth="1.4" />
              <line x1="1" y1="12" x2="13" y2="12" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </button>
          <button
            onClick={() => setView("grid")}
            aria-label="Grid view"
            className={`h-9 w-9 grid place-items-center rounded-full border transition-colors ${
              view === "grid"
                ? "bg-ink text-paper border-ink"
                : "border-ink/25 text-ink/60 hover:border-ink/60"
            }`}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="1" y="1" width="5" height="5" fill="currentColor" />
              <rect x="8" y="1" width="5" height="5" fill="currentColor" />
              <rect x="1" y="8" width="5" height="5" fill="currentColor" />
              <rect x="8" y="8" width="5" height="5" fill="currentColor" />
            </svg>
          </button>
        </div>
      </div>

      {view === "list" ? (
        <div className="mt-8">
          <div className="hidden md:grid grid-cols-12 text-[10px] font-mono uppercase tracking-widest2 text-muted py-3 border-b border-line">
            <span className="col-span-4">Project</span>
            <span className="col-span-3">Category</span>
            <span className="col-span-3">Services</span>
            <span className="col-span-2 text-right">Year</span>
          </div>

          {filtered.map((p) => (
            <a
              key={p.id}
              href={p.link ?? "#"}
              onMouseEnter={() => showPreview(p)}
              onMouseLeave={hidePreview}
              className="work-item group grid grid-cols-2 md:grid-cols-12 items-center gap-y-1 py-6 border-b border-line cursor-pointer transition-colors"
            >
              <span className="col-span-2 md:col-span-4 font-grotesk font-medium text-3xl md:text-4xl text-ink transition-transform duration-300 group-hover:translate-x-2">
                {p.name}
                {p.link && <sup className="text-sm align-super">&#8599;</sup>}
              </span>
              <span className="col-span-1 md:col-span-3 text-xs font-mono uppercase tracking-widest2 text-ink/60">
                {p.category}
              </span>
              <span className="hidden md:block md:col-span-3 text-xs font-mono uppercase tracking-widest2 text-ink/60">
                {p.services}
              </span>
              <span className="col-span-1 md:col-span-2 text-right text-xs font-mono text-ink/60">
                {p.year}
              </span>
            </a>
          ))}
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p) => (
            <a
              key={p.id}
              href={p.link ?? "#"}
              className="work-item group block rounded-2xl overflow-hidden border border-line"
            >
              <div
                className="aspect-[4/3] flex flex-col justify-end p-5 transition-transform duration-500 group-hover:scale-[1.03]"
                style={{
                  background: `linear-gradient(160deg, ${p.color}, ${p.accent}22)`,
                }}
              >
                <span
                  className="font-grotesk font-medium text-2xl"
                  style={{ color: p.accent }}
                >
                  {p.name}
                </span>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {p.stack.slice(0, 3).map((s) => (
                    <span
                      key={s}
                      className="text-[10px] font-mono uppercase tracking-widest2 px-2 py-1 rounded-full bg-ink/10"
                      style={{ color: p.accent }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between px-4 py-3 text-[11px] font-mono uppercase tracking-widest2 text-ink/60">
                <span>{p.category}</span>
                <span>{p.year}</span>
              </div>
            </a>
          ))}
        </div>
      )}

      {view === "list" && (
        <div
          ref={previewRef}
          className="pointer-events-none absolute top-0 left-0 z-20 opacity-0 -translate-x-1/2 -translate-y-1/2 scale-90 hidden md:block"
          style={{ visibility: "hidden" }}
        >
          <div
            ref={imgWrapRef}
            className="w-[300px] h-[210px] rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-end p-4"
            style={{
              background: active
                ? `linear-gradient(160deg, ${active.color}, ${active.color}cc)`
                : "#ddd",
            }}
          >
            <span
              className="font-grotesk font-medium text-2xl"
              style={{ color: active?.accent ?? "#121210" }}
            >
              {active?.name}
            </span>
            {active && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {active.stack.slice(0, 4).map((s) => (
                  <span
                    key={s}
                    className="text-[10px] font-mono uppercase tracking-widest2 px-2 py-1 rounded-full bg-ink/10"
                    style={{ color: active.accent }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
