"use client"

import { useLanguage } from "./language-provider"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Braces, Users, GitBranch } from "lucide-react"

export function ComingSoonSection() {
  const { t } = useLanguage()

  const comingSoon = [
    {
      icon: <Braces className="h-8 w-8 text-primary" />,
      title: t("coming.labs"),
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: t("coming.community"),
    },
    {
      icon: <GitBranch className="h-8 w-8 text-primary" />,
      title: t("coming.paths"),
    },
  ]

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">{t("coming.title")}</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {comingSoon.map((item, index) => (
            <Card key={index} className="relative overflow-hidden border-dashed">
              <div className="absolute top-0 right-0 p-2">
                <Badge variant="secondary" className="bg-primary/10 text-primary border-none">
                  {t("coming.soon")}
                </Badge>
              </div>
              <CardContent className="pt-12 pb-8 flex flex-col items-center text-center">
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-lg font-medium">{item.title}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
