"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { profile } from "@/data/profile";

export default function AboutIntro() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [firstName, lastName] = profile.name.split(" ");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-heading-line",
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1,
          ease: "power4.out",
          stagger: 0.08,
          delay: 0.1,
        }
      );
      gsap.fromTo(
        ".about-copy",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.5, stagger: 0.1 }
      );
      gsap.fromTo(
        ".about-photo",
        { clipPath: "inset(100% 0 0 0)" },
        {
          clipPath: "inset(0% 0 0 0)",
          duration: 1,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: ".about-photos",
            start: "top 85%",
          },
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="px-4 sm:px-6 md:px-10 pt-10 md:pt-16 pb-20">
      <h1 className="overflow-hidden">
        <span className="about-heading-line font-grotesk font-medium tracking-tightest text-[13vw] md:text-[6.2vw] leading-[0.95] block">
          {firstName}
        </span>
        <span className="about-heading-line font-grotesk font-medium tracking-tightest text-[13vw] md:text-[6.2vw] leading-[0.95] block">
          {lastName}
        </span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 mt-12 md:mt-16">
        <p className="about-copy md:col-span-7 text-lg md:text-xl leading-relaxed text-ink/85 max-w-xl">
          {profile.bio}
        </p>
        <p className="about-copy md:col-span-4 md:col-start-9 text-sm leading-relaxed text-ink/60">
          {profile.bioSecondary}
        </p>
      </div>

      <div className="about-photos grid grid-cols-3 gap-4 md:gap-6 mt-14 md:mt-20 items-stretch">
        <div className="about-photo col-span-2 aspect-[4/5] md:aspect-[16/11] rounded-sm overflow-hidden relative">
          <img
            src="/images/mahmudul-portrait.jpg"
            alt={profile.name}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        <div className="about-photo col-span-1 rounded-sm overflow-hidden relative bg-ink text-paper flex flex-col justify-between p-5 md:p-6">
          <span className="text-[11px] font-mono uppercase tracking-widest2 text-paper/50">
            Experience
          </span>
          <div>
            <span className="font-grotesk font-medium text-5xl md:text-6xl block leading-none">
              1+
            </span>
            <span className="text-sm text-paper/70 mt-2 block">
              Year building production web apps across agencies in Dhaka
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
