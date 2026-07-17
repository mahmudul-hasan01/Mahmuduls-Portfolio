export const skillIconSlugs: Record<string, string | null> = {
  // Frontend
  HTML: "html5",
  CSS: "css3",
  JavaScript: "javascript",
  TypeScript: "typescript",
  "Next.js": "nextdotjs",
  "React.js": "react",
  Redux: "redux",
  "Tailwind CSS": "tailwindcss",
  GSAP: "greensock",

  // Backend
  "Node.js": "nodedotjs",
  "Express.js": "express",
  "Nest.js": "nestjs",
  Golang: "go",
  Webhook: null,
  WebSocket: null,
  "Socket.IO": "socketdotio",
  BullMQ: null,

  // Database
  MongoDB: "mongodb",
  Mongoose: null,
  PostgreSQL: "postgresql",
  Prisma: "prisma",
  Redis: "redis",

  // Tools
  Nodemailer: null,
  Github: "github",
  "VS Code": "visualstudiocode",
  Netlify: "netlify",
  Vercel: "vercel",
  Firebase: "firebase",
  NPM: "npm",
  "React Router": "reactrouter",
  Figma: "figma",
  "UI / UX": null,
};

export function iconUrl(slug: string, color = "121210") {
  return `https://cdn.simpleicons.org/${slug}/${color}`;
}
