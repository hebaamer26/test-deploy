'use client'
import { FaMinus, FaRegStar } from "react-icons/fa"
import { ProductDetailsTypes } from "../../Types/AllProductsTypes"
import { BsPlus, BsTruck } from "react-icons/bs"
import Link from "next/link"
import { BiChevronRight, BiHeart, BiShield } from "react-icons/bi"
import { CgShoppingCart } from "react-icons/cg"
import { LuRefreshCw } from "react-icons/lu"
import { useState } from "react"
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/image-gallery.css";
import { addProductToCart, getLoggedUserCart } from "@/features/cart/Server/CartServerAction"
import { toast } from "react-toastify"
import { setCartInfo } from "@/features/cart/store/CartSlice"
import { addProductToWishlist, getLoggedUserWishlist } from "@/features/Wishlist/Server/WishlistServerAction"
import { setWishlistInfo } from "@/features/Wishlist/Store/WishlistSlice"
import { useAppDispatch, useAppSelector } from '@/store/Hooks';
import { openAuthModal } from '@/store/uiSlice';

export default function ProductInfo({ product }: { product: ProductDetailsTypes }) {

  const {
    _id,
    brand,
    title,
    category,
    price,
    imageCover,
    ratingsAverage,
    ratingsQuantity,
    slug,
    description,
    sold,
    images,
    quantity,
    reviews,
    subcategory
  } = product


  const isLowStock = quantity > 0 && quantity < 10;

  const [count, setCount] = useState(1);
  const dispatch = useAppDispatch()
  const { isAuthentication } = useAppSelector((state: any) => state.Auth);

  //Add to cart
  async function HandleAddToCart() {
    if (!isAuthentication) {
      dispatch(openAuthModal("Please log in to add products to your cart."));
      return;
    }

    try {
      const response = await addProductToCart({ productId: _id });
      console.log(response);
      if (response.status === "success") {
        toast.success(response.message);
        //set cart info
        const cartInfo = await getLoggedUserCart()
        dispatch(setCartInfo(cartInfo))
      }
    } catch (error) {
      toast.error("failed to add product to cart")
    }
  }

  //handle add to wishlist
  async function HandleAddToWishlist() {
    if (!isAuthentication) {
      dispatch(openAuthModal("Please log in to add products to your wishlist."));
      return;
    }

    try {
      const response = await addProductToWishlist({ productId: _id });
      console.log(response);
      if (response.status === "success") {
        toast.success(response.message);
        //set wishlist info
        const wishlistInfo = await getLoggedUserWishlist()
        dispatch(setWishlistInfo(wishlistInfo))
      }
    } catch (error) {
      toast.error("failed to add product to wishlist")
    }
  }


  return (
    <div className="min-h-screen bg-white ">
      <div className="container mx-auto px-6 py-8">

        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-[#FF7A00] transition-colors">
            Home
          </Link>
          <BiChevronRight className="w-4 h-4" />
          <Link href="/" className="hover:text-[#FF7A00] transition-colors">
            {category.name}
          </Link>
          <BiChevronRight className="w-4 h-4" />
          <span className="text-gray-700">{title}</span>
        </div>

        {/* ✅ Main Grid Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">

          {/* ================= LEFT SIDE (Images) ================= */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-xl shadow-sm p-4 sticky top-4">
              <ImageGallery
                items={images.map((image) => ({
                  original: image,
                  thumbnail: image,
                }))}
                showFullscreenButton={false}
                showNav={false}
                showPlayButton={false}
              />
            </div>
          </div>

          {/* ================= RIGHT SIDE (Product Info) ================= */}
          <div className="lg:col-span-8">

            <span className="inline-block px-3 py-1 rounded-full bg-orange-50 text-[#FF7A00] text-sm mb-3">
              {category.name}
            </span>

            <h1 className="text-4xl mb-4">{title}</h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <FaRegStar
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(ratingsAverage)
                      ? 'text-[#FF7A00] fill-[#FF7A00]'
                      : 'text-gray-300'
                      }`}
                  />
                ))}
              </div>
              <span className="text-gray-600">
                {ratingsAverage} ({ratingsQuantity} reviews)
              </span>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2 mb-6">
              {quantity > 0 ? (
                <span className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-green-50 text-green-700">
                  <span className={`w-2 h-2 rounded-full ${isLowStock ? "bg-yellow-600" : "bg-green-500"}`}></span>
                  {isLowStock
                    ? `Only ${quantity} left - Order soon!`
                    : "In Stock"}
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-red-50 text-red-700">
                  <span className="w-2 h-2 rounded-full bg-red-500"></span>
                  Out of Stock
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-700 mb-6 leading-relaxed">
              {description}
            </p>

            {/* Quantity */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden">
                  <button
                    id="decrease-qty"
                    className="px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-primary-600 transition disabled:opacity-50"
                    onClick={() => { setCount(count - 1) }}
                  >
                    <FaMinus />
                  </button>

                  <input
                    type="number"
                    min={1}
                    className="w-16 text-center border-0 focus:ring-0 focus:outline-none text-lg font-medium"
                    id="quantity"
                    onChange={(e) => { setCount(+e.target.value) }}
                    value={count}
                  />

                  <button
                    id="increase-qty"
                    className="px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-primary-600 transition disabled:opacity-50"
                    onClick={() => { setCount(count + 1) }}
                  >
                    <BsPlus />
                  </button>
                </div>
                <span className="text-sm text-gray-500">{quantity} available</span>
              </div>
            </div>

            {/* Total Price */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Price:</span>
                <span className="text-2xl font-bold text-primary-600">
                  {count * (price)} EGP
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-8">
              <button className="flex-1 flex items-center justify-center gap-2 py-4 bg-[#FF7A00] text-white rounded-xl hover:bg-[#E66D00] transition-colors text-lg"
                onClick={HandleAddToCart}>
                <CgShoppingCart className="w-5 h-5"

                />
                Add to Cart
              </button>
              <button className="w-14 h-14 flex items-center justify-center border-2 border-[#FF7A00] rounded-xl hover:bg-orange-50 transition-colors"
                onClick={HandleAddToWishlist}
              >
                <BiHeart className="w-6 h-6 text-[#FF7A00]" />
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 py-6 border-y border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
                  <BsTruck className="w-6 h-6 text-[#FF7A00]" />
                </div>
                <div>
                  <div className="text-sm">Free Shipping</div>
                  <div className="text-xs text-gray-500">Orders over $50</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
                  <LuRefreshCw className="w-6 h-6 text-[#FF7A00]" />
                </div>
                <div>
                  <div className="text-sm">Easy Returns</div>
                  <div className="text-xs text-gray-500">30-day policy</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
                  <BiShield className="w-6 h-6 text-[#FF7A00]" />
                </div>
                <div>
                  <div className="text-sm">Secure Payment</div>
                  <div className="text-xs text-gray-500">100% protected</div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}