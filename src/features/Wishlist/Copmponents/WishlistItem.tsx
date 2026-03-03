'use client';
import { BiTrash } from "react-icons/bi";
import { CgShoppingCart } from "react-icons/cg";
import { removeProductFromWishlist } from "../Server/WishlistServerAction";
import { removeProduct } from "../Store/WishlistSlice";
import { useAppDispatch } from "@/store/Hooks";
import { WishlistProduct } from "../Types/WishlistTypes";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export default function WishlistItem({
  info,
  onAddToCart,
}: {
  info: WishlistProduct;
  onAddToCart: (id: string) => void;
}) {
  const {
    _id,
    category,
    imageCover,
    price,
    quantity,
    title,
  } = info;

  const dispatch = useAppDispatch();


  const inStock = quantity > 0;

  const handleRemove = async () => {
    const result = await Swal.fire({
      html: `<div class="text-center py-2">
          <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
              <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-3h4a2 2 0 012 2v1H8V6a2 2 0 012-2z"/>
              </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">Remove Item?</h3>
          <p class="text-gray-500 text-sm leading-relaxed">
              Remove 
              <span class="font-semibold text-gray-700">
                  ${title.slice(0, 40)}${title.length > 40 ? "..." : ""}
              </span> 
              from your wishlist?
          </p>
      </div>`,
      showCancelButton: true,
      confirmButtonText: "Remove",
      cancelButtonText: "Cancel",
      customClass: {
        confirmButton:
          "bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200",
        cancelButton:
          "bg-gray-300 hover:bg-gray-400 text-black font-semibold py-3 px-6 rounded-xl transition-colors duration-200",
      },
    });

    if (result.isConfirmed) {
      try {
        // نستنى السيرفر الأول
        await removeProductFromWishlist(_id);

        // لو نجح نحذف من redux
        dispatch(removeProduct({ id: _id }));

        toast.success(`${title} removed from wishlist`);
      } catch (error) {
        toast.error("Failed to remove item");
      }
    }
  };

  return (
    <div className="bg-[#FAFAFA] rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow relative">
      {/* زرار الحذف */}
      <button
        onClick={handleRemove}
        className="absolute top-4 right-4 p-2 hover:bg-red-50 rounded-lg transition-colors"
        aria-label="Remove from wishlist"
      >
        <BiTrash className="w-5 h-5 text-red-400 hover:text-red-600" />
      </button>

      <div className="flex items-center gap-6">
        {/* صورة المنتج */}
        <div className="flex-shrink-0">
          <img
            src={imageCover}
            alt={title}
            className="w-32 h-32 object-cover rounded-xl"
          />
        </div>

        <div className="flex-1 min-w-0">
          {/* اسم المنتج */}
          <h3 className="text-lg mb-2 pr-8">{title}</h3>

          {/* التصنيف */}
          <span className="inline-block px-3 py-1 rounded-full bg-orange-50 text-[#FF7A00] text-sm mb-3">
            {category.name}
          </span>

          {/* السعر */}
          <div className="text-2xl text-[#FF7A00] mb-4">
            ${price.toFixed(2)}
          </div>

          {/* حالة المخزون */}
          <div className="flex items-center gap-2 mb-4">
            <span
              className={`inline-block w-2 h-2 rounded-full ${
                inStock ? "bg-green-500" : "bg-red-500"
              }`}
            />
            <span
              className={`text-sm ${
                inStock ? "text-green-600" : "text-red-600"
              }`}
            >
              {inStock ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          {/* زرار Add to Cart */}
          <button
            onClick={() => onAddToCart(_id)}
            disabled={!inStock}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors
              ${
                inStock
                  ? "bg-[#FF7A00] text-white hover:bg-[#E66D00]"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }
            `}
          >
            <CgShoppingCart className="w-4 h-4" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}