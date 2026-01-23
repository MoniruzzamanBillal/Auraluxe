"use client";

import { Trash2 } from "lucide-react";
import Image from "next/image";

import { usePost } from "@/hooks/useApi";
import { toast } from "sonner";
import QuantityController from "./CartQuantityController";
import { TCartItem } from "./types/cart.types";

interface CartItemProps {
  item: TCartItem;

  onRemove: (cartItemId: string) => void;
  disabled?: boolean;
}

export default function CartItem({
  item,

  onRemove,
  disabled = false,
}: CartItemProps) {
  //   console.log("item = ", item);
  const addMutation = usePost([["cart"]]);

  const subtotal = item.unitPrice * item.quantity;

  const handleUpdateQuantity = async (quantity: number) => {
    const newQuantity = item.quantity + quantity;

    if (newQuantity > item.product.quantity) {
      toast.error("Stock limit exceed!!!");
      return;
    }

    if (newQuantity <= 0) {
      return;
    }

    try {
      const payload: Record<string, any> = { productId: item?.productId };

      if (quantity < 0) {
        payload.quantity = quantity;
      }

      const result = await addMutation.mutateAsync({
        url: "/cart",
        payload,
      });

      if (result?.success) {
        toast.success(result.message);
      }
    } catch (error: any) {
      toast.error(error?.message || "Failed to increase quantity");
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
      <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Product Details */}
        <div className="md:col-span-6 flex items-center gap-4">
          <div className="rounded-lg bg-slate-100 shrink-0 overflow-hidden border border-slate-100 dark:border-slate-700 size-28">
            <Image
              height={112}
              width={112}
              className="w-full h-full object-cover"
              alt={item.product.name}
              src={item.product.productImage || "/placeholder.jpg"}
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/placeholder.jpg";
              }}
            />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">
              {item.product.name}
            </h3>
            {item.product.productCode && (
              <p className="text-sm text-slate-500">
                SKU: {item.product.productCode}
              </p>
            )}
            {item.product.brand?.name && (
              <p className="text-sm text-slate-500">
                Brand: {item.product.brand.name}
              </p>
            )}
            <button
              onClick={() => onRemove(item?.productId)}
              disabled={disabled}
              className="mt-2 flex items-center gap-1 text-xs font-bold text-red-500 hover:text-red-600 hover:underline cursor-pointer transition-colors uppercase tracking-tight disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Trash2 size={14} />
              Remove
            </button>
          </div>
        </div>

        {/* Price */}
        <div className="md:col-span-2 text-center">
          <span className="block text-xs md:hidden text-slate-500 font-bold uppercase mb-1">
            Price
          </span>
          <span className="font-medium">${item.unitPrice.toFixed(2)}</span>
        </div>

        {/* Quantity */}
        <div className="md:col-span-2 flex justify-center">
          <span className="block text-xs md:hidden text-slate-500 font-bold uppercase mb-1">
            Quantity
          </span>
          <QuantityController
            quantity={item.quantity}
            onIncrease={() => handleUpdateQuantity(1)}
            onDecrease={() => handleUpdateQuantity(-1)}
            disabled={disabled}
          />
        </div>

        {/* Subtotal */}
        <div className="md:col-span-2 text-right">
          <span className="block text-xs md:hidden text-slate-500 font-bold uppercase mb-1">
            Subtotal
          </span>
          <span className="font-bold text-lg">${subtotal.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
