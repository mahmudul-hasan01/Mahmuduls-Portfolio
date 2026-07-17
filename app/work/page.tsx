import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import WorkExplorer from "@/components/WorkExplorer";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";

export const metadata: Metadata = {
  title: "Work — Mahmudul Hasan",
  description:
    "Projects by Mahmudul Hasan — SaaS platforms, marketplaces, e-commerce systems, and interactive sites built with Next.js, React, and the MERN stack.",
};

export default function WorkPage() {
  return (
    <>
      <Cursor />
      <Navbar />
      <main>
        <WorkExplorer />
      </main>
      <Footer />
    </>
  );
}
