"use client";

import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";

export default function PaymentFail() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    // Extract error message from URL parameters if available
    const error = searchParams.get("error") || searchParams.get("message");
    if (error) {
      setErrorMessage(decodeURIComponent(error));
    } else {
      setErrorMessage("Your payment could not be processed.");
    }
  }, [searchParams]);

  const handleRetryPayment = () => {
    const orderId = searchParams.get("order_id");
    if (orderId) {
      router.push(`/checkout?retry_order=${orderId}`);
    } else {
      router.push("/cart");
    }
  };

  const handleNavigateProducts = () => {
    router.push("/products");
  };

  const handleContactSupport = () => {
    router.push("/contact");
  };

  return (
    <div className="PaymentFailContainer bg-gray-100">
      <div className="PaymentFailWrapper min-h-screen flex justify-center items-center">
        <div className="confirmationCard bg-white py-8 px-6 md:px-16 rounded-md shadow-md border border-gray-300 flex flex-col justify-center items-center gap-y-4 max-w-md mx-4">
          {/* Error Icon */}
          <div className="icon text-center flex justify-center items-center">
            <IoIosCloseCircleOutline className="text-7xl text-red-600" />
          </div>

          {/* Title */}
          <h2 className="text-3xl font-semibold text-gray-800">
            Payment Failed
          </h2>

          {/* Error Message */}
          <p className="text-gray-600 text-center text-lg">{errorMessage}</p>

          {/* Additional Help Text */}
          <p className="text-gray-500 text-center text-sm mt-2">
            Please try again or contact support if the problem persists.
          </p>

          {/* Error Code (if available) */}
          {searchParams.get("error_code") && (
            <div className="mt-2 p-2 bg-gray-100 rounded text-sm">
              <span className="font-medium">Error Code:</span>{" "}
              {searchParams.get("error_code")}
            </div>
          )}

          {/* Transaction ID (if available) */}
          {searchParams.get("transaction_id") && (
            <div className="mt-1 p-2 bg-gray-100 rounded text-sm">
              <span className="font-medium">Transaction ID:</span>{" "}
              {searchParams.get("transaction_id")}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 w-full mt-4">
            <Button
              onClick={handleRetryPayment}
              className="bg-red-600 hover:bg-red-700 hover:scale-[1.01] hover:shadow-md active:scale-100 w-full"
            >
              Try Payment Again
            </Button>

            <Button
              onClick={handleNavigateProducts}
              variant="outline"
              className="border-gray-300 hover:bg-gray-50 hover:scale-[1.01] hover:shadow-md active:scale-100 w-full"
            >
              Continue Shopping
            </Button>

            <Button
              onClick={handleContactSupport}
              variant="outline"
              className="border-blue-300 text-blue-600 hover:bg-blue-50 hover:scale-[1.01] hover:shadow-md active:scale-100 w-full"
            >
              Contact Support
            </Button>
          </div>

          {/* Additional Help Section */}
          <div className="mt-6 pt-4 border-t border-gray-200 w-full">
            <p className="text-gray-500 text-sm text-center">
              Need immediate assistance?
            </p>
            <div className="flex flex-col gap-2 mt-2 text-sm">
              <div className="flex items-center justify-center gap-2">
                <span className="text-gray-600">Email:</span>
                <a
                  href="mailto:support@example.com"
                  className="text-blue-600 hover:underline"
                >
                  support@example.com
                </a>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-gray-600">Phone:</span>
                <a
                  href="tel:+880XXXXXXXXXX"
                  className="text-blue-600 hover:underline"
                >
                  +880 XXXX-XXXXXX
                </a>
              </div>
            </div>
          </div>

          {/* Tips to avoid payment failure */}
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800">
            <p className="font-medium mb-1">Tips for successful payment:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Ensure your card details are correct</li>
              <li>Check if you have sufficient balance</li>
              <li>Verify your internet connection is stable</li>
              <li>Try using a different payment method</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
