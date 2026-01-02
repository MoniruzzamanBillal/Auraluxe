"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";

const faqList = [
  {
    question: "Will I receive the same product that I see in the picture?",
    answer:
      "Consectetur cras scelerisque dis nec mi vestibulum ullamcorper turpis enim natoque tempus a malesuada suspendisse iaculis adipiscing himenaeos tincidunt.Tellus pharetra dis nostra urna a scelerisque id parturient ullamcorper ullamcorper class ad consectetur tristique et. Hendrerit mollis facilisi odio a montes scelerisque a scelerisque justo a praesent conubia aenean mi tempor.",
  },
  {
    question: "Where can I view my sales receipt?",
    answer:
      "A vel dui a conubia vestibulum class varius vel nunc a gravida ut maecenas quisque a proin condimentum sagittis class at faucibus primis parturient dolor scelerisque himenaeos. A et ullamcorper vestibulum netus a mauris ac consectetur libero volutpat congue congue turpis a consectetur adipiscing sit.Suspendisse leo fringilla a congue tempus nisi conubia vestibulum a in posuere accumsan.",
  },
  {
    question: "How can I return an item?",
    answer:
      "Sit rhoncus aptent dis scelerisque penatibus a dis tempor accumsan suspendisse mollis a et odio ullamcorper magnis ullamcorper cum ullamcorper duis nulla egestas massa. Vitae amet nostra est leo dignissim justo sodales et ac a conubia bibendum duis ad justo suspendisse a a tellus cubilia vestibulum a dictumst a duis risus.Sociosqu curae consequat nisl litora a eros est consectetur nulla rhoncus a a id felis praesent.Tempus dui integer a cursus id fames parturient.",
  },
  {
    question: "How do I contact customer support?",
    answer:
      "You can reach our customer support team via email at [support@tilottoma.com] or call us at [insert phone number]. We're available [mention hours, e.g., 9 AM - 9 PM] to assist you.",
  },
  {
    question: "Are there any ongoing discounts or promotions? ",
    answer:
      "You can reach our customer support team via email at [support@tilottoma.com] or call us at [insert phone number]. We're available [mention hours, e.g., 9 AM - 9 PM] to assist you.",
  },
  {
    question: "Does Tilottoma.com provide installation services?",
    answer:
      "Yes, we frequently offer discounts and promotions. Visit our website or subscribe to our newsletter to stay updated on the latest deals.",
  },
];

export function AccordionFaq() {
  const [openIndex, setOpenIndex] = React.useState<string>("");

  return (
    <Accordion
      type="single"
      collapsible
      value={openIndex}
      onValueChange={(value) => setOpenIndex(value)}
      className="w-full"
    >
      {faqList.map((item, index) => (
        <AccordionItem key={index + 1} value={String(index)}>
          <AccordionTrigger className="flex cursor-pointer items-center justify-between text-sm font-bold text-charcoolGray hover:no-underline sm:text-base md:text-base lg:text-lg">
            {item.question}
          </AccordionTrigger>
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div></div>
            <div>
              <AccordionContent className="text-sm leading-6 font-normal text-[#6B6B6B]">
                {item.answer}
              </AccordionContent>
            </div>
          </div>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
