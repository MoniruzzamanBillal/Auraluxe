"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";

const AccordianData = [
  {
    id: 1,
    key: "Specification",

    specifications: [
      {
        id: 1,
        key: "Model",
        value: "538.01.441",
      },
      {
        id: 2,
        key: "Volume oven cavity",
        value: "28L",
      },
    ],
  },
  {
    id: 2,
    key: "Description",
    paragraphs: [
      "Our flagship product combines cutting-edge technology with sleek design. Built with premium materials it offers unparalleled performance and reliability.",
      "Our flagship product combines cutting-edge technology with sleek design. Built with premium materials it offers unparalleled performance and reliability.",
    ],
  },
  {
    id: 3,
    key: "Shipping & Delivery",
    paragraphs: [
      "We are committed to providing a smooth and hassle-free delivery experience. All orders are processed promptly, ensuring your product reaches you in the shortest time possible. With standard shipping, you can expect delivery within 3-7 business days, depending on your location. For added convenience, we offer real-time tracking so you can monitor your order's journey from dispatch to delivery. Secure packaging ensures your product arrives in perfect condition.",
      "For those in need of faster service, express delivery options may be available. In case of any issues, our customer-friendly return and exchange process ensures your satisfaction. If you have any specific questions about shipping or delivery, our dedicated support team is always ready to assist.",
    ],
  },
];

export default function ProjectDetailAccordian() {
  const [openIndex, setOpenIndex] = useState<string>();

  return (
    <div>
      <Accordion
        type="single"
        collapsible
        className="w-full"
        value={openIndex}
        onValueChange={(value) => setOpenIndex(value)}
      >
        {AccordianData?.map((item) => (
          <AccordionItem key={item?.id} value={String(item?.id)}>
            <AccordionTrigger
              className={`text-charcoolGray flex cursor-pointer items-center justify-between px-3 py-4 text-sm font-medium transition-all duration-200 ease-in-out hover:no-underline sm:text-base ${openIndex === String(item?.id) && "font-bold"}`}
            >
              {item?.key}
            </AccordionTrigger>

            {/*==== for showing paragraps text  ========*/}
            {item?.paragraphs && (
              <AccordionContent className="text-charcoolGray flex flex-col gap-4 px-3 text-balance">
                {item?.paragraphs?.map((para, index) => (
                  <p key={index + 1}>{para}</p>
                ))}
              </AccordionContent>
            )}

            {item?.specifications && (
              <AccordionContent className="px-3">
                {item?.specifications?.map((Specification) => (
                  <div
                    key={Specification?.id}
                    className="my-1.5 flex items-center justify-between gap-5 border-t py-3"
                  >
                    <p className="flex w-[50%] justify-between">
                      <span className="">{Specification?.key} </span>
                      <span className=""> :</span>
                    </p>

                    <p className="w-[50%]">{Specification?.value}</p>
                  </div>
                ))}
              </AccordionContent>
            )}
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
