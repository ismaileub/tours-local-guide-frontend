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

const FAQSection = () => {
  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">
        Frequently Asked Questions
      </h2>
      <Accordion type="single" collapsible className="space-y-2">
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="border rounded-lg"
          >
            <AccordionTrigger className=" text-lg md:text-xl cursor-pointer px-4 py-2">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="px-4 py-2 text-left text-gray-700 leading-relaxed">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQSection;
