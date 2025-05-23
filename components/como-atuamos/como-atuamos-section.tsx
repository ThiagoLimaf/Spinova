"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FadeIn } from "@/components/animations/fade-in"
import { StaggerChildren } from "@/components/animations/stagger-children"
import { Users } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/contexts/language-context"
import { t } from "@/utils/translate"

export default function ComoAtuamosSection() {
  const { language } = useLanguage()
  const [activeCategory, setActiveCategory] = useState<string>("software")

  const handleCategoryChange = (value: string) => {
    setActiveCategory(value)
  }

  // Get categories from translations
  const categories = ["software", "innovation", "venture"]

  // Get services for each category from translations
  const getServicesForCategory = (categoryKey: string) => {
    const serviceKeys = {
      software: ["enterpriseSolution", "technologyAdvisory", "digitalTransformation", "vendorManagement"],
      innovation: ["aiImplementation", "executiveAdvisory", "cultureTransformation", "emergingTech"],
      venture: ["corporateVenture", "investmentAdvisory", "acceleratorOperations", "ventureBuilding"],
    }

    return serviceKeys[categoryKey as keyof typeof serviceKeys] || []
  }

  return (
    <section id="como-atuamos" className="py-16 sm:py-24 md:py-32 bg-gray-50/10">
      <div className="container mx-auto">
        <FadeIn className="mx-auto max-w-[58rem] text-center px-4 mb-12">
          <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
            {t("howWeWork.title", language as any)}
          </h2>
          <p className="mt-4 text-muted-foreground sm:text-lg">{t("howWeWork.subtitle", language as any)}</p>
        </FadeIn>

        <Tabs
          defaultValue="software"
          value={activeCategory}
          onValueChange={handleCategoryChange}
          className="w-full max-w-6xl mx-auto"
        >
          <div className="overflow-x-auto pb-4 flex justify-center items-center w-full">
            <TabsList className="inline-flex w-auto h-auto bg-transparent p-0 mb-8">
              {categories.map((categoryKey, index) => (
                <TabsTrigger
                  key={categoryKey}
                  value={categoryKey}
                  className={cn(
                    "px-6 py-3 rounded-md text-base sm:text-lg whitespace-nowrap",
                    "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
                    "data-[state=inactive]:bg-transparent data-[state=inactive]:text-foreground/70",
                    index > 0 ? "ml-2" : "",
                  )}
                >
                  {t(`howWeWork.categories.${categoryKey}.title`, language as any)}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {categories.map((categoryKey) => (
            <TabsContent key={categoryKey} value={categoryKey} className="mt-0 px-4">
              <FadeIn>
                <div className="text-center mb-12">
                  <h3 className="text-2xl font-bold mb-2">
                    {t(`howWeWork.categories.${categoryKey}.subtitle`, language as any)}
                  </h3>
                  <p className="text-muted-foreground max-w-3xl mx-auto">
                    {t(`howWeWork.categories.${categoryKey}.description`, language as any)}
                  </p>
                </div>
              </FadeIn>

              <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-8" staggerDelay={100}>
                {getServicesForCategory(categoryKey).map((serviceKey, index) => (
                  <Card key={index} className="overflow-hidden h-full flex flex-col">
                    <CardHeader className="bg-primary/5 pb-4">
                      <CardTitle className="text-xl">
                        {t(`howWeWork.categories.${categoryKey}.services.${serviceKey}.title`, language as any)}
                      </CardTitle>
                      <p className="text-muted-foreground mt-1">
                        {t(`howWeWork.categories.${categoryKey}.services.${serviceKey}.subtitle`, language as any)}
                      </p>
                    </CardHeader>
                    <CardContent className="pt-6 flex-1 flex flex-col">
                      <p className="text-muted-foreground mb-6">
                        {t(`howWeWork.categories.${categoryKey}.services.${serviceKey}.description`, language as any)}
                      </p>
                      <div className="mt-auto">
                        <div className="flex items-start gap-3 bg-gray-100/50 p-4 rounded-md">
                          <Users className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <p className="text-sm font-medium">
                            <strong>Para quem:</strong>{" "}
                            {t(`howWeWork.categories.${categoryKey}.services.${serviceKey}.forWhom`, language as any)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </StaggerChildren>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
