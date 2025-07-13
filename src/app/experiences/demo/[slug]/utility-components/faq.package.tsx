import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react"; // ikon tanda tanya

export const FAQSectionPackage = () => {
  const faqs = [
    {
      question: "Is this beginner-friendly?",
      answer:
        "Yes! No previous rafting experience is required. Our guides will brief you and ensure your safety at all times.",
    },
    {
      question: "What should I bring?",
      answer:
        "We recommend bringing a change of clothes, sandals or water shoes, sunscreen, and a waterproof bag for your valuables.",
    },
    {
      question: "Can I go solo?",
      answer:
        "Absolutely! Solo travelers are welcome. We’ll group you with other friendly adventurers for the experience.",
    },
    {
      question: "What’s the intensity level?",
      answer:
        "The rafting route is moderate and suitable for beginners. Expect some fun splashes, twists, and turns!",
    },
    {
      question: "Are there age/weight limits?",
      answer:
        "Participants should be between 7 and 65 years old. Weight limit is approximately 120kg for safety reasons.",
    },
  ];

  return (
    <section className="mt-6 md:mt-11">
      <div className="max-w-full">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold">
          Frequently Asked Questions
        </h2>

        <Accordion type="single" collapsible className="space-y-0">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-base md:text-lg">
                <div className="flex gap-2">
                  <HelpCircle className="h-full w-full max-h-6 max-w-6 text-[#EB5E00] text-2xl items-center" />
                  {faq.question}
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-sm md:text-base text-gray-700">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
