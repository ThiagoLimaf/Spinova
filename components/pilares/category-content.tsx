"use client"
import type { Category, Service } from "./pilares-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { StaggerChildren } from "../animations/stagger-children"
import { FadeIn } from "../animations/fade-in"

interface CategoryContentProps {
  category: Category
}

export function CategoryContent({ category }: CategoryContentProps) {
  return (
    <div className="space-y-8">
      <FadeIn>
        <div className="mb-6">
          <p className="text-muted-foreground">{category.description}</p>
        </div>
      </FadeIn>

      <StaggerChildren className="grid grid-cols-1 gap-6" staggerDelay={100}>
        {category.services.map((service, index) => (
          <ServiceCard key={index} service={service} />
        ))}
      </StaggerChildren>
    </div>
  )
}

interface ServiceCardProps {
  service: Service
}

function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-primary/5 pb-4">
        <CardTitle className="text-xl">{service.title}</CardTitle>
        {service.description && <CardDescription>{service.description}</CardDescription>}
      </CardHeader>
      <CardContent className="pt-6">
        <Accordion type="single" collapsible className="w-full">
          {service.items.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-base font-medium">{item.title}</AccordionTrigger>
              <AccordionContent>
                <div dangerouslySetInnerHTML={{ __html: item.details }} className="text-muted-foreground space-y-2" />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  )
}
