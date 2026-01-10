"use client";

import { useEffect, useState } from "react";

// export interface IRecentProduct {
//   _id: string;
//   name: string;
//   slug: string;
//   status: boolean;
//   brand: any;
//   productImages: any;
//   brandName: string;
// }

export default function useRecentProduct() {
  // const [recentProducts, setRecentProducts] = useState<IRecentProduct[]>([]);
  const [recentProducts, setRecentProducts] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load Recent Product from localStorage on component mount
  useEffect(() => {
    const savedRecentProducts = localStorage.getItem("recentProducts");
    if (savedRecentProducts) {
      try {
        setRecentProducts(JSON.parse(savedRecentProducts));
      } catch (error) {
        console.error("Error parsing Recent Product from localStorage:", error);
        setRecentProducts([]);
      }
    }
    setIsInitialized(true);
  }, []);

  // Save Recent Product to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("recentProducts", JSON.stringify(recentProducts));
    }
  }, [recentProducts, isInitialized]);

  const addToRecentProducts = (product: any) => {
    setRecentProducts((prev) => {
      const filtered = prev.filter((item) => item?._id !== product?._id);

      const updatedData = [product, ...filtered];

      return updatedData?.slice(0, 12);
    });
  };

  const removeFromRecentProducts = (productId: string) => {
    setRecentProducts((prev) => prev.filter((item) => item._id !== productId));
  };

  const clearRecentProducts = () => {
    setRecentProducts([]);
  };

  const getRecentProductsCount = () => {
    return recentProducts.length;
  };

  // Get recent products excluding current product
  const getRecentProductsExcluding = (excludeProductId: string) => {
    return recentProducts.filter(
      (item) => item._id !== excludeProductId && item.status === true
    );
  };

  return {
    recentProducts,
    addToRecentProducts,
    removeFromRecentProducts,
    clearRecentProducts,
    getRecentProductsCount,
    getRecentProductsExcluding,
    isInitialized,
  };
}
