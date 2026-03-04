'use client'
import { appStateType } from "@/store/AppStore";
import { BiChevronRight, BiTrash } from "react-icons/bi";
import { CgShoppingCart } from "react-icons/cg";
import { useAppSelector } from "@/store/Hooks";
import CartItem from "./CartItem";
import OrderSummary from "./OrderSummary";
import { TiShoppingCart } from "react-icons/ti";





export default function Cart() {
  const { numOfCartItems, products, totalCartPrice } = useAppSelector((state) => state.Cart);

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Main Container */}
        <div className="container mx-auto px-6 py-8">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <a href="/" className="hover:text-[#FF7A00] transition-colors">
              Home
            </a>
            <BiChevronRight className="w-4 h-4" />
            <span className="text-gray-700">Shopping Cart</span>
          </div>

          {/* Page Title */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-orange-400 rounded-xl flex items-center justify-center">
              <TiShoppingCart className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-4xl text-gray-700">Shopping Cart</h1>
          </div>

          {/* Item Count */}
          <p className="text-gray-600 mb-6">
            You have <span className="text-[#FF7A00]">{numOfCartItems} {numOfCartItems !== 1 ? 'items' : 'item'}</span> in your cart
          </p>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-15">
            {/* Cart Items Section */}
            <div className={`${numOfCartItems === 0 ? 'lg:col-span-3' : 'lg:col-span-2'} space-y-4`}>
              {numOfCartItems == 0 ? (
                <div className="bg-[#FAFAFA] rounded-2xl p-12 text-center">
                  <CgShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg mb-4">Your cart is empty</p>
                  <a
                    href="/"
                    className="inline-block text-[#FF7A00] hover:underline"
                  >
                    Continue Shopping
                  </a>
                </div>
              ) : (
                products.map(item => (
                  <CartItem
                    key={item.product._id}
                    info={item}


                  />
                ))
              )}
            </div>

            {/* Order Summary Section */}
            {numOfCartItems > 0 && (
              <div className="lg:col-span-1">
                <OrderSummary totalCartPrice={totalCartPrice} numberOfCartItems={numOfCartItems} />
              </div>
            )}
          </div>


        </div>
      </div>

    </>
  )
}
