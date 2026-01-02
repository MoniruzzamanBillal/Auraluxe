import Heading from "@/components/share/common/Heading";
import { AccordionFaq } from "./AccordionFAQ";

export default function FaqComp() {
  return (
    <div className="flex flex-col lg:gap-20">
      {/* ======= heading ======== */}
      <div className="relative z-100">
        <Heading
          firstText=""
          secondText="Ask Anything..."
          backText="FAQ"
          descripiton="Tilottoma.com is a leading destination for premium interior solutions, offering a perfect blend of style, innovation, and functionality."
        />
      </div>
      {/* ===== questions lists ===== */}
      <div className="container mt-20 mb-38 max-w-6xl">
        <AccordionFaq />
      </div>
    </div>
  );
}
