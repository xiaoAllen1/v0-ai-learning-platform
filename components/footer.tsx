"use client"

import { useLanguage } from "./language-provider"
import { Github, Twitter, MessageSquare } from "lucide-react"

export function Footer() {
  const { t } = useLanguage()

  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-8 border-t border-border/40">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="font-mono text-lg font-bold mb-4 md:mb-0">
            AI<span className="text-primary">Dev</span>Hub
          </div>

          <div className="flex items-center space-x-6">
            <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
              <Github className="h-5 w-5" />
              <span className="sr-only">{t("footer.github")}</span>
            </a>
            <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">{t("footer.twitter")}</span>
            </a>
            <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
              <MessageSquare className="h-5 w-5" />
              <span className="sr-only">{t("footer.discord")}</span>
            </a>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-foreground/50">
          © {currentYear} AIDevHub. Built by engineers, for engineers.
        </div>
      </div>
    </footer>
  )
}
