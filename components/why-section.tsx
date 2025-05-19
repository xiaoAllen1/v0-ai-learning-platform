"use client"

import { useLanguage } from "./language-provider"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, BookOpen, Zap } from "lucide-react"

export function WhySection() {
  const { t } = useLanguage()

  const painPoints = [
    {
      icon: <BookOpen className="h-6 w-6 text-primary" />,
      text: t("why.pain1"),
    },
    {
      icon: <AlertTriangle className="h-6 w-6 text-primary" />,
      text: t("why.pain2"),
    },
    {
      icon: <Zap className="h-6 w-6 text-primary" />,
      text: t("why.pain3"),
    },
  ]

  return (
    <section id="why-section" className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">{t("why.title")}</h2>

          <div className="space-y-6">
            {painPoints.map((point, index) => (
              <Card key={index} className="border-l-4 border-l-primary">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="mt-1">{point.icon}</div>
                  <p className="text-lg">{point.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="mt-8 text-xl font-medium text-center">{t("why.conclusion")}</p>
        </div>
      </div>
    </section>
  )
}
