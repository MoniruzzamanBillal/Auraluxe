import Image from "next/image";

import dummyImage from "../../../../public/microwave.png";
import dummyImage2 from "../../../../public/microwave2.png";
import dummyImage3 from "../../../../public/microwave3.png";

import plaveHolderImage from "../../../../public/placeholderImage.jpg";

const dummyImages = [dummyImage, dummyImage2, dummyImage3];

interface IPageProps {
  ProductImage: string;
}

export default function ProductDetailGallery({ ProductImage }: IPageProps) {
  console.log("ProductImage = ", ProductImage);

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
