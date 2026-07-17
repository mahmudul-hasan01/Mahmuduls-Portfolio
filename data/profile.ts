export const profile = {
  name: "Mahmudul Hasan",
  firstName: "Mahmudul",
  lastName: "Hasan",
  title: "Full Stack Developer",
  roles: ["Full Stack Developer", "Front-End Developer", "MERN Stack"],
  location: "Dhaka, Bangladesh",
  phone: "01612189499",
  email: "mahamudul2018@gmail.com",
  github: "https://github.com/mahmudul-hasan01",
  linkedin: "https://linkedin.com/in/mahmudul-hasan-66331332b",
  bio: "Passionate Front-End Developer with expertise in React.js, JavaScript, and Tailwind CSS, dedicated to building responsive and user-friendly web applications. Eager to leverage my skills in MERN stack development to create efficient and innovative digital solutions that enhance user experience.",
  bioShort:
    "I design and build modern digital experiences that blend design and code.",
  bioSecondary:
    "Since Aug 2024 I've worked as a front-end developer with agencies in Dhaka, shipping production SaaS platforms, marketplaces, and interactive sites used by real businesses. Committed to continuous learning and contributing to dynamic projects.",
};

export type Experience = {
  role: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
  current?: boolean;
};

export const experience: Experience[] = [
  {
    role: "Front End Developer",
    company: "Backbencher Studio",
    location: "Banasree, Dhaka",
    period: "May 2025 — Running",
    current: true,
    bullets: [
      "Built responsive and high-performance web applications using React.js, Next.js, Tailwind CSS.",
      "Developed server-side rendered (SSR) and static websites using Next.js for better SEO and performance optimization.",
      "Integrated REST APIs and resolved CORS issues by configuring proxies, backend headers, and secure API communication.",
      "Created reusable UI components and maintained scalable project architecture.",
      "Ensured cross-browser compatibility and mobile responsiveness across different screen sizes.",
      "Collaborated with backend developers, designers, and QA teams to deliver clean, production-ready applications.",
    ],
  },
  {
    role: "Jr. Front End Developer",
    company: "Virex_BD",
    location: "Uttara, Dhaka",
    period: "Aug 2024 — Feb 2025",
    bullets: [
      "Designed and implemented the visual layout, navigation, and interactive elements of a website or application.",
      "Utilized frameworks and libraries to streamline development.",
      "Ensured cross-browser compatibility and responsiveness across different devices.",
      "Worked closely with back-end developers, designers, and other stakeholders.",
    ],
  },
];

export type Education = {
  degree: string;
  school: string;
  subject?: string;
  period: string;
};

export const education: Education[] = [
  {
    degree: "Honours",
    school: "Subidkhali Govt College",
    subject: "Political Science",
    period: "2023 — Running",
  },
  {
    degree: "HSC",
    school: "Subidkhali Govt College",
    period: "2021 — 2022",
  },
];

export type Certification = {
  title: string;
  from: string;
  period: string;
  duration: string;
};

export const certifications: Certification[] = [
  {
    title: "MERN Stack Advanced (L-2)",
    from: "Programming Hero",
    period: "Oct 2024 — Apr 2025",
    duration: "06 Months",
  },
  {
    title: "MERN Stack Complete Web Development (L-1)",
    from: "Programming Hero",
    period: "Jun 2024 — Dec 2024",
    duration: "06 Months",
  },
];

export type SkillGroup = {
  label: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  {
    label: "Frontend",
    items: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "Next.js",
      "React.js",
      "Redux",
      "Tailwind CSS",
      "GSAP",
    ],
  },
  {
    label: "Backend",
    items: [
      "Node.js",
      "Express.js",
      "Nest.js",
      "Golang",
      "Webhook",
      "WebSocket",
      "Socket.IO",
      "BullMQ",
    ],
  },
  {
    label: "Database",
    items: [
      "MongoDB",
      "Mongoose",
      "PostgreSQL",
      "Prisma",
      "Redis",
      "MongoDB",
      "Mongoose",
      "PostgreSQL",
      "Prisma",
      "Redis",
      "MongoDB",
      "Mongoose",
      "PostgreSQL",
      "Prisma",
      "Redis",
    ],
  },
  {
    label: "Tools",
    items: [
      "Nodemailer",
      "Github",
      "VS Code",
      "Netlify",
      "Vercel",
      "Firebase",
      "NPM",
      "React Router",
      "Figma",
      "UI/UX",
      "Nodemailer",
      "Github",
      "VS Code",
      "Netlify",
      "Vercel",
      "Firebase",
      "NPM",
      "React Router",
      "Figma",
      "UI/UX",
    ],
  },
];

export const languages = [
  { name: "Bengla", level: "Native" },
  { name: "English", level: "Intermediate" },
  { name: "Hindi", level: "Fluent" },
];

export const softSkills = [
  "Communication Skills",
  "Teamwork & Collaboration",
  "Problem Solving",
  "Time Management",
  "Adaptability",
  "Critical Thinking",
  "Leadership",
];

export const extracurricular = ["Badminton", "Cricket", "Football", "Games"];
