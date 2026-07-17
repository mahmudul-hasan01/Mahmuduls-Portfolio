"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { profile } from "@/data/profile";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/#contact" },
];

const SOCIALS = [
  { label: "Github", href: profile.github },
  { label: "LinkedIn", href: profile.linkedin },
];

export default function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!panelRef.current) return;

    if (open) {
      document.body.style.overflow = "hidden";
      gsap.set(panelRef.current, { display: "flex" });
      gsap.fromTo(
        panelRef.current,
        { yPercent: -100 },
        { yPercent: 0, duration: 0.6, ease: "power4.out" }
      );
      const items = linksRef.current?.querySelectorAll(".menu-link");
      if (items) {
        gsap.fromTo(
          items,
          { yPercent: 120, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power4.out",
            stagger: 0.06,
            delay: 0.15,
          }
        );
      }
    } else {
      document.body.style.overflow = "";
      gsap.to(panelRef.current, {
        yPercent: -100,
        duration: 0.5,
        ease: "power3.in",
        onComplete: () => {
          gsap.set(panelRef.current, { display: "none" });
        },
      });
    }
  }, [open]);

  return (
    <div
      ref={panelRef}
      className="fixed inset-0 z-[200] hidden flex-col justify-between bg-dark text-paper px-6 py-6"
      style={{ display: "none" }}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono uppercase tracking-widest2 text-paper/50">
          Navigation
        </span>
        <button
          onClick={onClose}
          aria-label="Close menu"
          className="h-11 w-11 grid place-items-center rounded-full border border-paper/25"
        >
          <span className="relative block h-4 w-4">
            <span className="absolute top-1/2 left-0 h-[1.5px] w-4 bg-paper rotate-45" />
            <span className="absolute top-1/2 left-0 h-[1.5px] w-4 bg-paper -rotate-45" />
          </span>
        </button>
      </div>

      <div className="border-t border-paper/15 mt-6" />

      <div ref={linksRef} className="flex-1 flex flex-col justify-center gap-1">
        {LINKS.map((l) => (
          <p key={l.label} className="overflow-hidden">
            <a
              href={l.href}
              onClick={onClose}
              className="menu-link block font-grotesk font-medium text-5xl sm:text-6xl md:text-7xl py-1 hover:italic transition-all"
            >
              {l.label}
            </a>
          </p>
        ))}
      </div>

      <div>
        <span className="text-xs font-mono uppercase tracking-widest2 text-paper/50">
          Socials
        </span>
        <div className="flex items-center gap-6 mt-3 text-sm">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="hover:opacity-60 transition-opacity"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
