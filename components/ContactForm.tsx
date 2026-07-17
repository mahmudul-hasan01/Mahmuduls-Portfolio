"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactForm({ isOpen, onClose }: ContactFormProps) {
  const formRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!formRef.current || !overlayRef.current) return;

    if (isOpen) {
      document.body.style.overflow = "hidden";

      // Animate overlay in
      gsap.to(overlayRef.current, {
        opacity: 1,
        pointerEvents: "auto",
        duration: 0.3,
        ease: "power2.out",
      });

      // Animate form sliding up
      gsap.fromTo(
        formRef.current,
        {
          y: "100%",
          opacity: 0,
        },
        {
          y: "0%",
          opacity: 1,
          duration: 0.5,
          ease: "power4.out",
        },
      );
    } else {
      document.body.style.overflow = "";

      // Animate form sliding down
      gsap.to(formRef.current, {
        y: "100%",
        opacity: 0,
        duration: 0.4,
        ease: "power3.in",
      });

      // Animate overlay out
      gsap.to(overlayRef.current, {
        opacity: 0,
        pointerEvents: "none",
        duration: 0.3,
        ease: "power2.out",
        delay: 0.1,
      });
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Reset form when opened
  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production you'd send this to an API
    console.log("Form submitted:", formData);
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center">
      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm opacity-0 pointer-events-none cursor-pointer"
      />

      {/* Form Panel */}
      <div
        ref={formRef}
        className="relative w-full max-w-lg bg-[#f1efe9] rounded-t-3xl shadow-2xl border border-ink/10 overflow-hidden"
        style={{ y: "100%", opacity: 0 }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-ink/10 hover:bg-ink/20 transition-colors flex items-center justify-center text-ink/60 hover:text-ink z-10"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <path d="M4 4l8 8M12 4l-8 8" />
          </svg>
        </button>

        {/* Decorative top line */}
        <div className="w-12 h-1 bg-ink/20 rounded-full mx-auto mt-3 mb-2" />

        <div className="px-6 pb-8 pt-4">
          {submitted ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <h3 className="font-display text-2xl text-ink mb-2">
                Message Sent!
              </h3>
              <p className="text-ink/60 text-sm">
                Thank you! I'll get back to you soon.
              </p>
              <button
                onClick={onClose}
                className="mt-6 px-6 py-2 bg-ink text-paper rounded-full text-sm font-mono uppercase tracking-widest hover:opacity-80 transition-opacity"
              >
                Close
              </button>
            </div>
          ) : (
            <>
              <div className="text-center mb-6">
                <h3 className="font-display italic text-3xl text-ink">
                  Let's talk
                </h3>
                <p className="text-ink/50 text-sm mt-1 font-mono uppercase tracking-wider text-xs">
                  Send me a message
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs font-mono uppercase tracking-widest text-ink/50 mb-1.5"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="w-full px-4 py-3 bg-white border border-ink/10 rounded-xl text-ink placeholder:text-ink/30 text-sm focus:outline-none focus:border-ink/30 transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-mono uppercase tracking-widest text-ink/50 mb-1.5"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 bg-white border border-ink/10 rounded-xl text-ink placeholder:text-ink/30 text-sm focus:outline-none focus:border-ink/30 transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-mono uppercase tracking-widest text-ink/50 mb-1.5"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Tell me about your project..."
                    className="w-full px-4 py-3 bg-white border border-ink/10 rounded-xl text-ink placeholder:text-ink/30 text-sm focus:outline-none focus:border-ink/30 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-ink text-paper rounded-xl font-mono uppercase tracking-widest text-sm hover:opacity-90 transition-opacity"
                >
                  Send Message
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
