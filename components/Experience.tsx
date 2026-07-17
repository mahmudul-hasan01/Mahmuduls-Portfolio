"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import {
  experience,
  education,
  certifications,
  languages,
  softSkills,
  extracurricular,
} from "@/data/profile";

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".exp-heading",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );
      gsap.utils.toArray<HTMLElement>(".exp-item").forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 90%" },
          }
        );
      });
      gsap.utils.toArray<HTMLElement>(".side-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            delay: i * 0.05,
            scrollTrigger: { trigger: card, start: "top 92%" },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="px-4 sm:px-6 md:px-10 py-16 md:py-24 border-t border-line"
    >
      <h2 className="exp-heading text-2xl md:text-3xl border-b border-line pb-6 mb-10 md:mb-14">
        Experience{" "}
        <span className="text-muted text-lg align-top">&amp; background</span>
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10">
        <div className="lg:col-span-7 flex flex-col gap-12">
          {experience.map((job) => (
            <div
              key={job.company}
              className="exp-item grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-3 sm:gap-6"
            >
              <div className="text-xs font-mono uppercase tracking-widest2 text-muted">
                {job.period}
                {job.current && (
                  <span className="ml-2 inline-block h-1.5 w-1.5 rounded-full bg-ink align-middle" />
                )}
              </div>
              <div>
                <h3 className="font-grotesk font-medium text-xl md:text-2xl">
                  {job.company}{" "}
                  <span className="text-muted font-sans text-sm font-normal">
                    &middot; {job.location}
                  </span>
                </h3>
                <p className="text-sm font-medium text-ink/60 mt-1">{job.role}</p>
                <ul className="mt-4 space-y-2">
                  {job.bullets.map((b) => (
                    <li
                      key={b}
                      className="text-sm leading-relaxed text-ink/70 pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-ink/30"
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8">
          <div className="side-card">
            <h4 className="text-[11px] font-mono uppercase tracking-widest2 text-muted mb-4">
              Education
            </h4>
            <div className="flex flex-col gap-4">
              {education.map((e) => (
                <div key={e.degree} className="border-l-2 border-line pl-4">
                  <p className="font-grotesk font-medium">{e.degree}</p>
                  <p className="text-sm text-ink/70">{e.school}</p>
                  {e.subject && (
                    <p className="text-xs text-ink/50">{e.subject}</p>
                  )}
                  <p className="text-xs font-mono text-muted mt-0.5">
                    {e.period}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="side-card">
            <h4 className="text-[11px] font-mono uppercase tracking-widest2 text-muted mb-4">
              Certifications
            </h4>
            <div className="flex flex-col gap-4">
              {certifications.map((c) => (
                <div key={c.title} className="border-l-2 border-line pl-4">
                  <p className="font-grotesk font-medium leading-snug">
                    {c.title}
                  </p>
                  <p className="text-sm text-ink/70">{c.from}</p>
                  <p className="text-xs font-mono text-muted mt-0.5">
                    {c.period} &middot; {c.duration}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="side-card">
            <h4 className="text-[11px] font-mono uppercase tracking-widest2 text-muted mb-4">
              Languages
            </h4>
            <div className="flex flex-wrap gap-2">
              {languages.map((l) => (
                <span
                  key={l.name}
                  className="rounded-full border border-ink/20 px-3 py-1.5 text-xs text-ink/80"
                >
                  {l.name} <span className="text-muted">&middot; {l.level}</span>
                </span>
              ))}
            </div>
          </div>

          <div className="side-card">
            <h4 className="text-[11px] font-mono uppercase tracking-widest2 text-muted mb-4">
              Soft skills
            </h4>
            <div className="flex flex-wrap gap-2">
              {softSkills.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-ink/20 px-3 py-1.5 text-xs text-ink/80"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="side-card">
            <h4 className="text-[11px] font-mono uppercase tracking-widest2 text-muted mb-4">
              Extracurricular
            </h4>
            <div className="flex flex-wrap gap-2">
              {extracurricular.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-ink/20 px-3 py-1.5 text-xs text-ink/80"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
