"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface CartHeaderProps {
  itemCount: number;
}

export default function CartHeader({ itemCount }: CartHeaderProps) {
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="text-4xl font-black tracking-tight mb-2">
            Shopping Cart
          </h2>
          <p className="text-slate-500">
            {itemCount === 0
              ? "Your cart is empty"
              : `You have ${itemCount} ${itemCount === 1 ? "item" : "items"} in your cart.`}
          </p>
        </div>
        <Link
          href="/product"
          className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline group"
        >
          <ArrowLeft />
          Continue Shopping
        </Link>
      </div>
    </>
  );
}
