"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import MobileMenu from "@/components/MobileMenu";
import { profile } from "@/data/profile";
import { useContactForm } from "./ContactFormWrapper";

export default function Navbar() {
  const ref = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { openForm } = useContactForm();

  useEffect(() => {
    gsap.fromTo(
      ref.current,
      { y: -24, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.15 },
    );
  }, []);

  return (
    <>
      <header ref={ref} className="relative z-50 bg-paper text-ink">
        <nav className="flex items-center justify-between px-4 sm:px-6 md:px-10 py-5">
          <a
            href="/"
            className="flex items-center gap-2 text-sm tracking-tight"
          >
            <span aria-hidden className="text-base leading-none">
              &#10022;
            </span>
            <span className="font-medium">{profile.name}</span>
          </a>

          <div className="hidden md:flex items-center gap-10 text-xs font-mono uppercase tracking-widest2">
            <span className="text-ink/50">&copy; 2026</span>
            <div className="flex flex-col gap-1">
              <a href="/about" className="hover:opacity-60 transition-opacity">
                About
              </a>
              <a href="/work" className="hover:opacity-60 transition-opacity">
                Work
              </a>
              <button
                onClick={openForm}
                className="hover:opacity-60 transition-opacity text-left"
              >
                Contact
              </button>
            </div>
            <div className="flex flex-col gap-1">
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
          </div>

          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="md:hidden relative h-9 w-9 grid place-items-center rounded-full border border-ink/30"
          >
            <span className="sr-only">Menu</span>
            <span className="flex flex-col gap-[5px]">
              <span className="block h-[1.5px] w-4 bg-ink" />
              <span className="block h-[1.5px] w-4 bg-ink" />
            </span>
          </button>
        </nav>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
