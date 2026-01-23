import { cn } from "@/lib/utils";
import TextWrapper from "../wrappers/TextWrapper";

type Props = {
  firstText?: string;
  title?: string;
  secondText?: string;
  descripiton?: string;
  backText?: string;
  descriptionClassName?: string;
  borderPresent?: boolean;
};

//? ====== when use this use relative and give z-index

export default function Heading({
  firstText,
  secondText,
  descripiton,
  borderPresent = true,
  backText = secondText,
  title,
  descriptionClassName,
}: Props) {
  return (
    <div className="w-full px-5 py-3 md:px-10 lg:container">
      <TextWrapper text={backText}>
        <div className="flex min-h-20 items-center gap-3 sm:gap-5">
          <div>
            <p className="text-prime50 text-[0.625rem] leading-3.5 sm:text-[1rem] sm:leading-6">
              {firstText}
            </p>
            <p className="text-prime200 text-sm leading-5 font-bold sm:text-5xl sm:leading-14">
              {secondText}
            </p>
          </div>
          {/*  */}
          {borderPresent && (
            <div className="border-lightGray h-full min-h-20 border" />
          )}
          {/*  */}
          <div>
            {title && (
              <p className="text-prime100 shrink-0 text-xs leading-4 font-bold sm:max-w-[438px] sm:text-[1rem] sm:leading-8">
                {title}
              </p>
            )}
            {descripiton && (
              <p
                className={cn(
                  "text-prime200 text-xs leading-4 font-normal sm:max-w-[438px] sm:text-[1rem] sm:leading-6 lg:max-w-[600px]",
                  descriptionClassName,
                )}
              >
                {descripiton}
              </p>
            )}
          </div>
        </div>
      </TextWrapper>
    </div>
  );
}
