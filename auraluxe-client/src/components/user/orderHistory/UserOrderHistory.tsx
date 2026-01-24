"use client";
import { format } from "date-fns";

import { useFetchData } from "@/hooks/useApi";
import { getUserInfo } from "@/services/auth.service";
import TableDataError from "./TableDataError";
import TableDataLoading from "./TableDataLoading";

type TOrderItem = {
  id: string;
  productId: string;
  product: {
    id: string;
    name: string;
  };
  quantity: number;
  unitPrice: number;
  createdAt: string;
  updatedAt: string;
};

type TPayment = {
  id: string;
  transactionId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

type TOrderHistory = {
  id: string;
  userId: string;
  totalAmount: number;
  status: string;
  shippingFullName: string;
  shippingPhone: string;
  shippingAddress: string;
  shippingCity: string;
  shippingPostalCode: string;
  createdAt: string;
  updatedAt: string;
  items: TOrderItem[];
  payment: TPayment;
};

export default function UserOrderHistory() {
  const userData = getUserInfo();

  const {
    data: orderHistory,
    isLoading: orderDataLoading,
    error: orderDataError,
  } = useFetchData([`order-history-${userData?.userId}`], "/order/history");

  console.log("orderHistory = ", orderHistory?.data);

  let content = null;

  // * if data is loading
  if (orderDataLoading) {
    content = (
      <tr>
        <td colSpan={8} className="p-4">
          <TableDataLoading />
        </td>
      </tr>
    );
  }

  // * if any error
  if (!orderDataLoading && orderDataError) {
    content = (
      <tr>
        <td colSpan={8}>
          <TableDataError message="Failed to load order history" />
        </td>
      </tr>
    );
  }

  // * for no data
  if (!orderDataLoading && !orderDataError && orderHistory?.data?.length < 1) {
    content = (
      <tr>
        <td colSpan={8} className="p-8 text-center">
          <div className="flex flex-col items-center justify-center">
            <div className="text-gray-400 text-4xl mb-2">📦</div>
            <p className="text-gray-500">No orders found</p>
            <p className="text-gray-400 text-sm mt-1">
              Your order history will appear here
            </p>
          </div>
        </td>
      </tr>
    );
  }

  if (!orderDataLoading && !orderDataError && orderHistory?.data?.length) {
    content = orderHistory?.data?.map(
      (orderHistory: TOrderHistory, index: number) => (
        <tr
          key={orderHistory.id}
          className="border-b hover:bg-gray-50 transition-colors"
        >
          <td className="p-4  font-mono text-sm">
            {orderHistory?.payment?.transactionId || "N/A"}
          </td>

          <td className="p-4  font-semibold">
            ${orderHistory?.totalAmount?.toFixed(2)}
          </td>

          <td className="p-4">
            <div className="space-y-1">
              {orderHistory?.items?.map(
                (item: TOrderItem, itemIndex: number) => (
                  <div key={item.id} className="text-sm">
                    <div className="flex items-center gap-x-1 ">
                      <span className="text-gray-700">
                        {item?.product?.name}
                      </span>
                      <span className="text-gray-600">
                        - ( ${item?.unitPrice?.toFixed(2)} × {item?.quantity} )
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">
                      Subtotal: ${(item.unitPrice * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ),
              )}
            </div>
          </td>

          <td className="p-4 ">
            <div className="flex ">
              <span className="text-gray-700 font-medium">
                {format(new Date(orderHistory?.createdAt), "dd MMM yyyy")}
              </span>
              <span className="text-xs text-gray-500">
                {format(new Date(orderHistory?.createdAt), "hh:mm a")}
              </span>
            </div>
          </td>

          <td className="p-4 ">
            <span className="text-sm text-gray-700">
              {orderHistory?.items?.length} item
              {orderHistory?.items?.length !== 1 ? "s" : ""}
            </span>
          </td>
        </tr>
      ),
    );
  }

  return (
    <div className="CustomerOrderHistoryContainer">
      <div className="CustomerOrderHistoryWrapper bg-white border border-gray-200 shadow-sm rounded-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Order History</h3>
            <p className="text-gray-600 mt-1">
              View your past orders and transactions
            </p>
          </div>

          {orderHistory?.data?.length > 0 && (
            <div className="mt-4 md:mt-0">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {orderHistory?.data?.length} order
                {orderHistory?.data?.length !== 1 ? "s" : ""}
              </span>
            </div>
          )}
        </div>

        {/* Order History Table */}
        <div className="manageUserTable relative w-full overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Transaction ID
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Total Amount
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Products
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Order Date
                </th>

                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Items
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">{content}</tbody>
          </table>
        </div>

        {/* Summary Stats */}
        {orderHistory?.data?.length > 0 && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-100 p-4 rounded-lg">
              <p className="text-sm text-blue-700">Total Orders</p>
              <p className="text-2xl font-bold text-blue-900">
                {orderHistory?.data?.length}
              </p>
            </div>

            <div className="bg-green-100 p-4 rounded-lg">
              <p className="text-sm text-green-700">Total Spent</p>
              <p className="text-2xl font-bold text-green-900">
                $
                {orderHistory?.data
                  ?.reduce(
                    (total: number, order: TOrderHistory) =>
                      total + order.totalAmount,
                    0,
                  )
                  .toFixed(2)}
              </p>
            </div>

            <div className="bg-purple-100 p-4 rounded-lg">
              <p className="text-sm text-purple-700">Items Ordered</p>
              <p className="text-2xl font-bold text-purple-900">
                {orderHistory?.data?.reduce(
                  (total: number, order: TOrderHistory) =>
                    total + order.items.length,
                  0,
                )}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
