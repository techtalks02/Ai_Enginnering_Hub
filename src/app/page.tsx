import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/landing/hero";
import { ReadyToMasterSection } from "@/components/landing/ready-to-master";
import { LearningPathsSection } from "@/components/landing/learning-paths";
import { CurriculumSection } from "@/components/landing/curriculum";
import { WhoThisIsForSection } from "@/components/landing/who-this-is-for";
import { WhatsIncludedSection } from "@/components/landing/whats-included";
import { SampleProjectsSection } from "@/components/landing/sample-projects";
import { FaqSection } from "@/components/landing/faq";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="pb-20 sm:pb-0">
        <HeroSection />
        <ReadyToMasterSection />
        <LearningPathsSection />
        <CurriculumSection />
        <WhoThisIsForSection />
        <WhatsIncludedSection />
        <SampleProjectsSection />
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}
