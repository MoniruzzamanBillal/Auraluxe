"use client";
import { Button } from "@/components/ui/button";
import { usePost } from "@/hooks/useApi";
import { ShieldCheck } from "lucide-react";

export default function CheckoutPage() {
  const addMutation = usePost([["orderItem"]]);

  // ! testing order item
  const handleOrderItem = async () => {
    try {
      const orderResponse = await addMutation.mutateAsync({
        url: "/order/place-order",
        payload: { test: "test" },
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

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <main className="flex-1 flex flex-col items-center px-4 md:px-10 lg:px-40 py-10">
          <div className="max-w-[1200px] w-full flex flex-col gap-8">
            {/* <!-- Page Heading & Progress --> */}
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
            {/* <!-- Main Grid --> */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* <!-- Left Column: Forms --> */}
              <div className="lg:col-span-8 flex flex-col gap-4">
                <div className="flex flex-col gap-3">
                  {/* <!-- Accordion 1: Shipping --> */}
                  <div className="flex flex-col rounded-xl border border-[#d0e7db] dark:border-white/10 bg-white dark:bg-white/5 px-6 py-4 group">
                    <div className="flex items-center gap-3">
                      <p className="text-[#0e1b14] dark:text-white text-lg font-bold leading-normal">
                        Shipping Information
                      </p>
                    </div>
                    <div className="pt-6 pb-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-[#0e1b14] dark:text-white/80">
                          Full Name
                        </label>
                        <input
                          className="rounded-lg py-3 px-2 bg-slate-100 "
                          placeholder="John Doe"
                          type="text"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-[#0e1b14] dark:text-white/80">
                          Phone Number
                        </label>
                        <input
                          className="rounded-lg py-3 px-2 bg-slate-100 "
                          placeholder="+1 (555) 000-0000"
                          type="tel"
                        />
                      </div>
                      <div className="flex flex-col gap-2 md:col-span-2">
                        <label className="text-sm font-medium text-[#0e1b14] dark:text-white/80">
                          Street Address
                        </label>
                        <input
                          className="rounded-lg py-3 px-2 bg-slate-100 "
                          placeholder="123 Hardware Lane"
                          type="text"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-[#0e1b14] dark:text-white/80">
                          City
                        </label>
                        <input
                          className="rounded-lg py-3 px-2 bg-slate-100 "
                          placeholder="San Francisco"
                          type="text"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-[#0e1b14] dark:text-white/80">
                          Postal Code
                        </label>
                        <input
                          className="rounded-lg py-3 px-2 bg-slate-100 "
                          placeholder="94103"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- Right Column: Order Summary --> */}
              <div className="lg:col-span-4 sticky top-24">
                <div className="bg-white dark:bg-white/5 rounded-xl border border-[#d0e7db] dark:border-white/10 shadow-sm p-6 flex flex-col gap-6">
                  <h3 className="text-xl font-bold border-b border-[#e7f3ed] dark:border-white/10 pb-4">
                    Order Summary
                  </h3>
                  {/* <!-- Product List --> */}
                  <div className="flex flex-col gap-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    <div className="flex gap-4 items-center">
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm truncate">
                          Brushed Steel Door Handle
                        </p>
                        <p className="text-xs text-[#4e9773] dark:text-primary/70">
                          Qty: 4
                        </p>
                      </div>
                      <p className="font-bold text-sm">$180.00</p>
                    </div>
                    <div className="flex gap-4 items-center">
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm truncate">
                          Industrial Drawer Slides 24
                        </p>
                        <p className="text-xs text-[#4e9773] dark:text-primary/70">
                          Qty: 2
                        </p>
                      </div>
                      <p className="font-bold text-sm">$85.00</p>
                    </div>
                    <div className="flex gap-4 items-center">
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm truncate">
                          Architectural Hinge Set (Gold)
                        </p>
                        <p className="text-xs text-[#4e9773] dark:text-primary/70">
                          Qty: 12
                        </p>
                      </div>
                      <p className="font-bold text-sm">$144.00</p>
                    </div>
                  </div>
                  {/* <!-- Financial Breakdown --> */}
                  <div className="flex flex-col gap-3 pt-4 border-t border-[#e7f3ed] dark:border-white/10">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#4e9773] dark:text-primary/70">
                        Subtotal
                      </span>
                      <span className="font-medium">$409.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#4e9773] dark:text-primary/70">
                        Shipping
                      </span>
                      <span className="font-medium text-primary">Free</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#4e9773] dark:text-primary/70">
                        Tax (8.5%)
                      </span>
                      <span className="font-medium">$34.77</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-[#e7f3ed] dark:border-white/10">
                      <span className="text-lg font-black uppercase tracking-tight">
                        Total
                      </span>
                      <span className="text-2xl font-black text-primary">
                        $443.77
                      </span>
                    </div>
                  </div>
                  {/* <!-- CTA --> */}
                  <Button
                    onClick={() => handleOrderItem()}
                    className=" px-8 py-6 bg-prime100 text-slate-200 font-semibold  hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer "
                  >
                    <ShieldCheck size={30} />
                    COMPLETE PURCHASE
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
