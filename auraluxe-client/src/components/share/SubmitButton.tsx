import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";

interface ISubmitButtonProps {
  isLoading?: boolean;
  label: string;
  className?: string;
}

export default function SubmitButton({
  isLoading = false,
  label = "Submit",
  className = "",
}: ISubmitButtonProps) {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className={cn(
        `  cursor-pointer
        flex items-center gap-2 text-white ml-auto
        ${
          isLoading
            ? "bg-deepRed cursor-not-allowed"
            : "bg-prime100 hover:bg-prime200"
        }
        
      `,
        className
      )}
    >
      {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
      {label}
    </Button>
  );
}
