"use client";

import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do I book a tour?",
    answer:
      "To book a tour, browse our available tours, select your preferred dates, and click 'Book Now'. You will then be guided through the payment process.",
  },
  {
    question: "Can I hire a guide for a private trip?",
    answer:
      "Yes! We offer private guide hiring options. You can hire a guide form guide page and choose the hours and date for your guide.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept Stripe payments. Payment must be completed at the time of booking to confirm your reservation.",
  },
  {
    question: "Can I cancel or reschedule my booking?",
    answer:
      "Yes, you can cancel or reschedule before the tour date. Cancellation policies vary depending on the tour or guide selected, and some fees may apply.",
  },
  {
    question: "Are the tours suitable for children?",
    answer:
      "Most tours are family-friendly, but please check the tour details for age restrictions or special requirements.",
  },
  {
    question: "Do you provide travel insurance?",
    answer:
      "We recommend arranging travel insurance separately, as it is not included in the tour price. Some guides may provide limited liability coverage during the tour.",
  },
];

import { HelpCircle } from "lucide-react";

const FAQSection = () => {
  return (
    <section className="bg-white py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 bg-orange-100 rounded-xl mb-4">
            <HelpCircle className="w-6 h-6 text-orange-600" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Got Questions?
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Everything you need to know about our tours, guides, and booking
            process.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-gray-200 rounded-2xl overflow-hidden transition-all duration-200 hover:border-orange-200 hover:shadow-sm data-[state=open]:border-orange-300 data-[state=open]:shadow-md px-2"
            >
              <AccordionTrigger className="text-left text-lg font-semibold text-gray-800 cursor-pointer px-4 py-6 hover:no-underline hover:text-orange-600 transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-6 text-gray-600 text-base leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
