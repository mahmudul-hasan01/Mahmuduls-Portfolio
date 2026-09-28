import portfolioProjects from "@/data/portfolio-projects.json";

export type Project = {
  id: string;
  name: string;
  category: string;
  services: string;
  year: string;
  color: string; // preview swatch background
  accent: string; // preview swatch secondary tone
  link?: string;
  description?: string;
  stack: string[];
  features: string[];
};

type PortfolioProject = {
  id?: string;
  name?: string;
  category?: string;
  services?: string;
  year?: string;
  color?: string;
  accent?: string;
  link?: string;
  description?: string;
  stack?: string[];
  features?: string[];
};

const normalizedProjects: Project[] = (
  portfolioProjects as PortfolioProject[]
).map((project, index) => ({
  id: project.id ?? `project-${index}`,
  name: project.name ?? `Project ${index + 1}`,
  category: project.category ?? "General",
  services: project.services ?? "Design & development",
  year: project.year ?? "2025",
  color: project.color ?? "#cfd6dd",
  accent: project.accent ?? "#121210",
  link: project.link ?? "/work",
  description: project.description,
  stack: project.stack ?? [],
  features: project.features ?? [],
}));

export const allProjects: Project[] = normalizedProjects;

export const projects: Project[] = allProjects.slice(0, 4);

export const featured = allProjects.slice(0, 3);

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
