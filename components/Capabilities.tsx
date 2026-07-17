"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const ITEMS = [
  {
    index: "01",
    title: "Frontend",
    icon: null,
    body: "Building responsive, high-performance interfaces with React.js, Next.js, and Tailwind CSS — polished with GSAP micro-interactions.",
  },
  {
    index: "02",
    title: "Backend & APIs",
    icon: null,
    body: "Designing scalable APIs and services with Node.js, Express, and Nest.js, backed by MongoDB, PostgreSQL, and Redis.",
  },
  {
    index: "03",
    title: "Full Stack delivery",
    icon: "\u2726",
    body: "End-to-end MERN stack development — from architecture and auth to deployment on Vercel, Netlify, or Firebase.",
  },
];

export default function Capabilities() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cap-heading",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );
      gsap.fromTo(
        ".cap-col",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-dark text-paper py-20 md:py-28">
      <div className="grain" />
      <div className="relative z-10 px-4 sm:px-6 md:px-10">
        <h2 className="cap-heading font-grotesk font-medium tracking-tightest text-4xl md:text-5xl flex items-center gap-3">
          I can help you with
          <span className="flex gap-1 text-lg text-paper/40">
            <span>&bull;</span>
            <span>&bull;</span>
            <span>&bull;</span>
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 mt-16">
          {ITEMS.map((item) => (
            <div key={item.index} className="cap-col">
              <div className="flex items-center gap-3 border-t border-paper/25 pt-3 text-[11px] font-mono uppercase tracking-widest2 text-paper/45">
                {item.index}
              </div>
              <h3 className="font-grotesk font-medium text-2xl md:text-[28px] mt-5 flex items-center gap-2">
                {item.icon && (
                  <span className="text-orange-400 text-xl">{item.icon}</span>
                )}
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-paper/65 font-medium max-w-xs">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
