import { cn } from "@/lib/utils";

type Props = {
  text: string;
  className?: string;
};

export default function TextHoverEffect({ className, text }: Props) {
  return (
    <div
      className={cn(
        "text-charcoolGray relative text-xs leading-4 font-bold md:text-[1.56rem] md:leading-8",
        className
      )}
    >
      {text}
      <p className="bg-brandMain absolute h-[1px] w-[25px] transition-all duration-300 ease-in-out md:h-[3px] md:w-[32px] md:group-hover:w-[45px]"></p>
    </div>
  );
}
