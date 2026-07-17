export type Project = {
  id: string;
  name: string;
  category: string;
  services: string;
  year: string;
  color: string; // preview swatch background
  accent: string; // preview swatch secondary tone
  link?: string;
  stack: string[];
  features: string[];
};

// TODO: replace `link: "#"` with each project's real live URL —
// the CV only exposed "Live-Link" as anchor text, not the underlying href.
export const allProjects: Project[] = [
  {
    id: "sarmeadors",
    name: "Sarmeadors",
    category: "SaaS",
    services: "Design & development",
    year: "2025",
    color: "#cfd6dd",
    accent: "#121210",
    link: "#",
    stack: [
      "Next.js",
      "Redux",
      "Stripe.js",
      "Tailwind CSS",
      "GSAP",
      "Apexcharts",
      "Socket.io",
      "Zod",
    ],
    features: [
      "Multi-tenant SaaS recruitment platform for managing hiring operations across multiple companies.",
      "Customizable company dashboards with branding, form, color, and text customization.",
      "Role-based dashboards for Super Admin, Admin, Client, Candidate, and Agency users.",
      "Secure authentication, authorization, and protected route management for every role.",
      "Job posting, candidate management, application tracking, and recruitment workflow handling.",
    ],
  },
  {
    id: "tag-growth",
    name: "Tag Growth",
    category: "Marketplace",
    services: "Design & development",
    year: "2025",
    color: "#e7e2d6",
    accent: "#121210",
    link: "#",
    stack: [
      "Next.js",
      "Redux",
      "Stripe.js",
      "Recharts",
      "Tailwind CSS",
      "Swiper.js",
      "Shadcn UI",
      "Socket.io",
    ],
    features: [
      "Freelancer marketplace platform connecting clients and resellers.",
      "Job posting and hiring system letting clients post projects and select resellers based on proposals.",
      "Secure online payment methods for project payments and transactions.",
      "Multi-role authentication and authorization with dedicated dashboards for User, Client, Reseller, and Admin.",
    ],
  },
  {
    id: "ez-book-solution",
    name: "EZ Book Solution",
    category: "E-commerce",
    services: "Design & development",
    year: "2024",
    color: "#d8cdb8",
    accent: "#121210",
    link: "#",
    stack: [
      "Next.js",
      "Redux",
      "Stripe.js",
      "Recharts",
      "Tailwind CSS",
      "Shadcn UI",
      "Framer Motion",
      "Apexcharts",
    ],
    features: [
      "Super shop management system for retail operations.",
      "Multi-role authentication with User, Owner, Admin, and Super Admin access levels.",
      "Role-based dashboards with different permissions and features per user type.",
      "CRM module where owners manage customers, track sales, and monitor business performance.",
    ],
  },
  {
    id: "redefine-gaming",
    name: "Redefine Gaming",
    category: "Interactive",
    services: "Design & development",
    year: "2024",
    color: "#dad0d6",
    accent: "#121210",
    link: "#",
    stack: ["Next.js", "Tailwind CSS", "GSAP"],
    features: [
      "Award-winning interactive website with modern UI/UX design and immersive user experience.",
      "Scroll-based animations and cinematic transitions using GSAP for smooth, engaging interactions.",
      "Background music functionality with custom audio controls: play, pause, and mute.",
    ],
  },
];

// Homepage shows the full project set — there are only four, and each is real work.
export const projects: Project[] = allProjects;

export const featured = [allProjects[0], allProjects[1], allProjects[3]];

export const filterTabs = [
  { key: "all", label: "All" },
  ...Array.from(new Set(allProjects.map((p) => p.category))).map((c) => ({
    key: c.toLowerCase(),
    label: c,
  })),
];

export function countByTag(tag: string) {
  if (tag === "all") return allProjects.length;
  return allProjects.filter((p) => p.category.toLowerCase() === tag).length;
}
