import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import NoMoreBoringDesign from "@/components/NoMoreBoringDesign";
import Skills from "@/components/Skills";
import ToolsMarquee from "@/components/ToolsMarquee";
import SelectedWork from "@/components/SelectedWork";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";

export default function Home() {
  return (
    <>
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <SelectedWork />
        <Skills />
        <ToolsMarquee />
        <NoMoreBoringDesign />
        {/* <Contact /> */}
      </main>
      <Footer />
    </>
  );
}
