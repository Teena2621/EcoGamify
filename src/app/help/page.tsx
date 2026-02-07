
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    id: "faq-1",
    question: "How do I reset my password?",
    answer: "You can reset your password by going to the login page and clicking the 'Forgot Password' link. You will receive an email with instructions on how to reset it."
  },
  {
    id: "faq-2",
    question: "How do I earn XP and level up?",
    answer: "You can earn Experience Points (XP) by completing quizzes, watching video lectures, finishing library resources, and participating in daily challenges. As you earn XP, you will level up and unlock new badges."
  },
  {
    id: "faq-3",
    question: "What file types are supported for challenge submissions?",
    answer: "We support a wide range of file types, including images (JPG, PNG), videos (MP4), and documents (PDF, DOC, DOCX)."
  },
  {
    id: "faq-4",
    question: "How can I contact a lecturer?",
    answer: "Currently, direct messaging is not available. However, you can participate in course discussions and forums to interact with lecturers and other students."
  }
];

export default function HelpPage() {
  return (
      <div className="container mx-auto p-4 md:p-8">
        <Card className="mb-8 bg-white/30 backdrop-blur-lg border-white/20 shadow-lg">
          <CardHeader className="text-center">
            <HelpCircle className="w-12 h-12 mx-auto text-primary" />
            <CardTitle className="text-3xl font-bold">Help Center</CardTitle>
            <CardDescription className="text-muted-foreground">Find answers to common questions.</CardDescription>
          </CardHeader>
        </Card>
        
        <Card className="bg-white/30 backdrop-blur-lg border-white/20 shadow-lg">
          <CardContent className="p-6">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id} className="bg-background/50 border-border rounded-lg">
                  <AccordionTrigger className="p-6 text-lg font-semibold hover:no-underline text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="p-6 pt-0 text-muted-foreground">
                    <p>{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
  )
}
