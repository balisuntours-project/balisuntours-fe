import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDown, HelpCircle } from "lucide-react"; // ikon tanda tanya

export const LandingPageFAQ = () => {
  const faqs = [
    {
      category: "HOW TO ORDER",
      questions: [
        {
          question: "How do I book a tour on your website?",
          answer:
            "Go to your desired tour page, click 'Book Now', choose your date, fill in your details, and proceed to payment. You'll receive a confirmation by email or WhatsApp.",
        },
        {
          question: "Can I make a last-minute booking?",
          answer:
            "Yes, but availability may be limited. For same-day or urgent bookings, please contact us via WhatsApp for faster response.",
        },
        {
          question: "Can I customize a private tour itinerary?",
          answer:
            "Absolutely. We can tailor a tour based on your preferences, time, and group size. Just reach out via WhatsApp or our contact form.",
        },
      ],
    },
    {
      category: "PAYMENT & PRICING",
      questions: [
        {
          question: "What payment methods do you accept?",
          answer:
            "We accept:\n\n• Credit/debit cards (Visa/Mastercard/JCB)\n• Crypto Currency (BTS/USDT)\n• PayPal (for international guests)",
        },
        {
          question: "Is it cheaper to book directly?",
          answer:
            "Yes! Direct bookings mean no middleman fees, and you'll enjoy exclusive discounts not available on OTA platforms like Klook or Viator.",
        },
        {
          question: "Do you offer group or family discounts?",
          answer:
            "Yes, we provide special pricing for groups, families, and corporate events. Contact us for a custom quote.",
        },
      ],
    },
    {
      category: "CANCELLATION & REFUND POLICY",
      questions: [
        {
          question: "What is your cancellation policy?",
          answer:
            "• Free cancellation: up to 48 hours before the tour\n• 50% refund: within 48 hours\n• No refund: for no-shows\n(Policy may vary slightly depending on the tour)",
        },
        {
          question: "What happens if it rains on the day of the tour?",
          answer:
            "Most tours continue in light rain. In case of severe weather, we will offer to reschedule or propose an alternative tour.",
        },
      ],
    },
    {
      category: "TOUR & SERVICE DETAILS",
      questions: [
        {
          question: "Is hotel pickup included?",
          answer:
            "Yes, for most areas in Kuta, Seminyak, Sanur, Ubud, and Canggu. Additional charges may apply for remote locations.",
        },
        {
          question: "Are your vehicles air-conditioned and comfortable?",
          answer:
            "Absolutely. We use well-maintained, clean vehicles like Avanza, Innova, and Hiace with full AC and experienced drivers.",
        },
        {
          question: "Are your tours child- and senior-friendly?",
          answer:
            "Yes. Many of our tours are suitable for families, kids, and seniors. Let us know your group's needs and we'll recommend the best option.",
        },
        {
          question: "Do your guides speak English or other languages?",
          answer:
            "Our guides speak English fluently. We can also arrange Mandarin, Japanese, or Korean guides upon request (subject to availability).",
        },
      ],
    },
    {
      category: "SPECIAL REQUESTS & CONTACT",
      questions: [
        {
          question: "Can you arrange surprises like birthdays or proposals?",
          answer:
            "Yes! We love creating special moments. Let us know in advance and we'll help make it memorable.",
        },
        {
          question: "How do I contact you for questions or urgent help?",
          answer:
            "We're available daily from 08:00 to 22:00 (Bali Time) via:\n\n• WhatsApp (fastest)\n• Email: [your email here]\n• Instagram: @balisuntours",
        },
        {
          question: "Are you a licensed and trusted tour operator?",
          answer:
            "Yes. Bali Sun Tours is a legally registered and trusted local operator since 2010, with thousands of 5-star reviews on Google and TripAdvisor.",
        },
      ],
    },
    {
      category: "BEFORE YOU GO",
      questions: [
        {
          question: "What should I bring for the tour?",
          answer:
            "Bring essentials like sunscreen, hat, sunglasses, camera, cash, and a change of clothes if needed (especially for water-based tours like rafting or snorkeling).",
        },
        {
          question: "What should I wear during the tour?",
          answer:
            "We recommend comfortable clothing and shoes. For temple visits, please wear or bring a sarong or long pants (some are provided on site).",
        },
        {
          question: "Is travel insurance included in the tour?",
          answer:
            "No, travel insurance is not included by default. We recommend you have your own travel insurance covering activities in Bali.",
        },
      ],
    },
    {
      category: "DESTINATIONS & EXPERIENCE",
      questions: [
        {
          question: "What areas of Bali do you cover?",
          answer:
            "We cover most of Bali including Ubud, Kintamani, Bedugul, Tanah Lot, South Bali (Nusa Dua, Jimbaran, Uluwatu), East & North Bali, and more.",
        },
        {
          question: "Can I combine multiple destinations in one day?",
          answer:
            "Yes, you can customize your tour to combine multiple places, as long as they're within a reasonable travel route. We'll help you plan the best itinerary.",
        },
      ],
    },
    {
      category: "TRANSPORT & DRIVER SERVICE",
      questions: [
        {
          question: "Can I hire a car with driver for a full day?",
          answer:
            "Absolutely! We offer private car rental with a driver, ideal for flexible day trips, business travel, or airport pickup.",
        },
        {
          question: "How many hours is a full-day tour?",
          answer:
            "A full-day tour is typically 8–10 hours. Additional time may incur an extra hourly charge (we'll inform you upfront).",
        },
        {
          question: "Are your drivers friendly and knowledgeable?",
          answer:
            "Yes! Our drivers are English-speaking, professional, punctual, and can help recommend places or act as informal local guides.",
        },
      ],
    },
    {
      category: "TECHNICAL & BOOKING ISSUES",
      questions: [
        {
          question: "I didn't receive my confirmation email. What should I do?",
          answer:
            "Please check your spam/junk folder first. If it's not there, contact us via WhatsApp and we'll re-send your booking info right away.",
        },
        {
          question: "Can I book multiple tours at once?",
          answer:
            "Yes, you can. We also offer bundled discounts if you book more than one tour or activity.",
        },
      ],
    },
    {
      category: "EXCLUSIVE OFFERS",
      questions: [
        {
          question: "Do you have any ongoing promotions?",
          answer:
            "Yes! Visit our 'Special Offers' page or subscribe to our newsletter for exclusive discounts for direct bookings only.",
        },
        {
          question: "Can I get a discount for reviewing your tour?",
          answer:
            "We appreciate honest reviews! Occasionally, we offer promo codes or cashback in exchange for a review on Google or TripAdvisor. Ask us after your tour.",
        },
      ],
    },
  ];

  return (
<section className="mt-6 md:mt-11">
  <div className="max-w-full">
    <h2 className="font-bold text-xl md:text-3xl">
      Frequently Asked Questions
    </h2>

    <div className="space-y-2 pt-5">
      {faqs.map((category, categoryIndex) => (
        <Accordion key={categoryIndex} type="single" collapsible>
          <AccordionItem value={`category-${categoryIndex}`} className="border-b border-gray-200">
            <AccordionTrigger className="py-3 hover:no-underline">
              <div className="flex items-center gap-2">
                <ChevronDown className="h-4 w-4 shrink-0 text-[#EB5E00] transition-transform duration-200" />
                <h3 className="text-sm font-bold text-gray-900 md:text-base">
                  {category.category}
                </h3>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-0">
              <div className="space-y-1">
                {category.questions.map((faq, questionIndex) => (
                  <Accordion 
                    key={questionIndex} 
                    type="single" 
                    collapsible
                    className="ml-5"
                  >
                    <AccordionItem
                      value={`item-${categoryIndex}-${questionIndex}`}
                      className="border-none"
                    >
                      <AccordionTrigger className="text-sm md:text-base py-2 hover:no-underline">
                        <div className="flex gap-2 items-center">
                          <HelpCircle className="h-4 w-4 min-h-4 min-w-4 text-[#EB5E00]" />
                          <span className="text-left text-gray-900">{faq.question}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-xs md:text-sm text-gray-600 pb-2 pl-6">
                        {faq.answer.split("\n").map((paragraph, i) => (
                          <p key={i} className="mb-2 last:mb-0">
                            {paragraph}
                          </p>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  </div>
</section>
  );
};
