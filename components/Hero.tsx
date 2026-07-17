"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { profile } from "@/data/profile";

const LINE_1 = "Building scalable";
const LINE_2 = "web apps and experiences";

function splitWords(text: string) {
  return text.split(" ");
}

export default function Hero() {
  const headingRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const turbRef = useRef<SVGFETurbulenceElement>(null);
  const dispRef = useRef<SVGFEDisplacementMapElement>(null);
  const skewTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const words = headingRef.current?.querySelectorAll(".split-word");
    const tl = gsap.timeline({ delay: 0.2 });

    // 1. distortion-in: portrait resolves out of noise
    tl.fromTo(
      turbRef.current,
      { attr: { baseFrequency: "0.012 0.08" } },
      {
        attr: { baseFrequency: "0.00001 0.00001" },
        duration: 1.8,
        ease: "power2.out",
      },
      0,
    ).fromTo(
      dispRef.current,
      { attr: { scale: 120 } },
      { attr: { scale: 0 }, duration: 1.8, ease: "power2.out" },
      0,
    );

    tl.fromTo(
      portraitRef.current,
      { opacity: 0, scale: 1.06 },
      { opacity: 1, scale: 1, duration: 1.6, ease: "power3.out" },
      0,
    );

    // 2. heading words rise with blur
    if (words && words.length) {
      tl.fromTo(
        words,
        { yPercent: 130, opacity: 0, filter: "blur(14px)" },
        {
          yPercent: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.1,
          ease: "power4.out",
          stagger: 0.045,
        },
        0.25,
      );
    }

    // 3. ambient skew tied to Lenis scroll velocity
    const quickSkew = gsap.quickTo(skewTarget.current, "skewY", {
      duration: 0.7,
      ease: "power3.out",
    });
    const quickY = gsap.quickTo(skewTarget.current, "y", {
      duration: 0.7,
      ease: "power3.out",
    });

    let scrollAccum = 0;
    const onLenisScroll = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      const v = gsap.utils.clamp(-14, 14, detail.velocity * 1.4);
      quickSkew(v * 0.35);
      scrollAccum += detail.velocity;
      quickY(gsap.utils.clamp(-30, 30, scrollAccum * 0.15));
    };
    window.addEventListener("lenis-scroll", onLenisScroll);

    // 4. subtle mouse parallax distortion on the portrait
    const onMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;
      gsap.to(portraitRef.current, {
        x: x * 10,
        y: y * 10,
        rotate: x * 0.6,
        duration: 0.9,
        ease: "power3.out",
      });
    };
    window.addEventListener("mousemove", onMove);

    return () => {
      window.removeEventListener("lenis-scroll", onLenisScroll);
      window.removeEventListener("mousemove", onMove);
      tl.kill();
    };
  }, []);

  return (
    <section id="top" className="relative pt-8 md:pt-14 overflow-hidden">
      {/* hidden SVG filter used for the distortion-resolve effect */}
      <svg width="0" height="0" className="absolute">
        <filter id="portraitDistort">
          <feTurbulence
            ref={turbRef}
            type="fractalNoise"
            baseFrequency="0.00001 0.00001"
            numOctaves="2"
            seed="7"
            result="noise"
          />
          <feDisplacementMap
            ref={dispRef}
            in="SourceGraphic"
            in2="noise"
            scale="0"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      <div ref={skewTarget} className="px-4 sm:px-6 md:px-10">
        <div ref={headingRef} className="select-none">
          <span className="split-line">
            {splitWords(LINE_1).map((w, i) => (
              <span
                key={i}
                className="split-word font-display italic text-[13vw] md:text-[8.4vw] leading-[0.95] tracking-tightest mr-[0.28em]"
              >
                {w}
              </span>
            ))}
          </span>
          <span className="split-line">
            {splitWords(LINE_2).map((w, i) => (
              <span
                key={i}
                className="split-word font-display text-[13vw] md:text-[8.4vw] leading-[0.95] tracking-tightest mr-[0.28em]"
              >
                {w}
              </span>
            ))}
          </span>
        </div>
      </div>

      <div
        ref={portraitRef}
        className="relative mt-6 md:mt-10 mx-auto w-full max-w-[1600px] h-[46vh] md:h-[64vh] overflow-hidden"
        style={{ filter: "url(#portraitDistort)" }}
      >
        {/* real portrait, extracted from the CV */}
        <img
          src="/images/mahmudul-portrait.jpg"
          alt="Mahmudul Hasan"
          className="absolute left-1/2 top-0 -translate-x-1/2 h-full w-auto object-cover grayscale contrast-110 opacity-95"
        />
      </div>

      {/* details marquee */}
      <div className="border-y border-line mt-0 overflow-hidden select-none">
        <div className="marquee-track py-4 text-xs md:text-sm font-mono uppercase tracking-widest2 text-ink/70">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i} className="flex items-center whitespace-nowrap">
              {profile.roles.map((role) => (
                <span key={role} className="flex items-center">
                  <span className="px-6">{role}</span>
                  <span className="text-muted">&#10022;</span>
                </span>
              ))}
              <span className="px-6 text-ink">
                Located in : {profile.location}
              </span>
              <span className="text-muted">&#10022;</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
