import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";

type Props = {
  className?: string;
};

export default function NormalLoader({ className }: Props) {
  return (
    <div
      className={cn("flex h-[100px] items-center justify-center", className)}
    >
      <Loader className="text-brandColor animate-spin" size={40} />
    </div>
  );
}
