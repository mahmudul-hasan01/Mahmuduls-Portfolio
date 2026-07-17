"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { profile } from "@/data/profile";

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = linesRef.current?.querySelectorAll(".about-line");
      if (!lines) return;
      gsap.fromTo(
        lines,
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.08,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "top 25%",
            scrub: 0.6,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="px-4 sm:px-6 md:px-10 py-20 md:py-36 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12"
    >
      <div ref={linesRef} className="md:col-span-8">
        <p className="font-display italic text-[8vw] md:text-[3.4vw] leading-[1.08] tracking-tightest">
          <span className="about-line block">I build responsive, high-performance</span>
          <span className="about-line block">web apps with the MERN stack.</span>
        </p>
      </div>

      <div className="md:col-span-4 flex flex-col justify-between gap-8">
        <p className="text-sm md:text-[15px] leading-relaxed text-ink/70 max-w-sm">
          {profile.bioShort}
        </p>
        <a
          href="/about"
          className="group inline-flex items-center gap-2 self-start rounded-full border border-ink/70 pl-4 pr-2 py-1.5 text-xs font-mono uppercase tracking-widest2"
        >
          About me
          <span className="grid place-items-center h-6 w-6 rounded-full bg-ink text-paper transition-transform duration-300 group-hover:rotate-45">
            &#8599;
          </span>
        </a>
      </div>
    </section>
  );
}
