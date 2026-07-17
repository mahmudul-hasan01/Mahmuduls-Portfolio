"use client";

import { skills } from "@/data/profile";
import { skillIconSlugs, iconUrl } from "@/lib/skillIcons";

// Only Database (index 2) and Tools (index 3)
const dbAndTools = skills.slice(2, 4);

// Rotation angles for the X — first band tilts one way, second tilts the other
const rotations = ["-6deg", "6deg"];

export default function ToolsMarquee() {
  return (
    <section className="relative w-full  h-80 md:h-[420px] lg:h-[520px] xl:h-screen bg-[#f1efe9] flex flex-col items-center justify-center overflow-hidden px-4 py-20">
      {/* Section label */}
      <div className="text-center space-y-2 mb-16 sm:mb-20 md:mb-24 relative z-10">
        <span className="inline-block text-[10px] xs:text-xs font-mono uppercase tracking-widest px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-white bg-ink">
          Database & Tools
        </span>
        <h3 className="font-grotesk font-bold tracking-tight text-[10vw] sm:text-[6vw] md:text-[4.5vw] leading-[0.9]">
          Technologies I Use
        </h3>
      </div>

      {/* X-crossed marquee stack */}
      <div className="relative w-full  mx-auto h-[220px] sm:h-[280px] md:h-[340px]">
        {dbAndTools.map((group, index) => (
          <div
            key={group.label}
            className="absolute left-1/2 top-1/2 w-[140%] sm:w-[130%]"
            style={{
              transform: `translate(-50%, -50%) rotate(${rotations[index]})`,
            }}
          >
            {/* Group label — floats above its own band, angled with it */}
            <div className="flex items-center justify-center gap-2 mb-2 sm:mb-3">
              {/* <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-slate-500 bg-[#f1efe9] px-2">
                {group.label}
              </span> */}
            </div>

            {/* Marquee track */}
            <div className="w-full overflow-hidden border-y border-slate-300/40 py-2 sm:py-3 bg-[#f1efe9]/60 backdrop-blur-[1px]">
              <div
                className={`marquee-track ${index % 2 === 0 ? "" : "reverse"}`}
              >
                {/* First set of items */}
                {group.items.map((item) => {
                  const slug = skillIconSlugs[item];
                  return (
                    <span
                      key={item}
                      className="inline-flex items-center gap-2 sm:gap-2.5 rounded-full border border-slate-200/60 bg-white/95 backdrop-blur-sm px-3 sm:px-5 py-2 sm:py-3 text-xs sm:text-sm font-medium text-slate-700 shadow-sm mx-2 sm:mx-3 shrink-0"
                    >
                      <span className="grid place-items-center h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 shrink-0">
                        {slug ? (
                          <img
                            src={iconUrl(slug)}
                            alt=""
                            aria-hidden
                            loading="lazy"
                            className="h-3 w-3 sm:h-3.5 sm:w-3.5"
                          />
                        ) : (
                          <span className="text-[8px] sm:text-[9px] font-mono font-bold text-slate-400">
                            {item.slice(0, 2).toUpperCase()}
                          </span>
                        )}
                      </span>
                      <span>{item}</span>
                    </span>
                  );
                })}
                {/* Duplicate set for seamless loop */}
                {group.items.map((item) => {
                  const slug = skillIconSlugs[item];
                  return (
                    <span
                      key={`${item}-dup`}
                      className="inline-flex items-center gap-2 sm:gap-2.5 rounded-full border border-slate-200/60 bg-white/95 backdrop-blur-sm px-3 sm:px-5 py-2 sm:py-3 text-xs sm:text-sm font-medium text-slate-700 shadow-sm mx-2 sm:mx-3 shrink-0"
                    >
                      <span className="grid place-items-center h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 shrink-0">
                        {slug ? (
                          <img
                            src={iconUrl(slug)}
                            alt=""
                            aria-hidden
                            loading="lazy"
                            className="h-3 w-3 sm:h-3.5 sm:w-3.5"
                          />
                        ) : (
                          <span className="text-[8px] sm:text-[9px] font-mono font-bold text-slate-400">
                            {item.slice(0, 2).toUpperCase()}
                          </span>
                        )}
                      </span>
                      <span>{item}</span>
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
