import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import AboutIntro from "@/components/AboutIntro";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Capabilities from "@/components/Capabilities";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import ToolsMarquee from "@/components/ToolsMarquee";

export const metadata: Metadata = {
  title: "About — Mahmudul Hasan",
  description:
    "Full Stack Developer specializing in React.js, Next.js, and the MERN stack — experience, education, certifications, and skills.",
};

export default function AboutPage() {
  return (
    <>
      <Cursor />
      <Navbar />
      <main>
        <AboutIntro />
        <Experience />
        <Skills />
        <ToolsMarquee />
        <Capabilities />
      </main>
      <Footer />
    </>
  );
}
