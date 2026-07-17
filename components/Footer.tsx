"use client";

import { profile } from "@/data/profile";

export default function Footer() {
  const name = profile.name;

  return (
    <footer className="bg-paper text-ink">
      <div className="px-4 sm:px-6 md:px-10 py-14 flex flex-col md:flex-row md:items-start md:justify-between gap-10 border-t border-line">
        <a href="/" className="flex items-center gap-2 text-sm">
          <span aria-hidden className="text-base leading-none">
            &#10022;
          </span>
          <span className="font-medium">{name}</span>
        </a>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-10 text-xs font-mono uppercase tracking-widest2">
          <div className="flex flex-col gap-2">
            <span className="text-muted mb-1">Menu</span>
            <a href="/about" className="hover:opacity-60 transition-opacity">
              About
            </a>
            <a href="/work" className="hover:opacity-60 transition-opacity">
              Work
            </a>
            <a href="/#contact" className="hover:opacity-60 transition-opacity">
              Contact
            </a>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-muted mb-1">Social</span>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:opacity-60 transition-opacity"
            >
              LinkedIn
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="hover:opacity-60 transition-opacity"
            >
              Github
            </a>
          </div>
          <div className="col-span-2 sm:col-span-1 flex flex-col gap-2">
            <span className="text-muted mb-1">Contact</span>
            <a
              href={`mailto:${profile.email}`}
              className="hover:opacity-60 transition-opacity lowercase"
            >
              {profile.email}
            </a>
            <a
              href={`tel:${profile.phone}`}
              className="text-ink/70 hover:opacity-60 transition-opacity"
            >
              {profile.phone}
            </a>
          </div>
        </div>
      </div>

      <div className="overflow-hidden border-t border-line select-none">
        <div className="marquee-track py-4 md:py-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <span
              key={i}
              className="font-grotesk font-bold tracking-tightest text-[16vw] md:text-[9vw] leading-none pr-10 whitespace-nowrap"
            >
              {name}
            </span>
          ))}
        </div>
      </div>

      <div className="px-4 sm:px-6 md:px-10 py-4 flex flex-col sm:flex-row items-center justify-center gap-2 text-center sm:text-left text-[10px] font-mono uppercase tracking-widest2 text-muted border-t border-line">
        <span>&copy; 2026 {name}. All rights reserved.</span>
        {/* <span>Built with Next.js, GSAP &amp; Lenis</span> */}
      </div>
    </footer>
  );
}
