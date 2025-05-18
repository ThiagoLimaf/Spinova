"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CategoryContent } from "./category-content"
import type { Pilar } from "./pilares-data"
import { FadeIn } from "../animations/fade-in"
import { cn } from "@/lib/utils"

interface PilarContentProps {
  pilar: Pilar
}

export function PilarContent({ pilar }: PilarContentProps) {
  const [activeCategory, setActiveCategory] = useState(Object.keys(pilar.categories)[0])

  return (
    <div className="space-y-8">
      <FadeIn>
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-4">{pilar.subtitle}</h3>
          <p className="text-muted-foreground max-w-3xl mx-auto">{pilar.description}</p>
        </div>
      </FadeIn>

      <Tabs
        defaultValue={Object.keys(pilar.categories)[0]}
        value={activeCategory}
        onValueChange={setActiveCategory}
        className="w-full"
      >
        <div className="overflow-x-auto pb-2">
          <TabsList className="inline-flex w-auto h-auto bg-transparent p-0 mb-6">
            {Object.entries(pilar.categories).map(([key, category], index) => (
              <TabsTrigger
                key={key}
                value={key}
                className={cn(
                  "px-4 py-2 rounded-md text-sm sm:text-base whitespace-nowrap",
                  "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
                  "data-[state=inactive]:bg-transparent data-[state=inactive]:text-foreground/70",
                  index > 0 ? "ml-2" : "",
                )}
              >
                {category.title}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {Object.entries(pilar.categories).map(([key, category]) => (
          <TabsContent key={key} value={key} className="mt-0">
            <CategoryContent category={category} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
