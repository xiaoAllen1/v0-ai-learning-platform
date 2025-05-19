"use client"

import { useLanguage } from "./language-provider"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

export function Hero() {
  const { t } = useLanguage()

  const scrollToWhy = () => {
    const whySection = document.getElementById("why-section")
    if (whySection) {
      whySection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            {t("hero.headline")}
          </h1>
          <h2 className="text-xl md:text-2xl font-medium mb-6 text-foreground/80">{t("hero.subheadline")}</h2>
          <p className="text-md md:text-lg mb-8 max-w-2xl mx-auto text-foreground/70">{t("hero.description")}</p>
          <Button onClick={scrollToWhy} className="group">
            <span>Explore</span>
            <ChevronDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
          </Button>
        </div>
      </div>

      {/* Code-like decorative elements */}
      <div className="hidden md:block absolute -left-20 top-1/4 text-primary/20 font-mono text-sm">
        <div>import &#123; AI &#125; from 'future';</div>
        <div>const knowledge = await AI.learn();</div>
      </div>
      <div className="hidden md:block absolute -right-20 bottom-1/4 text-primary/20 font-mono text-sm">
        <div>function buildSkills() &#123;</div>
        <div>&nbsp;&nbsp;return expertise;</div>
        <div>&#125;</div>
      </div>
    </section>
  )
}
