'use client'

import Link from "next/link";
import { FaTruck } from "react-icons/fa";

type OrderSummaryProps= {
  totalCartPrice: number;
  numberOfCartItems: number;
}


export default function OrderSummary({
  totalCartPrice,
  numberOfCartItems,
}: OrderSummaryProps) {
  const subtotal = totalCartPrice;
  const shipping = subtotal > 500 ? 0 : 100;
  const total = Math.round(shipping + subtotal);
  return (
    <>
       <div className="bg-white rounded-2xl shadow-lg overflow-hidden sticky top-6">
      {/* Gradient Header */}
      <div className="bg-gradient-to-r from-[#FF7A00] to-[#FF9933] px-6 py-5">
        <h2 className="text-2xl text-white">Order Summary</h2>
      <p className="text-primary-100 text-sm mt-1">
      You have {numberOfCartItems} {numberOfCartItems === 1 ? "item" : "items"} in your cart
    </p>
      </div>

      <div className="p-6 space-y-5">
    {/* Free Shipping Progress */}
      {shipping>0 && (
        <div className="bg-linear-to-r from-orange-50 to-amber-50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <FaTruck className="text-orange-500" />
            <span className="text-sm font-medium text-gray-700">
              Add {500-subtotal} EGP for free
              shipping
            </span>
          </div>
          <div className="h-2 bg-orange-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-orange-400 to-amber-400 rounded-full transition-all duration-500"
              style={{ width: `${subtotal/ 500 * 100}%` }}
            ></div>
          </div>
        </div>
      )}
     {shipping==0 && (
  <div className="bg-linear-to-r from-gray-100 to-gray-50 rounded-xl p-4 flex items-center gap-3">
    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
      <FaTruck  className="text-orange-400" />
    </div>
    <div>
      <p className="font-semibold text-orange-600">Free Shipping!</p>
      <p className="text-sm text-orange-600">
        You qualify for free delivery
      </p>
      
    </div>
  </div>
)}


    </div>

      <div className="p-6 space-y-4">
        {/* subtotal */}
        <div className="flex justify-between text-gray-600">
        <span>Subtotal</span>
        <span className=" text-gray-700 font-semibold text-lg">{subtotal} EGP</span>
      </div>
      {/* shipping */}
      <div className="flex justify-between text-gray-600">
        <span>Shipping</span>
        {shipping==0 ? (
          <span className="font-medium text-orange-600">FREE</span>
        ) : (
          <span className="font-medium text-gray-900">100</span>
        )}
      </div>

        {/* Estimated Total */}
        <div className="flex justify-between items-center pt-2">
          <span className="text-lg">Estimated Total</span>
          <span className="text-2xl text-orange-400 font-bold">
            {total} EGP
          </span>
         
        </div>
       <Link href={"/checkout"} className="w-full">

        {/* Checkout Button */}
        <button className="w-full bg-[#FF7A00] hover:bg-[#E66D00] text-white py-4 rounded-xl text-lg transition-colors mt-6">
          Checkout
        </button>
       </Link>

        
      </div>
    </div>
    </>
  )
}
