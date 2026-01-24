"use client";

import { Button } from "@/components/ui/button";
import { PackageSearch, ShoppingBasket } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EmptyCart() {
  const router = useRouter();

  return (
    <main className="grow flex flex-col justify-center items-center px-6 py-20">
      <div className="max-w-[640px] w-full text-center">
        {/* <!-- Illustration Container --> */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="size-40 bg-prime50/15 rounded-full flex items-center justify-center relative z-10">
              <ShoppingBasket size={60} />
            </div>
            {/* <!-- Decorative elements --> */}
            <div className="absolute -top-4 -right-4 size-16 bg-primary/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-6 -left-6 size-24 bg-primary/30 rounded-full blur-2xl"></div>
          </div>
        </div>
        {/* <!-- Empty State Typography --> */}
        <div className="space-y-4 mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-[#0e1b14] dark:text-white">
            Your cart is empty
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-[480px] mx-auto leading-relaxed">
            Explore our premium selection of architectural hardware and find the
            perfect pieces for your next project.
          </p>
        </div>
        {/* <!-- Call to Action --> */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            onClick={() => router.push("/product")}
            className=" px-8 py-6 bg-prime100 text-slate-200 font-bold text-lg  hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer "
          >
            <PackageSearch size={24} />
            Browse Products
          </Button>
        </div>
      </div>
    </main>
  );
}
