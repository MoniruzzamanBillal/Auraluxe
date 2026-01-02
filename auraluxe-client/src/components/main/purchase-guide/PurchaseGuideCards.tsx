import Heading from "@/components/share/common/Heading";
import Image from "next/image";
import Link from "next/link";

export default function PurchaseGuideCards() {
  const purchaseGuide = [
    {
      id: 1,
      title: "Useful Tips for Selecting the Ideal Rain Shower Head",
      slug: "useful-tips-for-selecting-the-ideal-rain-shower-head",
      description:
        "Ideal for smaller spaces like powder rooms and guest baths, pedestal sinks are visually appealing with sleek lines that can make a room appear larger.",
      image: "/purchase_guide/article1.png",
    },
    {
      id: 2,
      title: "Choosing the Perfect Bathroom Sink: A Comprehensive Guide",
      slug: "choosing-the-perfect-bathroom-sink-a-comprehensive-guide",
      description:
        "Ideal for smaller spaces like powder rooms and guest baths, pedestal sinks are visually appealing with sleek lines that can make a room appear larger.",
      image: "/purchase_guide/article2.png",
    },
    {
      id: 3,
      title: "Useful Tips for Selecting the Ideal Rain Shower Head",
      slug: "useful-tips-for-selecting-the-ideal-rain-shower-head",
      description:
        "Ideal for smaller spaces like powder rooms and guest baths, pedestal sinks are visually appealing with sleek lines that can make a room appear larger.",
      image: "/purchase_guide/article3.png",
    },
    {
      id: 4,
      title: "Choosing the Perfect Bathroom Sink: A Comprehensive Guide",
      slug: "choosing-the-perfect-bathroom-sink-a-comprehensive-guide",
      description:
        "Ideal for smaller spaces like powder rooms and guest baths, pedestal sinks are visually appealing with sleek lines that can make a room appear larger.",
      image: "/purchase_guide/article4.png",
    },
    {
      id: 5,
      title: "Choosing the Perfect Bathroom Sink: A Comprehensive Guide",
      slug: "choosing-the-perfect-bathroom-sink-a-comprehensive-guide",
      description:
        "Ideal for smaller spaces like powder rooms and guest baths, pedestal sinks are visually appealing with sleek lines that can make a room appear larger.",
      image: "/purchase_guide/article5.png",
    },
    {
      id: 6,
      title: "Choosing the Perfect Bathroom Sink: A Comprehensive Guide",
      slug: "choosing-the-perfect-bathroom-sink-a-comprehensive-guide",
      description:
        "Ideal for smaller spaces like powder rooms and guest baths, pedestal sinks are visually appealing with sleek lines that can make a room appear larger.",
      image: "/purchase_guide/article6.png",
    },
  ];

  return (
    <div className="relative z-100 flex flex-col gap-10 sm:gap-16 md:gap-24 lg:gap-32 xl:gap-36">
      {/* ======= heading ======== */}
      <Heading
        firstText=""
        secondText="Purchase Guide"
        backText="Purchase"
        descripiton="Our products are designed to deliver excellence, combining
                    innovation, quality, and reliability to meet diverse needs across
                    industries."
      />
      {/* ========== cards ======== */}
      <div className="container mb-20 grid min-h-10 grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2 lg:p-0 xl:grid-cols-3 xl:gap-[78px]">
        {/* ====== card ======== */}
        {purchaseGuide?.map((article, index) => (
          <Link
            href={`/purchase-guide/${article?.slug}`}
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
