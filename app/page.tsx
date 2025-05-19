import { LanguageToggle } from "@/components/language-toggle"
import { ThemeToggle } from "@/components/theme-toggle"
import { Hero } from "@/components/hero"
import { WhySection } from "@/components/why-section"
import { CoursesSection } from "@/components/courses-section"
import { ComingSoonSection } from "@/components/coming-soon-section"
import { Footer } from "@/components/footer"
import { LanguageProvider } from "@/components/language-provider"

export default function Home() {
  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col">
        <header className="container mx-auto py-4 px-4 flex justify-between items-center">
          <div className="font-mono text-lg font-bold">
            AI<span className="text-primary">Dev</span>Hub
          </div>
          <div className="flex items-center gap-4">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </header>

        <main className="flex-grow">
          <Hero />
          <WhySection />
          <CoursesSection />
          <ComingSoonSection />
        </main>

        <Footer />
      </div>
    </LanguageProvider>
  )
}
