// import { NavbarDemo } from "@/components/navbar-demo";
import { HeroSection } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { SkillsSection } from "@/components/sections/skills";
import { ProjectsSection } from "@/components/sections/projects";
import { ExperienceSection } from "@/components/sections/experience";
import { ContactSection } from "@/components/sections/contact";
// import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <main className="relative w-full">
      {/* <main className="overflow-x-hidden"> */}
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      {/* </main> */}
      {/* <Footer /> */}
    </main>
  );
}
