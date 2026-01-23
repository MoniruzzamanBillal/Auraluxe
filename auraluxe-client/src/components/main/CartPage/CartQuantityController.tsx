"use client";

import { Minus, Plus } from "lucide-react";

type TQuantityControllerProps = {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  disabled?: boolean;
};

export default function CartQuantityController({
  quantity,
  onIncrease,
  onDecrease,
  disabled = false,
}: TQuantityControllerProps) {
  return (
    <div className="inline-flex items-center border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-slate-50">
      <button
        className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={onDecrease}
        disabled={disabled || quantity <= 1}
      >
        <Minus size={14} />
      </button>
      <input
        className="w-10 text-center border-none bg-transparent text-sm font-bold focus:ring-0"
        type="text"
        value={quantity}
        readOnly
      />
      <button
        className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={onIncrease}
        disabled={disabled}
      >
        <Plus size={14} />
      </button>
    </div>
  );
}
