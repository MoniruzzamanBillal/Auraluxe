import Image from "next/image";

import plaveHolderImage from "../../../../public/placeholderImage.jpg";

interface IPageProps {
  ProductImage: string;
}

export default function ProductDetailGallery({ ProductImage }: IPageProps) {
  // console.log("ProductImage = ", ProductImage);

  return (
    <div>
      {/* main selected image  */}
      <div className="bg-smokeWhite sc-430:h-[350px] sc-500:h-[450px] relative flex h-[290px] w-full items-center justify-center overflow-hidden rounded-2xl">
        <Image
          src={ProductImage || plaveHolderImage}
          alt="image"
          width={1280}
          height={1280}
          className="h-full w-full  "
        />
      </div>
    </div>
  );
}
