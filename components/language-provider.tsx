"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "en" | "zh"

type LanguageContextType = {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Hero
    "hero.headline": "Learn AI Without the Hype.",
    "hero.subheadline": "A hands-on AI learning hub built for everyday software engineers.",
    "hero.description":
      "You've seen the AI buzz. But where do you start as a backend/frontend/fullstack dev? This platform makes it dead simple to build a real foundation — one step at a time.",

    // Why section
    "why.title": "Why This Platform?",
    "why.pain1": "Most AI courses are made for researchers, not developers.",
    "why.pain2": "Too much theory, not enough application.",
    "why.pain3": "Tools move fast. You need practical skills that stick.",
    "why.conclusion": "We built this platform to bridge that gap.",

    // Courses section
    "courses.mini.title": "Mini Courses",
    "courses.mini.description": "Short, beginner-friendly lessons designed to teach one AI concept at a time.",
    "courses.mini.status": "To Be Developed",
    "courses.tutorials.title": "AI Dev Tutorials",
    "courses.tutorials.description":
      'How to integrate AI into real-world apps (e.g., "Use GPT in your Flask app", "Add AI search to your product").',
    "courses.tutorials.status": "To Be Developed",
    "courses.digest.title": "Daily AI Digest",
    "courses.digest.description":
      "Curated bite-sized summaries of top tools, papers, GitHub repos. Optimized for busy engineers.",
    "courses.digest.status": "To Be Developed",

    // Coming soon
    "coming.title": "What's Coming Next?",
    "coming.labs": "Interactive Code Labs",
    "coming.community": "Community AI Q&A",
    "coming.paths": "Personalized Learning Paths",
    "coming.soon": "Coming Soon",

    // Footer
    "footer.github": "GitHub",
    "footer.twitter": "Twitter",
    "footer.discord": "Discord",
  },
  zh: {
    // Hero
    "hero.headline": "学习AI，不夸大其词。",
    "hero.subheadline": "为日常软件工程师打造的实用AI学习平台。",
    "hero.description":
      "你已经看到了AI的热潮。但作为后端/前端/全栈开发者，从哪里开始呢？这个平台让你能够一步一步地建立真正的基础。",

    // Why section
    "why.title": "为什么选择这个平台？",
    "why.pain1": "大多数AI课程是为研究人员设计的，而不是开发者。",
    "why.pain2": "太多理论，太少应用。",
    "why.pain3": "工具发展迅速。你需要实用且持久的技能。",
    "why.conclusion": "我们建立这个平台来弥合这个差距。",

    // Courses section
    "courses.mini.title": "迷你课程",
    "courses.mini.description": "简短、适合初学者的课程，旨在一次教授一个AI概念。",
    "courses.mini.status": "即将推出",
    "courses.tutorials.title": "AI开发教程",
    "courses.tutorials.description": '如何将AI集成到实际应用中（例如，"在Flask应用中使用GPT"，"为产品添加AI搜索"）。',
    "courses.tutorials.status": "即将推出",
    "courses.digest.title": "每日AI摘要",
    "courses.digest.description": "精选的顶级工具、论文、GitHub仓库的简明摘要。为忙碌的工程师优化。",
    "courses.digest.status": "即将推出",

    // Coming soon
    "coming.title": "即将推出",
    "coming.labs": "交互式代码实验室",
    "coming.community": "社区AI问答",
    "coming.paths": "个性化学习路径",
    "coming.soon": "即将推出",

    // Footer
    "footer.github": "GitHub",
    "footer.twitter": "Twitter",
    "footer.discord": "Discord",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  const t = (key: string) => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
