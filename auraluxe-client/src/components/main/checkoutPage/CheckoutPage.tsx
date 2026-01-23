"use client";
import ControlledInput from "@/components/share/input/ControlledInput";
import { Button } from "@/components/ui/button";
import { useFetchData, usePost } from "@/hooks/useApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShieldCheck } from "lucide-react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { TCartItem } from "../CartPage/types/cart.types";
import { CheckoutFormData, checkoutSchema } from "./schema/checkoutSchema";

export default function CheckoutPage() {
  const { data: cartData, isLoading } = useFetchData(["cart"], "/cart");

  const addMutation = usePost([["orderItem"]]);

  // Initialize form
  const methods = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      streetAddress: "",
      city: "",
      postalCode: "",
    },
  });

  // !  order item
  const handleOrderItem: SubmitHandler<CheckoutFormData> = async (data) => {
    try {
      const orderResponse = await addMutation.mutateAsync({
        url: "/order/place-order",
        payload: data,
      });
      console.log("------");
      console.log("order response = ");
      console.log(orderResponse?.data?.paymentUrl);

      if (orderResponse?.success) {
        window.location.href = orderResponse?.data?.paymentUrl;
      }

      console.log("------");
    } catch (error) {
      console.log("error = ", error);
    }
  };

  // Calculate order totals
  const calculateOrderSummary = () => {
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

    const total = subtotal;
    const itemCount = cartData.data.items.reduce(
      (count, item) => count + item.quantity,
      0,
    );

    return {
      subtotal,

      total,
      itemCount,
    };
  };

  const orderSummary = calculateOrderSummary();

  console.log(methods?.formState?.errors);

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <main className="flex-1 flex flex-col items-center px-4 md:px-10 lg:px-40 py-10">
          <div className="max-w-[1200px] w-full flex flex-col gap-8">
            {/* Page Heading */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap justify-between items-end gap-3">
                <div className="flex min-w-72 flex-col gap-1">
                  <h1 className="text-[#0e1b14] dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
                    Checkout
                  </h1>
                  <p className="text-[#4e9773] dark:text-primary/70 text-base font-normal leading-normal">
                    Review your order and finalize your project requirements
                  </p>
                </div>
              </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Forms */}
              <div className="lg:col-span-8 flex flex-col gap-4">
                <div className="flex flex-col gap-3">
                  {/* Shipping Information Form */}
                  <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(handleOrderItem)}>
                      <div className="flex flex-col rounded-xl border border-[#d0e7db] dark:border-white/10 bg-white dark:bg-white/5 px-6 py-4 group">
                        <div className="flex items-center gap-3">
                          <p className="text-[#0e1b14] dark:text-white text-lg font-bold leading-normal">
                            Shipping Information
                          </p>
                        </div>
                        <div className="pt-6 pb-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <ControlledInput
                            name="fullName"
                            placeholder="John Doe"
                            type="text"
                            label="Full Name"
                            className="rounded-lg py-3 px-4 bg-slate-50 border border-slate-200 focus:border-primary"
                          />

                          <ControlledInput
                            name="phoneNumber"
                            placeholder="+1 (555) 000-0000"
                            type="tel"
                            label="Phone Number"
                            className="rounded-lg py-3 px-4 bg-slate-50 border border-slate-200 focus:border-primary"
                          />

                          <div className="md:col-span-2">
                            <ControlledInput
                              name="streetAddress"
                              placeholder="123 Hardware Lane"
                              type="text"
                              label="Street Address"
                              className="rounded-lg py-3 px-4 bg-slate-50 border border-slate-200 focus:border-primary"
                            />
                          </div>

                          <ControlledInput
                            name="city"
                            placeholder="San Francisco"
                            type="text"
                            label="City"
                            className="rounded-lg py-3 px-4 bg-slate-50 border border-slate-200 focus:border-primary"
                          />

                          <ControlledInput
                            name="postalCode"
                            placeholder="94103"
                            type="text"
                            label="Postal Code"
                            className="rounded-lg py-3 px-4 bg-slate-50 border border-slate-200 focus:border-primary"
                          />
                        </div>
                      </div>
                    </form>
                  </FormProvider>
                </div>
              </div>

              {/* Right Column: Order Summary */}
              <div className="lg:col-span-4 sticky top-24">
                <div className="bg-white dark:bg-white/5 rounded-xl border border-[#d0e7db] dark:border-white/10 shadow-sm p-6 flex flex-col gap-6">
                  <h3 className="text-xl font-bold border-b border-[#e7f3ed] dark:border-white/10 pb-4">
                    Order Summary
                  </h3>

                  {/* Product List */}
                  <div className="flex flex-col gap-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    {cartData?.data?.items?.length > 0 ? (
                      cartData.data.items.map((item: TCartItem) => (
                        <div key={item.id} className="flex gap-4 items-center">
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-sm truncate">
                              {item.product.name}
                            </p>
                            <p className="text-xs text-[#4e9773] dark:text-primary/70">
                              Qty: {item?.quantity}
                            </p>
                          </div>
                          <p className="font-bold text-sm">
                            ${(item.unitPrice * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500 text-center py-4">
                        No items in cart
                      </p>
                    )}
                  </div>

                  {/* Financial Breakdown */}
                  <div className="flex flex-col gap-3 pt-4 border-t border-[#e7f3ed] dark:border-white/10">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#4e9773] dark:text-primary/70">
                        Subtotal ({orderSummary.itemCount} items)
                      </span>
                      <span className="font-medium">
                        ${orderSummary.subtotal.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-[#e7f3ed] dark:border-white/10">
                      <span className="text-lg font-black uppercase tracking-tight">
                        Total
                      </span>
                      <span className="text-2xl font-black text-primary">
                        ${orderSummary.total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Button
                    onClick={methods.handleSubmit(handleOrderItem)}
                    disabled={
                      addMutation?.isPending || orderSummary.itemCount === 0
                    }
                    className="px-8 py-6 bg-prime100 text-slate-200 font-semibold hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ShieldCheck size={30} />
                    {addMutation.isPending
                      ? "Processing..."
                      : "COMPLETE PURCHASE"}
                  </Button>

                  {orderSummary.itemCount === 0 && (
                    <p className="text-sm text-red-500 text-center">
                      Your cart is empty. Add items before checkout.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
