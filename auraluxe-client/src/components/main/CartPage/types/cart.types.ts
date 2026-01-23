export type TCartItem = {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  product: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    productImage: string;
    productCode: string | null;
    brand?: {
      name?: string;
      logo?: string;
    };
    specifications?: string;
  };
};

export type TCartResponse = {
  id: string;
  userId: string;
  items: TCartItem[];
};

export type TCartOrderSummary = {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  itemCount: number;
};
