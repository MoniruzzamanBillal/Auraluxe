import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

type Category = {
  id: number;
  name: string;
  description?: string;
  children?: Category[];
};

export default function CategoryAccordion({
  category,
  level,
  setSelectedCat,
  handleOpenChange,
}: {
  category: Category;
  level: number;
  setSelectedCat: React.Dispatch<React.SetStateAction<string>>;
  handleOpenChange?: (isOpen: boolean) => void;
}) {
  const hasChildren = category.children && category.children.length > 0;

  // console.log("level =>>", level);

  if (hasChildren) {
    return (
      <AccordionItem value={category.id.toString()} className="border-b-0">
        <AccordionTrigger
          className={cn(
            "text-darkGray flex cursor-pointer items-center justify-between py-2 text-base hover:no-underline",
            level === 1 && "font-medium",
            level > 1 && "font-normal text-amber-600",
            "[&[data-state=open]]:text-orange-500",
            "[&[data-state=closed]]:text-black"
          )}
        >
          {category.name}
        </AccordionTrigger>
        <AccordionContent className="pl-4">
          <Accordion type="multiple" className="space-y-1">
            {category?.children?.map((child: any) => (
              <CategoryAccordion
                key={child.id}
                category={child}
                level={level + 1}
                setSelectedCat={setSelectedCat}
                handleOpenChange={handleOpenChange}
              />
            ))}
          </Accordion>
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <div
      className={cn(
        "cursor-pointer py-1 pl-2 text-sm hover:text-red-500",
        level === 1 ? "font-medium" : "text-gray-700"
      )}
      onClick={() => {
        setSelectedCat(category.name);
        if (handleOpenChange) {
          handleOpenChange(false);
        }
      }}
    >
      {category.name}
    </div>
  );
}
