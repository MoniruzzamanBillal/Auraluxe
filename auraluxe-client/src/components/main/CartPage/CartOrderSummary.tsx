"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { TCartOrderSummary } from "./types/cart.types";

interface OrderSummaryProps {
  summary: TCartOrderSummary;
  onCheckout: () => void;
  disabled?: boolean;
}

export default function CartOrderSummary({
  summary,
  onCheckout,
  disabled = false,
}: OrderSummaryProps) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        Order Summary
      </h2>
      <div className="space-y-4 text-sm mb-3">
        <div className="flex justify-between text-slate-500">
          <span>Subtotal ({summary.itemCount} items)</span>
          <span className="text-slate-900 dark:text-white font-medium">
            ${summary.subtotal.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between text-slate-500">
          <span>Estimated Shipping</span>
          <span className="text-slate-900 dark:text-white font-medium">
            ${summary.shipping.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between text-slate-500">
          <span>Tax (VAT 5%)</span>
          <span className="text-slate-900 dark:text-white font-medium">
            ${summary.tax.toFixed(2)}
          </span>
        </div>
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex justify-between text-lg font-bold">
            <span>Order Total</span>
            <span className="text-slate-900 dark:text-white">
              ${summary.total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      <Button
        onClick={onCheckout}
        disabled={disabled || summary.itemCount === 0}
        className="w-full bg-prime100 hover:bg-prime200 cursor-pointer text-slate-100 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Proceed to Checkout
        <ArrowRight />
      </Button>
    </div>
  );
}
