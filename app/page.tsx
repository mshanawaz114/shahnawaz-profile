import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";

// Lazy-loaded on the client so the 50+KB of chat JS doesn't hit the initial paint.
const ChatWidget = dynamic(
  () => import("@/components/chatbot/ChatWidget").then((m) => m.ChatWidget),
  { ssr: false },
);

export default function HomePage() {
  return (
    <>
      <Nav />
      <main id="main" className="relative">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
