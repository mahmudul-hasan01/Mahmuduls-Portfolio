"use client";

interface FloatingMessageButtonProps {
  onClick: () => void;
}

export default function FloatingMessageButton({
  onClick,
}: FloatingMessageButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-ink text-paper rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all duration-200 flex items-center justify-center group"
      aria-label="Open contact form"
    >
      {/* Message icon */}
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="group-hover:rotate-[-8deg] transition-transform duration-200"
      >
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    </button>
  );
}
