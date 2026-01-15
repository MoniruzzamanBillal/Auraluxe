"use client";

import { useWishlist } from "@/hooks/useWishlist";
import { Trash2 } from "lucide-react";
import Image from "next/image";

export default function WishListTable() {
  const { wishlist, removeFromWishlist } = useWishlist();

  const handleRemoveItem = (id: string) => {
    removeFromWishlist(id);
  };

  return (
    <div className="mb-10 overflow-x-auto sm:mb-48 lg:mt-16">
      <table className="min-w-full border border-gray-200">
        <thead className="">
          <tr className="text-charcoolGray text-xs font-medium sm:text-sm">
            <th className="border px-4 py-4">Sl.</th>
            <th className="border px-4 py-2">Product</th>
            <th className="border px-4 py-2">Product Name</th>
            <th className="border px-4 py-2">Model</th>
            <th className="border px-4 py-2">Brand</th>
            <th className="border px-4 py-2">Stock Status</th>
            <th className="border px-4 py-2">Remove</th>
          </tr>
        </thead>
        <tbody>
          {!wishlist?.length && (
            <tr>
              <td
                colSpan={7}
                className="py-3 text-center text-base font-semibold text-red-600"
              >
                No items
              </td>
            </tr>
          )}

          {wishlist &&
            wishlist?.map((product, index) => (
              <tr key={product.id} className="text-center">
                <td className="text-darkGray border px-4 py-7 text-xs md:text-base">
                  {index + 1}
                </td>
                <td className="size-20 overflow-hidden border px-4 py-2">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={100}
                    height={100}
                    className="mx-auto h-full w-full rounded-lg object-cover"
                  />
                </td>
                <td className="text-darkGray border px-4 py-2 text-left text-xs font-medium text-nowrap md:text-base">
                  {product.name}
                </td>
                <td className="text-darkGray border px-4 py-2 text-xs md:text-base">
                  {product.code}
                </td>
                <td className="text-darkGray border px-4 py-2 text-xs md:text-base">
                  {product.brandName}
                </td>
                <td
                  // className={`border px-4 py-2 text-xs font-medium md:text-base ${
                  //   product?.stock === "In Stock"
                  //     ? "text-green-500"
                  //     : "text-red-500"
                  // } `
                  className={`text-successGreen border px-4 py-2 text-xs font-medium md:text-base`}
                >
                  Stock
                </td>
                <td className="border px-4 py-2">
                  <button
                    className="text-darkGray hover:bg-brandMain cursor-pointer rounded-md p-2 hover:text-white"
                    onClick={() => handleRemoveItem(product?.id)}
                  >
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
