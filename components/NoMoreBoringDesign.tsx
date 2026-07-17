"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import Link from "next/link";
import { useContactForm } from "./ContactFormWrapper";

export default function NoMoreBoringDesign() {
  const containerRef = useRef<HTMLDivElement>(null);
  const panel1Ref = useRef<HTMLDivElement>(null);
  const panel2Ref = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const handsBgRef = useRef<HTMLDivElement>(null);
  const handsTextRef = useRef<HTMLDivElement>(null);

  // Word animation refs
  const wordsContainerRef = useRef<HTMLDivElement>(null);

  // Card Refs
  const card1 = useRef<HTMLDivElement>(null);
  const card2 = useRef<HTMLDivElement>(null);
  const card3 = useRef<HTMLDivElement>(null);
  const card4 = useRef<HTMLDivElement>(null);
  const card5 = useRef<HTMLDivElement>(null);
  const card6 = useRef<HTMLDivElement>(null);

  const { openForm } = useContactForm();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Create master ScrollTrigger timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=180%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Panel 1 (scatter and disperse)
      tl.to(
        card1.current,
        {
          x: -300,
          y: -250,
          rotation: -25,
          scale: 0.6,
          opacity: 0,
          ease: "power2.inOut",
        },
        0,
      )
        .to(
          card2.current,
          {
            x: 300,
            y: -250,
            rotation: 25,
            scale: 0.6,
            opacity: 0,
            ease: "power2.inOut",
          },
          0,
        )
        .to(
          card3.current,
          {
            x: -400,
            y: -30,
            rotation: -15,
            scale: 0.6,
            opacity: 0,
            ease: "power2.inOut",
          },
          0,
        )
        .to(
          card4.current,
          {
            x: 400,
            y: -30,
            rotation: 15,
            scale: 0.6,
            opacity: 0,
            ease: "power2.inOut",
          },
          0,
        )
        .to(
          card5.current,
          {
            x: -300,
            y: 250,
            rotation: -30,
            scale: 0.6,
            opacity: 0,
            ease: "power2.inOut",
          },
          0,
        )
        .to(
          card6.current,
          {
            x: 300,
            y: 250,
            rotation: 30,
            scale: 0.6,
            opacity: 0,
            ease: "power2.inOut",
          },
          0,
        );

      // Fade out title and Panel 1 background
      tl.to(
        titleRef.current,
        { scale: 0.8, opacity: 0, ease: "power2.inOut" },
        0,
      );
      tl.to(panel1Ref.current, { opacity: 0, ease: "power2.inOut" }, 0.2);

      // Panel 2 fade in
      tl.fromTo(
        panel2Ref.current,
        { opacity: 0, pointerEvents: "none" },
        { opacity: 1, pointerEvents: "auto", ease: "power2.inOut" },
        0.1,
      );

      // Zoom out the hands image slightly
      tl.fromTo(
        handsBgRef.current,
        {
          scale: 1.25,
          filter: "grayscale(100%) brightness(0.6) contrast(1.1)",
        },
        {
          scale: 1.0,
          filter: "grayscale(100%) brightness(0.4) contrast(1.05)",
          ease: "power2.inOut",
        },
        0,
      );

      // ===== WORD BY WORD ANIMATION =====
      const words =
        wordsContainerRef.current?.querySelectorAll(".word-item") || [];

      // First, set all words to hidden
      gsap.set(words, {
        opacity: 0,
        y: 20,
        scale: 0.9,
        display: "inline-block",
      });

      // Animate each word with stagger
      tl.to(
        words,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          clearProps: "transform",
        },
        0.2,
      );

      // Special pulse effect for "Touch" word
      const touchWord = document.querySelector(".touch-word");
      if (touchWord) {
        tl.fromTo(
          touchWord,
          {
            color: "#f87171",
            textShadow: "0 0 0px rgba(248, 113, 113, 0)",
          },
          {
            color: "#fca5a5",
            textShadow: "0 0 20px rgba(248, 113, 113, 0.4)",
            duration: 0.8,
            ease: "sine.inOut",
            yoyo: true,
            repeat: 2,
          },
          0.8,
        );
      }
    }, container);

    return () => ctx.revert();
  }, []);

  const handleTouchClick = (e: React.MouseEvent) => {
    e.preventDefault();
    openForm();
  };

  // Split text into words
  const textLine1 = "Need a website ?".split(" ");
  const textLine2 = "Let's get in".split(" ");

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden "
      style={{ zIndex: 10 }}
    >
      {/* PANEL 1: Projects grid */}
      <div
        ref={panel1Ref}
        className="absolute inset-0 w-full h-full bg-[#f1efe9] flex items-center justify-center"
      >
        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#d8d5cc_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

        {/* Scattered Project Cards */}
        <div className="absolute inset-0 w-full h-full max-w-[1600px] mx-auto ">
          {/* Card 1: Top Left - Green Slate Dashboard */}
          <div
            ref={card1}
            className="absolute left-[8%] top-[10%] w-[260px] h-[180px] bg-[#1e293b] rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-800 p-2 overflow-hidden flex flex-col gap-2 origin-center"
            style={{ transform: "rotate(-3deg)" }}
          >
            <div className="flex items-center gap-1 border-b border-slate-800 pb-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500/80" />
              <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
              <span className="w-2 h-2 rounded-full bg-green-500/80" />
              <span className="ml-2 text-[8px] font-mono text-slate-500 bg-slate-900 px-2 py-0.5 rounded w-24 truncate">
                recruitment.sarmeadors.com
              </span>
            </div>
            <div className="flex flex-1 gap-2">
              <div className="w-1/4 bg-slate-900/60 rounded p-1 flex flex-col gap-1">
                <span className="h-2 w-full bg-slate-800 rounded" />
                <span className="h-1.5 w-4/5 bg-slate-800 rounded" />
                <span className="h-1.5 w-3/4 bg-slate-800/60 rounded" />
              </div>
              <div className="flex-1 bg-slate-900/40 rounded p-1.5 flex flex-col justify-between">
                <div className="flex flex-col gap-1">
                  <span className="h-3 w-3/4 bg-[#10b981]/20 border border-[#10b981]/30 rounded" />
                  <span className="h-2 w-full bg-slate-800 rounded" />
                  <span className="h-2 w-5/6 bg-slate-800 rounded" />
                </div>
                <div className="flex justify-between items-center text-[8px] font-mono text-[#10b981]">
                  <span>Active Candidates</span>
                  <span className="font-bold">428</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Top Right - Yellow App UI */}
          <div
            ref={card2}
            className="absolute right-[8%] top-[8%] w-[260px] h-[260px] bg-[#eab308] rounded-2xl shadow-[0_20px_50px_rgba(234,179,8,0.2)] p-4 flex items-center justify-center origin-center"
            style={{ transform: "rotate(4deg)" }}
          >
            <div className="relative w-[130px] h-[230px] bg-neutral-900 rounded-[28px] border-4 border-neutral-800 shadow-2xl p-2 overflow-hidden flex flex-col justify-between">
              {/* iPhone Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-3 bg-neutral-800 rounded-b-md z-20" />

              <div className="flex items-center justify-between text-[6px] font-mono text-neutral-400 mt-1.5">
                <span>9:41</span>
                <span>100%</span>
              </div>

              <div className="flex-1 flex flex-col justify-center py-2 gap-1 text-center">
                <span className="font-grotesk text-[8px] text-[#eab308] font-bold uppercase tracking-wider">
                  Tag Growth
                </span>
                <h4 className="font-display italic text-[11px] leading-tight text-white px-1">
                  Effortless dining, smarter operations
                </h4>
                <div className="w-full h-[60px] bg-neutral-800 rounded-lg mt-2 flex items-center justify-center text-[7px] text-neutral-400">
                  [ Food Marketplace ]
                </div>
              </div>

              <button className="w-full bg-[#eab308] text-neutral-950 font-mono text-[7px] font-semibold py-1.5 rounded-full text-center tracking-wider">
                ORDER NOW
              </button>
            </div>
          </div>

          {/* Card 3: Middle Left - Slate Blue Travel Flight */}
          <div
            ref={card3}
            className="absolute left-[15%] top-[40%] w-[280px] h-[190px] bg-[#2d3a4a] rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.18)] border border-slate-700/30 overflow-hidden flex flex-col origin-center"
            style={{ transform: "rotate(-2deg)" }}
          >
            <div className="flex items-center justify-between px-3 py-2 border-b border-slate-700/50 bg-slate-900/60">
              <span className="text-[9px] font-bold text-white tracking-widest uppercase">
                SKYBOOK
              </span>
              <span className="text-[7px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">
                USD ($)
              </span>
            </div>
            <div className="flex flex-1 p-3 gap-3">
              <div className="w-2/5 bg-slate-900/40 rounded p-2 flex flex-col gap-2 justify-between">
                <div className="flex flex-col gap-1.5">
                  <div className="h-1.5 w-1/2 bg-slate-700 rounded" />
                  <div className="h-4 w-full bg-slate-800 rounded border border-slate-700 flex items-center px-1 text-[8px] text-white">
                    NYC
                  </div>
                  <div className="h-4 w-full bg-slate-800 rounded border border-slate-700 flex items-center px-1 text-[8px] text-white">
                    LDN
                  </div>
                </div>
                <button className="w-full bg-[#f43f5e] hover:bg-[#e11d48] text-white font-mono text-[7px] py-1 rounded tracking-wider">
                  SEARCH
                </button>
              </div>
              <div className="flex-1 rounded overflow-hidden relative">
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400')",
                  }}
                />
                <div className="absolute bottom-2 left-2 right-2 text-white z-10">
                  <p className="text-[8px] font-bold">
                    Affordable Airport Transfers
                  </p>
                  <p className="text-[6px] text-slate-300">Every Time.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Middle Right - Bright Blue T-Shirt Customizer */}
          <div
            ref={card4}
            className="absolute right-[10%] top-[40%] w-[270px] h-[190px] bg-[#0070f3] rounded-xl shadow-[0_20px_50px_rgba(0,112,243,0.15)] p-3 flex flex-col gap-2 origin-center"
            style={{ transform: "rotate(3deg)" }}
          >
            <div className="bg-white/10 rounded-lg p-2 flex flex-col gap-1.5 border border-white/20">
              <div className="flex justify-between items-center text-white text-[9px] font-bold">
                <span>Express Your Creativity</span>
                <span className="text-[7px] bg-white/20 px-1.5 py-0.5 rounded">
                  $24.99
                </span>
              </div>
              <div className="flex gap-2">
                <div className="flex-1 bg-white/20 rounded h-24 flex items-center justify-center">
                  <svg
                    className="w-14 h-14 text-white fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 2h-3l-1 2h-4l-1-2H6L2 6v4h2v12h16V10h2V6l-4-4zM8 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm8 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
                  </svg>
                </div>
                <div className="w-1/3 flex flex-col justify-between py-1">
                  <div className="flex flex-col gap-1">
                    <span className="text-[6px] font-mono text-white/70 uppercase">
                      Colors
                    </span>
                    <div className="flex gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-white border border-white/40 cursor-pointer" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 cursor-pointer" />
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500 cursor-pointer" />
                    </div>
                  </div>
                  <button className="w-full bg-white text-[#0070f3] font-mono text-[7px] font-bold py-1 rounded">
                    CUSTOMIZE
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Card 5: Bottom Left - Green Arabic Website */}
          <div
            ref={card5}
            className="absolute left-[6%] bottom-[10%] w-[280px] h-[200px] bg-[#15803d] rounded-xl shadow-[0_20px_50px_rgba(21,128,61,0.15)] p-3.5 flex flex-col justify-between origin-center"
            style={{ transform: "rotate(-4deg)" }}
          >
            <div className="flex justify-between items-center text-white/90">
              <span className="text-[9px] font-bold font-mono">W-TRAVEL</span>
              <span className="text-[9px] font-serif">عربي</span>
            </div>
            <div className="bg-white rounded-lg p-2.5 flex flex-col gap-1.5 shadow-inner">
              <h5 className="text-right text-[10px] font-bold text-neutral-800 leading-tight">
                ويل ترافيل الشريك الموثوق والآمن
              </h5>
              <p className="text-right text-[7px] text-neutral-500 leading-normal">
                في المملكة العربية السعودية. نوفر لك أفضل الرحلات السياحية
                وحجوزات الفنادق والطيران بأسعار تنافسية.
              </p>
              <div className="flex justify-between items-center mt-1">
                <span className="text-[7px] text-[#15803d] font-bold font-mono">
                  Book now
                </span>
                <span className="h-1.5 w-1/3 bg-neutral-200 rounded" />
              </div>
            </div>
            <div className="text-[6px] text-white/60 text-center font-mono">
              Designed & Developed by Mahmudul
            </div>
          </div>

          {/* Card 6: Bottom Right - Burgundy Restaurant Website */}
          <div
            ref={card6}
            className="absolute right-[22%] bottom-[8%] w-[270px] h-[190px] bg-[#6b0f1a] rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.18)] p-3.5 flex flex-col justify-between origin-center"
            style={{ transform: "rotate(3deg)" }}
          >
            <div className="flex justify-between items-center">
              <span className="text-[9px] text-[#f87171] font-bold uppercase tracking-wider font-mono">
                CHICK'N HEAT
              </span>
              <span className="text-[7px] text-white bg-[#b91c1c] px-2 py-0.5 rounded font-mono">
                MENU
              </span>
            </div>
            <div className="flex-1 flex gap-2.5 items-center mt-2.5">
              <div className="flex-1 flex flex-col gap-1">
                <h4 className="text-white text-[11px] font-extrabold leading-none">
                  Bringing The Heat!
                </h4>
                <p className="text-white/60 text-[7px] leading-normal">
                  Our signature hot tenders and wings are seasoned to
                  perfection.
                </p>
                <span className="h-3 w-16 bg-[#b91c1c] rounded mt-1 flex items-center justify-center text-[7px] font-mono text-white font-bold cursor-pointer">
                  GET 20% OFF
                </span>
              </div>
              <div className="w-1/3 bg-neutral-900/50 rounded-lg h-20 flex items-center justify-center overflow-hidden border border-white/5">
                <div className="w-10 h-10 bg-[#eab308] rounded-full flex flex-col justify-end p-1 border-2 border-white relative">
                  <div className="absolute top-1 left-2 w-1.5 h-1.5 rounded-full bg-red-600" />
                  <div className="absolute top-2 right-1.5 w-1.5 h-1.5 rounded-full bg-red-600" />
                  <span className="text-[5px] text-neutral-950 font-bold text-center leading-none">
                    HOT TUB
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Center Text */}
        <h2
          ref={titleRef}
          className="relative z-10 font-display text-[11vw] md:text-[6.4vw] leading-[1.05] tracking-tightest text-ink select-none text-center px-4"
        >
          no more boring design
        </h2>
      </div>

      {/* PANEL 2: Grayscale Hands Overlay */}
      <div
        ref={panel2Ref}
        className="absolute inset-0 w-full h-full opacity-0 pointer-events-none"
      >
        {/* Background Image Container */}
        <div
          ref={handsBgRef}
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/hands-reaching.webp')",
          }}
        />

        {/* Word by Word Text Content */}
        <div className="absolute inset-0 flex items-center justify-center z-10 px-4">
          <div
            ref={handsTextRef}
            className="text-center flex flex-col items-center gap-3 select-none"
          >
            <div
              ref={wordsContainerRef}
              className="flex flex-col items-center gap-3"
            >
              {/* Line 1: "Need a website ?" */}
              <p className="font-display italic text-[8.5vw] md:text-[5vw] leading-[1.1] text-paper/90">
                {textLine1.map((word, index) => (
                  <span
                    key={`line1-${index}`}
                    className="word-item inline-block"
                    style={{
                      marginRight: index < textLine1.length - 1 ? "0.15em" : 0,
                      opacity: 0,
                      transform: "translateY(20px) scale(0.9)",
                    }}
                  >
                    {word}
                  </span>
                ))}
              </p>

              {/* Line 2: "Let's get in Touch" */}
              <p className="font-display italic text-[8.5vw] md:text-[5vw] leading-[1.1] text-paper">
                {textLine2.map((word, index) => (
                  <span
                    key={`line2-${index}`}
                    className="word-item inline-block"
                    style={{
                      marginRight: index < textLine2.length - 1 ? "0.15em" : 0,
                      opacity: 0,
                      transform: "translateY(20px) scale(0.9)",
                    }}
                  >
                    {word}
                  </span>
                ))}{" "}
                <span
                  className="word-item touch-word inline-block cursor-pointer transition-all duration-300 hover:scale-110"
                  style={{
                    opacity: 0,
                    transform: "translateY(20px) scale(0.9)",
                    textDecoration: "underline",
                    textDecorationColor: "#f87171",
                    textUnderlineOffset: "8px",
                    color: "#f87171",
                    display: "inline-block",
                  }}
                >
                  <span onClick={handleTouchClick} className="inline-block">
                    Touch
                  </span>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
