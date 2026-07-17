"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { projects, Project } from "@/data/projects";

export default function SelectedWork() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<Project | null>(null);
  const quickX = useRef<gsap.QuickToFunc>();
  const quickY = useRef<gsap.QuickToFunc>();

  useEffect(() => {
    quickX.current = gsap.quickTo(previewRef.current, "x", {
      duration: 0.55,
      ease: "power3.out",
    });
    quickY.current = gsap.quickTo(previewRef.current, "y", {
      duration: 0.55,
      ease: "power3.out",
    });

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".work-row").forEach((row) => {
        gsap.fromTo(
          row,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 92%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

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
      id="work"
      ref={sectionRef}
      onMouseMove={onMove}
      className="relative px-4 sm:px-6 md:px-10 py-16 md:py-24"
    >
      <div className="flex items-end justify-between border-b border-line pb-6 mb-2">
        <h2 className="text-2xl md:text-3xl">
          Selected work{" "}
          <span className="text-muted text-lg align-top">
            ( {projects.length} )
          </span>
        </h2>
        <a
          href="/work"
          className="text-xs font-mono uppercase tracking-widest2 text-ink/60 hover:text-ink transition-colors"
        >
          View all
        </a>
      </div>

      <div className="hidden md:grid grid-cols-12 text-[10px] font-mono uppercase tracking-widest2 text-muted py-3 border-b border-line">
        <span className="col-span-4">Project</span>
        <span className="col-span-3">Category</span>
        <span className="col-span-3">Services</span>
        <span className="col-span-2 text-right">Year</span>
      </div>

      {projects.map((p) => (
        <a
          key={p.id}
          href={p.link ?? "/work"}
          onMouseEnter={() => showPreview(p)}
          onMouseLeave={hidePreview}
          className="work-row group grid grid-cols-2 md:grid-cols-12 items-center gap-y-1 py-6 border-b border-line cursor-pointer transition-colors"
        >
          <span className="col-span-2 md:col-span-4 font-display text-3xl md:text-4xl text-ink transition-transform duration-300 group-hover:translate-x-2">
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

      <div className="flex justify-center pt-14">
        <a
          href="/work"
          className="rounded-full bg-ink text-paper px-6 py-3 text-xs font-mono uppercase tracking-widest2 hover:bg-ink/85 transition-colors"
        >
          More work &#8599;
        </a>
      </div>

      {/* cursor-following preview */}
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
            className="font-display italic text-2xl"
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
    </section>
  );
}
