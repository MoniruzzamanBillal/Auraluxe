export default function CartTableHeader() {
  return (
    <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-bold uppercase tracking-wider text-slate-500">
      <div className="col-span-6">Product Details</div>
      <div className="col-span-2 text-center">Price</div>
      <div className="col-span-2 text-center">Quantity</div>
      <div className="col-span-2 text-right">Subtotal</div>
    </div>
  );
}
