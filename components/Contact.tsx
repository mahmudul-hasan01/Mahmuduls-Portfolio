"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { profile } from "@/data/profile";

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-line",
        { yPercent: 100 },
        {
          yPercent: 0,
          duration: 1,
          ease: "power4.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
      gsap.fromTo(
        ".contact-hand",
        { opacity: 0, scale: 1.15 },
        {
          opacity: 0.9,
          scale: 1,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative bg-dark text-paper py-28 md:py-40 overflow-hidden"
    >
      <div className="grain" />

      <svg
        className="contact-hand absolute -bottom-10 -right-10 w-[60vw] max-w-[640px] opacity-0"
        viewBox="0 0 400 400"
        fill="none"
      >
        <path
          d="M60 360 C 90 260, 140 200, 180 140 C 200 110, 230 90, 250 100 C 270 110, 260 140, 240 170 C 300 130, 340 130, 350 150 C 360 170, 320 200, 280 220 C 330 210, 360 220, 360 245 C 360 265, 320 275, 290 280 C 320 285, 335 300, 325 315 C 310 335, 260 335, 220 320 C 160 380, 100 390, 60 360 Z"
          fill="#e9e6dd"
          fillOpacity="0.08"
        />
      </svg>

      <div className="relative z-10 px-4 sm:px-6 md:px-10">
        <p className="overflow-hidden">
          <span className="contact-line block font-display italic text-[10vw] md:text-[5.4vw] leading-[1.05]">
            Have a project in mind?
          </span>
        </p>
        <p className="overflow-hidden">
          <span className="contact-line block font-display italic text-[10vw] md:text-[5.4vw] leading-[1.05] underline decoration-1 underline-offset-8">
            Let&rsquo;s get in touch
          </span>
        </p>

        <div className="mt-16 flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-t border-paper/20 pt-6">
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-12">
            <div>
              <span className="block text-xs font-mono uppercase tracking-widest2 text-paper/50">
                Email
              </span>
              <a
                href={`mailto:${profile.email}`}
                className="text-sm hover:opacity-60 transition-opacity"
              >
                {profile.email}
              </a>
            </div>
            <div>
              <span className="block text-xs font-mono uppercase tracking-widest2 text-paper/50">
                Phone
              </span>
              <a
                href={`tel:${profile.phone}`}
                className="text-sm hover:opacity-60 transition-opacity"
              >
                {profile.phone}
              </a>
            </div>
            <div>
              <span className="block text-xs font-mono uppercase tracking-widest2 text-paper/50">
                Location
              </span>
              <span className="text-sm">{profile.location}</span>
            </div>
          </div>
          <a
            href="/work"
            className="text-xs font-mono uppercase tracking-widest2 hover:opacity-60 transition-opacity"
          >
            View all &#8599;
          </a>
        </div>
      </div>
    </section>
  );
}
