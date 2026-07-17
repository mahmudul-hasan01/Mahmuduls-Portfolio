"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skills as skillGroups } from "@/data/profile";
import { skillIconSlugs, iconUrl } from "@/lib/skillIcons";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      if (!section) return;

      const intro = section.querySelector(".skill-intro");
      const categoryTexts =
        section.querySelectorAll<HTMLElement>(".category-text");
      const allChips = section.querySelectorAll<HTMLElement>(".skill-chip");
      const rings = section.querySelectorAll<HTMLElement>(".orbit-ring");

      // Responsive radius calculation based on viewport width
      const getResponsiveRadius = (totalChips: number) => {
        const vw = window.innerWidth;
        let baseRadius: number;
        let outerMultiplier: number;

        if (vw < 480) {
          // Small mobile
          baseRadius = Math.min(140, 70 + totalChips * 8);
          outerMultiplier = 1.6;
        } else if (vw < 640) {
          // Mobile
          baseRadius = Math.min(180, 90 + totalChips * 10);
          outerMultiplier = 1.6;
        } else if (vw < 1024) {
          // Tablet
          baseRadius = Math.min(260, 130 + totalChips * 12);
          outerMultiplier = 1.7;
        } else {
          // Desktop
          baseRadius = Math.min(340, 180 + totalChips * 14);
          outerMultiplier = 1.8;
        }

        return { finalRadius: baseRadius, outerMultiplier };
      };

      // Set initial states for category texts
      categoryTexts.forEach((text) => {
        gsap.set(text, {
          opacity: 0,
          scale: 0.5,
          y: 30,
        });
      });

      // Set initial states for all chips - hidden at outer orbit.
      // IMPORTANT: xPercent/yPercent: -50 replicate the CSS
      // `transform: translate(-50%, -50%)` centering. Once GSAP owns the
      // transform (because we animate x/y), it must be told about this
      // offset explicitly, or every chip's top-left corner (not its
      // center) gets placed on the circle math, throwing the whole ring
      // off-center by half a chip's width/height.
      allChips.forEach((chip) => {
        gsap.set(chip, {
          xPercent: -50,
          yPercent: -50,
          opacity: 0,
          scale: 0,
          x: 0,
          y: 0,
          rotation: 0,
        });
      });

      // Initially hide all orbit rings
      rings.forEach((ring) => {
        gsap.set(ring, {
          opacity: 0,
          scale: 0.8,
        });
      });

      // Create timeline with ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=900%",
          scrub: 1.2,
          pin: true,
          pinSpacing: true,
          invalidateOnRefresh: true,
        },
      });

      // Intro text fades out
      tl.to(
        intro,
        {
          opacity: 0,
          y: -120,
          scale: 0.7,
          duration: 0.3,
          ease: "power2.out",
        },
        0,
      );

      let currentTime = 0.1;

      skillGroups.forEach((group, groupIndex) => {
        const groupChips = section.querySelectorAll<HTMLElement>(
          `.skill-chip[data-group="${groupIndex}"]`,
        );
        const categoryText = section.querySelector<HTMLElement>(
          `.category-text[data-group="${groupIndex}"]`,
        );
        const orbitRing = section.querySelector<HTMLElement>(
          `.orbit-ring[data-group="${groupIndex}"]`,
        );

        if (!categoryText) return;

        // Calculate circle positions for chips with responsive radius
        const chipsArray = Array.from(groupChips);
        const totalChips = chipsArray.length;
        const { finalRadius, outerMultiplier } =
          getResponsiveRadius(totalChips);
        const outerRadius = finalRadius * outerMultiplier;

        // Pre-calculate final and starting positions.
        // Angles are evenly distributed (360 / totalChips) around the
        // circle starting at the top (-90deg), so every chip sits exactly
        // on the ring with no left/right bias.
        const angleOffset = groupIndex === 1 ? Math.PI * 0.35 : 0;
        chipsArray.forEach((chip, i) => {
          const angle =
            (i / totalChips) * Math.PI * 2 - Math.PI / 2 + angleOffset;
          const finalX = Math.cos(angle) * finalRadius;
          const finalY = Math.sin(angle) * finalRadius;
          const startX = Math.cos(angle) * outerRadius;
          const startY = Math.sin(angle) * outerRadius;
          chip.dataset.finalX = finalX.toString();
          chip.dataset.finalY = finalY.toString();
          chip.dataset.startX = startX.toString();
          chip.dataset.startY = startY.toString();
          chip.dataset.angle = angle.toString();
        });

        // Set initial chip positions at outer radius (invisible).
        // xPercent/yPercent kept at -50 so each chip is truly centered
        // on its (startX, startY) point regardless of its own width.
        chipsArray.forEach((chip) => {
          const startX = parseFloat(chip.dataset.startX || "0");
          const startY = parseFloat(chip.dataset.startY || "0");
          gsap.set(chip, {
            xPercent: -50,
            yPercent: -50,
            x: startX,
            y: startY,
            scale: 0,
            opacity: 0,
            rotation: 0,
          });
        });

        // --- STEP 1: Show category text first in center ---
        tl.to(
          categoryText,
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            ease: "back.out(1.8)",
          },
          currentTime,
        );

        // Text pulse effect
        tl.to(
          categoryText,
          {
            scale: 1.05,
            duration: 0.15,
            ease: "power1.out",
          },
          currentTime + 0.4,
        );

        tl.to(
          categoryText,
          {
            scale: 1,
            duration: 0.15,
            ease: "power1.in",
          },
          currentTime + 0.55,
        );

        // Show the orbit ring (circular track)
        if (orbitRing) {
          // Update ring size based on responsive radius
          const ringDiameter = finalRadius * 2 + 40;
          gsap.set(orbitRing, {
            width: ringDiameter,
            height: ringDiameter,
            xPercent: -50,
            yPercent: -50,
          });
          tl.to(
            orbitRing,
            {
              opacity: 0.3,
              scale: 1,
              duration: 0.4,
              ease: "power2.out",
            },
            currentTime + 0.6,
          );
        }

        // --- STEP 2: Text is visible, now animate chips circling in ---
        const skillStartTime = currentTime + 0.7;
        // Faster stagger on mobile for smoother feel
        const chipStagger = window.innerWidth < 640 ? 0.08 : 0.12;

        chipsArray.forEach((chip, i) => {
          const startPosition = skillStartTime + i * chipStagger;
          // Shorter duration on mobile
          const duration = window.innerWidth < 640 ? 0.35 : 0.5;

          const finalX = parseFloat(chip.dataset.finalX || "0");
          const finalY = parseFloat(chip.dataset.finalY || "0");
          const angle = parseFloat(chip.dataset.angle || "0");

          // Phase 1: Quick pop-in at outer position (become visible)
          tl.to(
            chip,
            {
              opacity: 1,
              scale: 0.8,
              duration: 0.06,
              ease: "power1.out",
            },
            startPosition,
          );

          // Phase 2: Orbit inward along a spiral path
          const midAngle = angle + 0.1;
          const midRadius = (outerRadius + finalRadius) / 2;
          const midX = Math.cos(midAngle) * midRadius;
          const midY = Math.sin(midAngle) * midRadius;

          // Move from outer to mid point (spiral inward curve).
          // xPercent/yPercent: -50 is re-asserted on every tween that
          // touches x/y so the centering offset can never be dropped.
          tl.to(
            chip,
            {
              xPercent: -50,
              yPercent: -50,
              x: midX,
              y: midY,
              scale: 1,
              rotation: angle * (180 / Math.PI) * 0.08,
              duration: duration * 0.5,
              ease: "power2.out",
            },
            startPosition + 0.06,
          );

          // Settle into final circle position — this is the exact point
          // on the ring, centered, for every chip regardless of text
          // width.
          tl.to(
            chip,
            {
              xPercent: -50,
              yPercent: -50,
              x: finalX,
              y: finalY,
              scale: 1,
              rotation: 0,
              duration: duration * 0.5,
              ease: "back.out(1.5)",
            },
            startPosition + 0.06 + duration * 0.5,
          );

          // Glow highlight on final placement
          tl.to(
            chip,
            {
              boxShadow: "0 0 30px rgba(59,130,246,0.18)",
              duration: 0.1,
              ease: "power1.out",
            },
            startPosition + duration + 0.05,
          );

          tl.to(
            chip,
            {
              boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
              duration: 0.1,
              ease: "power1.in",
            },
            startPosition + duration + 0.15,
          );
        });

        // --- STEP 3: Keep visible for a moment, then transition out ---
        const lastChipTime =
          skillStartTime +
          (totalChips - 1) * chipStagger +
          (window.innerWidth < 640 ? 0.35 : 0.5);
        const displayTime = 0.3;
        const transitionTime = lastChipTime + displayTime;

        // Fade out category text
        tl.to(
          categoryText,
          {
            opacity: 0,
            scale: 0.5,
            y: -50,
            duration: 0.4,
            ease: "power2.in",
          },
          transitionTime,
        );

        // Hide orbit ring
        if (orbitRing) {
          tl.to(
            orbitRing,
            {
              opacity: 0,
              scale: 0.8,
              duration: 0.3,
              ease: "power2.in",
            },
            transitionTime,
          );
        }

        // Scatter chips outward (reverse orbit - fly outward)
        chipsArray.forEach((chip, i) => {
          const scatterDelay = transitionTime + 0.1 + (i / totalChips) * 0.03;
          const angle = parseFloat(chip.dataset.angle || "0");
          const scatterRadius = outerRadius * 1.4;
          const scatterX = Math.cos(angle + 0.3) * scatterRadius;
          const scatterY = Math.sin(angle + 0.3) * scatterRadius;

          tl.to(
            chip,
            {
              xPercent: -50,
              yPercent: -50,
              x: scatterX,
              y: scatterY,
              opacity: 0,
              scale: 0.3,
              rotation: angle * (180 / Math.PI) * 0.3,
              duration: 0.35,
              ease: "power2.in",
            },
            scatterDelay,
          );
        });

        // Reset chips for next group
        tl.call(
          () => {
            groupChips.forEach((chip) => {
              gsap.set(chip, {
                xPercent: -50,
                yPercent: -50,
                x: 0,
                y: 0,
                scale: 0,
                opacity: 0,
                rotation: 0,
              });
            });
          },
          [],
          transitionTime + 0.5,
        );

        // Update current time for next group
        currentTime = transitionTime + 0.6;
      });

      // Final subtle celebration
      const finalChipTime = currentTime;

      tl.to(
        section,
        {
          backgroundColor: "rgba(59,130,246,0.03)",
          duration: 0.5,
          ease: "power1.out",
          clearProps: "backgroundColor",
        },
        finalChipTime + 0.2,
      );
    }, wrapRef);

    return () => {
      ctx.revert();
    };
  }, []);

  // Only show Frontend and Backend groups (index 0 and 1)
  const techSkills = skillGroups.slice(0, 2);

  return (
    <div ref={wrapRef} className="relative">
      <section
        ref={sectionRef}
        className="skill-panel relative min-h-screen w-full overflow-hidden"
      >
        {/* Intro text */}
        <div className="skill-intro absolute inset-0 z-10 flex flex-col items-center justify-center px-4 sm:px-6 text-center pointer-events-none">
          <div className="space-y-3 sm:space-y-4 md:space-y-6">
            <span className="inline-block text-[10px] xs:text-xs font-mono uppercase tracking-widest px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-white bg-ink">
              Skills & Expertise
            </span>
            <h3 className="font-grotesk font-bold tracking-tight text-[12vw] sm:text-[8vw] md:text-[6vw] lg:text-[5vw] leading-[0.9]">
              Frontend & Backend
            </h3>
            <p className="text-xs xs:text-sm sm:text-base text-slate-500 max-w-md mx-auto">
              Scroll to explore each category
            </p>
          </div>
        </div>

        {/* Skills container */}
        <div className="absolute inset-0 flex items-center justify-center px-3 sm:px-6 md:px-10">
          <div className="skill-panel-inner relative w-full max-w-6xl h-[75vh] xs:h-[80vh] sm:h-[85vh] flex items-center justify-center">
            {/* Category text in center */}
            {techSkills.map((group, groupIndex) => (
              <div
                key={group.label}
                className="category-text absolute text-center z-20 pointer-events-none"
                data-group={groupIndex}
                style={{ opacity: 0 }}
              >
                <div className="relative">
                  <span className="text-[8vw] xs:text-[7vw] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold font-grotesk tracking-tight">
                    {group.label}
                  </span>
                  <div className="mt-2 sm:mt-3 flex items-center justify-center gap-2 sm:gap-3">
                    <div className="w-6 sm:w-10 h-px" />
                    <span className="text-[8px] xs:text-[10px] sm:text-xs font-mono text-slate-400 tracking-widest">
                      skills
                    </span>
                    <div className="w-6 sm:w-10 h-px bg-gradient-to-l from-transparent to-blue-400/30" />
                  </div>
                </div>
              </div>
            ))}

            {/* Skill chips positioned in a circle with orbit ring */}
            <div className="relative w-full h-full">
              {techSkills.map((group, groupIndex) => (
                <div key={group.label}>
                  {/* Orbit ring - circular track around which skills orbit.
                      Positioning uses left/top: 50% for the anchor point;
                      GSAP owns the centering (xPercent/yPercent: -50) once
                      the timeline starts animating it, so no separate
                      inline `transform` is set here. */}
                  <div
                    className="orbit-ring absolute pointer-events-none"
                    data-group={groupIndex}
                    style={{
                      left: "50%",
                      top: "50%",
                      borderRadius: "50%",
                      border: "1.5px dashed rgba(59,130,246,0.25)",
                      opacity: 0,
                    }}
                  />
                  {group.items.map((item) => {
                    const slug = skillIconSlugs[item];
                    return (
                      <span
                        key={item}
                        className="skill-chip absolute inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-slate-200/60 bg-white/95 backdrop-blur-sm px-2 sm:px-3.5 py-1 sm:py-2 text-[10px] xs:text-xs sm:text-sm font-medium text-slate-700 shadow-sm transition-all duration-300 cursor-default hover:shadow-md hover:scale-105"
                        data-group={groupIndex}
                        style={{
                          visibility: "visible",
                          left: "50%",
                          top: "50%",
                          whiteSpace: "nowrap",
                        }}
                      >
                        <span className="grid place-items-center h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 shrink-0">
                          {slug ? (
                            <img
                              src={iconUrl(slug)}
                              alt=""
                              aria-hidden
                              loading="lazy"
                              className="h-2.5 w-2.5 xs:h-3 xs:w-3 sm:h-3.5 sm:w-3.5"
                            />
                          ) : (
                            <span className="text-[7px] xs:text-[8px] sm:text-[9px] font-mono font-bold text-slate-400">
                              {item.slice(0, 2).toUpperCase()}
                            </span>
                          )}
                        </span>
                        <span>{item}</span>
                      </span>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Progress indicator - hidden on mobile/tablet */}
        <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col items-end gap-4">
          {techSkills.map((group, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-[9px] font-mono tracking-widest">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="w-px h-8" />
              <span className="text-[10px] font-mono uppercase tracking-widest">
                {group.label.replace(" ", "").slice(0, 8)}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
