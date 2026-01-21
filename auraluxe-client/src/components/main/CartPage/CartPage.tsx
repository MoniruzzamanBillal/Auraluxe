"use client";

import { ArrowLeft, ArrowRight, Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";

import dummyProduct from "@/../public/product/product1.png";
import Breadcrumb from "@/components/share/Breadcrumb";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  return (
    <div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* <!-- Breadcrumbs --> */}
        <Breadcrumb />

        {/* <!-- Page Heading --> */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-4xl font-black tracking-tight mb-2">
              Shopping Cart
            </h2>
            <p className="text-slate-500">You have 3 items in your cart.</p>
          </div>
          <a
            className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline group"
            href="#"
          >
            <ArrowLeft />
            Continue Shopping
          </a>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* <!-- Left Column: Cart Items --> */}
          <div className="lg:col-span-8 space-y-4">
            {/* <!-- Table-like Header for Desktop --> */}
            <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-bold uppercase tracking-wider text-slate-500">
              <div className="col-span-6">Product Details</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Subtotal</div>
            </div>
            {/* <!-- Item 1 --> */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
              <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-6 flex items-center gap-4">
                  <div className="rounded-lg bg-slate-100 shrink-0 overflow-hidden border border-slate-100 dark:border-slate-700 size-28 ">
                    <Image
                      height={1280}
                      width={1280}
                      className="w-full h-full "
                      alt="Brushed brass door handle minimalist design"
                      src={dummyProduct}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                      Modern Brass Lever Handle
                    </h3>
                    <p className="text-sm text-slate-500">
                      Finish: Satin Brass
                    </p>
                    <p className="text-sm text-slate-500">SKU: ARCH-2024-BH</p>
                    <button className="mt-2 flex items-center gap-1 text-xs font-bold text-red-500 hover:text-red-600 hover:underline cursor-pointer transition-colors uppercase tracking-tight">
                      <Trash2 size={14} />
                      <span className="material-symbols-outlined text-sm">
                        delete
                      </span>
                    </button>
                  </div>
                </div>
                <div className="md:col-span-2 text-center">
                  <span className="block text-xs md:hidden text-slate-500 font-bold uppercase mb-1">
                    Price
                  </span>
                  <span className="font-medium">$45.00</span>
                </div>
                <div className="md:col-span-2 flex justify-center  ">
                  <div className=" inline-flex items-center  border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-slate-50 ">
                    <button className=" p-2 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                      <Minus size={14} />
                    </button>
                    <input
                      className="w-10 text-center border-none bg-transparent text-sm font-bold focus:ring-0"
                      type="text"
                      value="1"
                    />
                    <button className=" p-2 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
                <div className="md:col-span-2 text-right">
                  <span className="block text-xs md:hidden text-slate-500 font-bold uppercase mb-1">
                    Subtotal
                  </span>
                  <span className="font-bold text-lg">$45.00</span>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Right Column: Order Summary (Sticky) --> */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                Order Summary
              </h2>
              <div className="space-y-4 text-sm mb-3 ">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal (3 items)</span>
                  <span className="text-slate-900 dark:text-white font-medium">
                    $303.50
                  </span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Estimated Shipping</span>
                  <span className="text-slate-900 dark:text-white font-medium">
                    $12.00
                  </span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Tax (VAT 5%)</span>
                  <span className="text-slate-900 dark:text-white font-medium">
                    $15.18
                  </span>
                </div>
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Order Total</span>
                    <span className="text-slate-900 dark:text-white">
                      $330.68
                    </span>
                  </div>
                </div>
              </div>

              {/* <!-- Checkout Button --> */}
              <Button className=" bg-prime100 hover:bg-prime200 cursor-pointer text-slate-100 hover:scale-[1.01] active:scale-[0.99] transition-all ">
                Proceed to Checkout
                <ArrowRight />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
