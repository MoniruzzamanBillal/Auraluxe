import Image from "next/image";

type TPageProps = {
  title: string;
  shareUrl: string;
  icon: any;
};

const SocialLinkCard = ({ title, icon, shareUrl }: TPageProps) => {
  return (
    <button
      onClick={() => window.open(shareUrl, "_blank", "noopener,noreferrer")}
      className="socialLinks border-lightNeutral flex h-15 w-44 cursor-pointer items-center justify-center gap-x-4 rounded-lg border px-3 py-5"
    >
      <span className="size-5">
        <Image
          alt="socialMediaIcon"
          src={icon}
          height={21}
          width={20}
          className="h-full w-full shrink-0"
        />
      </span>
      <span className="text-highNeutral text-sm font-semibold"> {title} </span>
    </button>
  );
};

export default SocialLinkCard;
