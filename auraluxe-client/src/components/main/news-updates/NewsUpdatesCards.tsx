import Heading from "@/components/share/common/Heading";
import Image from "next/image";
import Link from "next/link";

const pusrchaseGuide = [
  {
    id: 1,
    title: "Useful Tips for Selecting the Ideal Rain Shower Head",
    description:
      "Ideal for smaller spaces like powder rooms and guest baths, pedestal sinks are visually appealing with sleek lines that can make a room appear larger.",
    image: "/purchase_guide/article1.png",
    slug: "Useful_Tips_for_Selecting_the_Ideal_Rain_Shower_Head",
  },
  {
    id: 2,
    title: "Choosing the Perfect Bathroom Sink: A Comprehensive Guide",
    description:
      "Ideal for smaller spaces like powder rooms and guest baths, pedestal sinks are visually appealing with sleek lines that can make a room appear larger.",
    image: "/purchase_guide/article2.png",
    slug: "Choosing_the_Perfect_Bathroom_Sink_A_Comprehensive_Guide",
  },
  {
    id: 3,
    title: "Useful Tips for Selecting the Ideal Rain Shower Head",
    description:
      "Ideal for smaller spaces like powder rooms and guest baths, pedestal sinks are visually appealing with sleek lines that can make a room appear larger.",
    image: "/purchase_guide/article3.png",
    slug: "Useful_Tips_for_Selecting_the_Ideal_Rain_Shower_Head_2",
  },
  {
    id: 4,
    title: "Choosing the Perfect Bathroom Sink: A Comprehensive Guide",
    description:
      "Ideal for smaller spaces like powder rooms and guest baths, pedestal sinks are visually appealing with sleek lines that can make a room appear larger.",
    image: "/purchase_guide/article4.png",
    slug: "Choosing_the_Perfect_Bathroom_Sink_A_Comprehensive_Guide_2",
  },
  {
    id: 5,
    title: "Choosing the Perfect Bathroom Sink: A Comprehensive Guide",
    description:
      "Ideal for smaller spaces like powder rooms and guest baths, pedestal sinks are visually appealing with sleek lines that can make a room appear larger.",
    image: "/purchase_guide/article5.png",
    slug: "Choosing_the_Perfect_Bathroom_Sink_A_Comprehensive_Guide_3",
  },
  {
    id: 6,
    title: "Choosing the Perfect Bathroom Sink: A Comprehensive Guide",
    description:
      "Ideal for smaller spaces like powder rooms and guest baths, pedestal sinks are visually appealing with sleek lines that can make a room appear larger.",
    image: "/purchase_guide/article6.png",
    slug: "Choosing_the_Perfect_Bathroom_Sink_A_Comprehensive_Guide_4",
  },
];

export default function NewsUpdatesCards() {
  return (
    <div className="relative z-100 flex flex-col gap-10 sm:gap-16 md:gap-24 lg:gap-32 xl:gap-36">
      {/* ======= heading ======== */}
      <Heading
        firstText=""
        secondText="Recent Updates"
        backText="Recent"
        descripiton="Tilottoma.com is a leading destination for premium interior solutions, offering a perfect blend of style, innovation, and functionality."
      />
      {/* ========== cards ======== */}
      <div className="container mb-20 grid min-h-10 grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2 lg:p-0 xl:grid-cols-3 xl:gap-[78px]">
        {/* ====== card ======== */}
        {pusrchaseGuide?.map((article, index) => (
          <Link
            href={`/news-updates/${article?.slug}`}
            className="group relative max-h-[519px] min-h-[48vh] max-w-[460px] cursor-pointer lg:h-screen"
            key={index + 1}
          >
            {/* ====== image ===== */}
            <div className="h-screen max-h-[302px] w-full overflow-hidden">
              <Image
                alt={article?.title}
                src={article?.image}
                height={302}
                width={460}
                className="h-full w-full shrink-0 object-cover transition-all duration-300 ease-in-out group-hover:scale-110"
              />
            </div>
            {/* ==== contents ====== */}
            <div className="absolute bottom-0 left-0 flex max-h-[306px] min-h-[23vh] w-full max-w-[390px] flex-col gap-5 bg-white p-5 shadow-lg transition-all duration-300 ease-in-out group-hover:shadow-xl lg:h-screen">
              <div className="text-sm leading-5 font-bold sm:text-[1rem] sm:leading-5.5 lg:text-xl lg:leading-7">
                {article?.title}
              </div>
              <div className="bg-brandMain h-[1px] w-[77px] md:h-[3px]" />
              <div className="text-xs sm:text-sm lg:text-[1rem] lg:leading-7">
                {article?.description}
              </div>
              <div className="text-xs font-bold text-[#007AFF] xl:text-sm xl:leading-5">
                Continue Reading....
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
