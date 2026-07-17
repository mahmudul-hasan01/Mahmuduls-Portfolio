"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import MobileMenu from "@/components/MobileMenu";

export default function ScrollMenuButton() {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const visibleRef = useRef(false);

  useEffect(() => {
    const THRESHOLD = 420;

    const setVisible = (visible: boolean) => {
      if (visibleRef.current === visible) return;
      visibleRef.current = visible;
      gsap.to(btnRef.current, {
        autoAlpha: visible ? 1 : 0,
        y: visible ? 0 : 16,
        scale: visible ? 1 : 0.85,
        duration: 0.4,
        ease: visible ? "power3.out" : "power3.in",
      });
    };

    const onScroll = () => {
      setVisible(window.scrollY > THRESHOLD);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <button
        ref={btnRef}
        onClick={() => setOpen(true)}
        aria-label="Open navigation menu"
        style={{ visibility: "hidden" }}
        className="fixed top-5 right-5 sm:right-8 z-[150] h-14 w-14 grid place-items-center rounded-full bg-ink text-paper shadow-xl opacity-0 hover:scale-105 active:scale-95 transition-transform"
      >
        <span className="flex flex-col gap-[5px]">
          <span className="block h-[1.5px] w-5 bg-paper" />
          <span className="block h-[1.5px] w-5 bg-paper" />
        </span>
      </button>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
