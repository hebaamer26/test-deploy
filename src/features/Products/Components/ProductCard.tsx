'use client'
import { FaPlus, FaRegEye, FaRegHeart, FaRegStar, FaStar } from 'react-icons/fa';
import { ProductsTypes, Brand } from '../Types/AllProductsTypes';
import { addProductToCart, getLoggedUserCart } from '@/features/cart/Server/CartServerAction';
import { toast } from 'react-toastify';
import { setCartInfo } from '@/features/cart/store/CartSlice';
import { useAppDispatch, useAppSelector } from '@/store/Hooks';
import { addProductToWishlist, getLoggedUserWishlist } from '@/features/Wishlist/Server/WishlistServerAction';
import wishlist from '@/app/(platform)/wishlist/page';
import { setWishlistInfo } from '@/features/Wishlist/Store/WishlistSlice';
import { openAuthModal } from '@/store/uiSlice';
import Link from 'next/link';




export function ProductCard({ info }: { info: ProductsTypes }) {
  const { _id, sold, brand, category, imageCover, price, slug, quantity, ratingsQuantity, title, priceAfterDiscount, ratingsAverage, description } = info;
  const dispatch = useAppDispatch()
  const { isAuthentication } = useAppSelector((state: any) => state.Auth);

  //Add to cart
  async function HandleAddToCart() {
    // Check if user is logged in
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
    // Check if user is logged in
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



    <div className="group  bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden w-full max-w-[300px] ">
      {/* Image Section */}
      <div className="relative  overflow-hidden bg-white">
        <img
          src={imageCover}
          alt={title}
          className="w-full h-55 object-contain transition-transform duration-300 group-hover:scale-105"
        />

        {/* Sale Badge
        {onSale && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded">
            SALE
          </div>
        )} */}

        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {/* Wishlist */}
          <button
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110"
            aria-label="Add to wishlist"
            onClick={HandleAddToWishlist}
          >
            <FaRegHeart
              size={16}
              className={`transition-all `}
            />
          </button>

          {/* Quick View */}
          <button
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110"
            aria-label="Quick view"
          >
            <Link href={`/products/${_id}`}>
              <FaRegEye size={16} className="text-gray-600" />
            </Link>
          </button>
        </div>
      </div>

      {/* Product Info Section */}
      <div className="pt-3 px-3">
        {/* Category */}
        <p className="text-xs text-gray-500 mb-1">
          {category.name}
        </p>

        {/* Product description */}
        <Link href={`/products/${_id}`}>
          <h3 className="text-sm font-medium text-gray-900  line-clamp-2 leading-tight cursor-pointer">
            {title}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <FaRegStar
                key={i}
                size={12}
                className={`${i < Math.floor(ratingsAverage)
                  ? "fill-orange-400 text-orange-400"
                  : "text-gray-400"
                  }`}
              />
            ))}
          </div>
          <span className="text-[15px] text-gray-600 bold ">
            {ratingsAverage} ({ratingsQuantity} reviews)
          </span>
        </div>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between pb-3">
          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-orange-600">
              {price} EGP
            </span>
            {/* {oldPrice && (
              <span className="text-sm text-gray-400 line-through">
                {oldPrice} EGP
              </span>
            )} */}
          </div>

          {/* Add to Cart Button */}
          <button
            className="w-9 h-9 flex items-center justify-center rounded-full bg-orange-400 text-white shadow-md hover:shadow-lg hover:scale-110 active:scale-95 transition-all duration-200"
            aria-label="Add to cart"
            onClick={HandleAddToCart}
          >
            <FaPlus size={18} strokeWidth={2.5} />

          </button>
        </div>
      </div>
    </div>

  );
}
