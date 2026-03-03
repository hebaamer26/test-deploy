'use client';
import { BiChevronRight, BiHeart } from "react-icons/bi";
import { CgShoppingCart } from "react-icons/cg";
import { useAppSelector, useAppDispatch } from "@/store/Hooks";
import WishlistItem from "./WishlistItem";
import { WishlistProduct } from "../Types/WishlistTypes";
import { openAuthModal } from "@/store/uiSlice";
import { addProductToCart, getLoggedUserCart } from "@/features/cart/Server/CartServerAction";
import { setCartInfo } from "@/features/cart/store/CartSlice";
import { toast } from "react-toastify";


export default function Wishlist() {
  const { products, numOfItems } = useAppSelector((state) => state.Wishlist);
  const dispatch = useAppDispatch();
  const handleAddToCart = async (id: string) => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(openAuthModal("Please log in to add products to your cart."));
      return;
    }

    try {
      const response = await addProductToCart({ productId: id });
      if (response.status === "success") {
        toast.success(response.message);
        const cartInfo = await getLoggedUserCart();
        dispatch(setCartInfo(cartInfo));
      }
    } catch (error) {
      toast.error("Failed to add product to cart");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-8">

        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <a href="#" className="hover:text-[#FF7A00] transition-colors">
            Home
          </a>
          <BiChevronRight className="w-4 h-4" />
          <span className="text-gray-700">Wishlist</span>
        </div>

        {/* Title */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-[#FF7A00] rounded-xl flex items-center justify-center">
            <BiHeart className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-4xl">My Wishlist</h1>
        </div>

        <div className="lg:col-span-2 space-y-4">
          {numOfItems === 0 ? (
            <div className="bg-[#FAFAFA] rounded-2xl p-12 text-center">
              <CgShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg mb-4">
                Your wishlist is empty
              </p>
              <a
                href="/"
                className="inline-block text-[#FF7A00] hover:underline"
              >
                Continue Shopping
              </a>
            </div>
          ) : (
            products.map((item: WishlistProduct) => (
              <WishlistItem
                key={item._id}
                info={item}
                onAddToCart={handleAddToCart}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}