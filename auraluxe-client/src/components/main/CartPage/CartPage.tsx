"use client";

import Breadcrumb from "@/components/share/Breadcrumb";
import { useFetchData, usePatch, usePost } from "@/hooks/useApi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import CartHeader from "./CartHeader";
import CartItem from "./CartItem";
import CartOrderSummary from "./CartOrderSummary";
import CartTableHeader from "./CartTableHeader";
import EmptyCart from "./EmptyCart";
import { TCartItem, TCartOrderSummary } from "./types/cart.types";

export default function CartPage() {
  const router = useRouter();

  const { data: cartData, isLoading } = useFetchData(["cart"], "/cart");

  const addMutation = usePost([["cart"]]);
  const patchMutation = usePatch([["cart"]]);

  const calculateOrderSummary = (): TCartOrderSummary => {
    if (!cartData?.data?.items?.length) {
      return {
        subtotal: 0,
        shipping: 0,
        tax: 0,
        total: 0,
        itemCount: 0,
      };
    }

    const subtotal = cartData.data.items.reduce(
      (sum, item) => sum + item.unitPrice * item.quantity,
      0,
    );
    const shipping = subtotal > 100 ? 0 : 12.0;
    const tax = subtotal * 0.05;
    const total = subtotal + shipping + tax;
    const itemCount = cartData.data.items.reduce(
      (count, item) => count + item.quantity,
      0,
    );

    return {
      subtotal,
      shipping,
      tax,
      total,
      itemCount,
    };
  };

  const handleRemoveItem = async (itemId: string) => {
    console.log("itemId = ", itemId);

    try {
      const result = await patchMutation.mutateAsync({
        url: "/cart/remove-cart-item",
        payload: { productId: itemId },
      });
    } catch (error: any) {
      toast.error(error?.message || "Failed to remove item");
    }
  };

  const handleCheckout = () => {
    router.push("/checkout");
  };

  const orderSummary = calculateOrderSummary();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* <!-- Breadcrumbs --> */}
        <Breadcrumb />

        {/* Cart Header */}
        <CartHeader itemCount={orderSummary.itemCount} />

        {!cartData?.data?.items || cartData.data.items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Cart Items */}
            <div className="lg:col-span-8 space-y-4">
              {/* Table Header */}
              <CartTableHeader />

              {/* Cart Items List */}
              <div className="space-y-4">
                {cartData.data.items.map((item: TCartItem) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onRemove={handleRemoveItem}
                    disabled={addMutation.isPending}
                  />
                ))}
              </div>
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-4 lg:sticky lg:top-24">
              <CartOrderSummary
                summary={orderSummary}
                onCheckout={handleCheckout}
                disabled={addMutation.isPending || orderSummary.itemCount === 0}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
