"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "./language-provider"

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex items-center space-x-1 font-mono text-sm">
      <Button
        variant={language === "en" ? "default" : "outline"}
        size="sm"
        onClick={() => setLanguage("en")}
        className="h-8 px-2"
      >
        EN
      </Button>
      <Button
        variant={language === "zh" ? "default" : "outline"}
        size="sm"
        onClick={() => setLanguage("zh")}
        className="h-8 px-2"
      >
        中文
      </Button>
    </div>
  )
}
