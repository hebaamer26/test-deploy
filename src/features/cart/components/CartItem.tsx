'use client'
import { BiChevronRight, BiMinus, BiPlus, BiTrash } from "react-icons/bi"
import { useAppDispatch } from "@/store/Hooks";
import { CartProduct } from "../types/CartTypes";
import { useState } from "react";
import { removeProductFromCart, updateProductQuantity } from "../Server/CartServerAction";
import { toast } from 'react-toastify';
import { removeProduct, setCartInfo } from "../store/CartSlice";
import Swal from 'sweetalert2'

export default function CartItem({ info }: { info: CartProduct }) {

    const { _id, count, price, product } = info;
    const { brand, category, imageCover, quantity, ratingsAverage, title, subcategory } = product
    const dispatch = useAppDispatch()

    // handle remove item
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
                    from your cart?
                </p>
            </div>`,
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: "Remove",
            cancelButtonText: "Cancel",
            customClass: {
                confirmButton:
                    `bg-green-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200`,
                cancelButton:
                    `bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200`,
            },
        });

        if (result.isConfirmed) {
            dispatch(removeProduct({ id: product._id }));
            const response = await removeProductFromCart(product._id);
            toast.success("item removed from cart");
        }
    };

    // handle quantity
    const handleUpdate = async (newCount: number) => {
        if (newCount < 1) return;

        try {
            const response = await updateProductQuantity(product._id, newCount);
            dispatch(setCartInfo(response))
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="bg-[#FAFAFA] rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow relative">
                <button
                    onClick={() => handleRemove()}
                    className="absolute top-4 right-4 p-2 hover:bg-red-50 rounded-lg transition-colors"
                    aria-label="Remove item"
                >
                    <BiTrash className="w-5 h-5 text-red-400 hover:text-red-600" />
                </button>

                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 text-center sm:text-left">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                        <img
                            src={imageCover}
                            alt={title}
                            className="w-full sm:w-32 h-40 sm:h-32 object-cover rounded-xl"
                        />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                        <h3 className="text-lg mb-2 pr-8">{title}</h3>
                        <span className="inline-block px-3 py-1 rounded-full bg-orange-50 text-[#FF7A00] text-sm mb-3">{category.name}</span>

                        {/* Price Section */}
                        <div className="mb-4">
                            <div className="flex items-baseline gap-2">
                                <span className="text-lg text-orange-400 font-bold">{price} EGP</span>
                            </div>
                        </div>

                        {/* Quantity Selector */}
                        <div className="flex flex-col sm:flex-row items-center gap-3 justify-center sm:justify-start">
                            <span className="text-gray-700 text-lg font-normal">Quantity :</span>
                            <div className="flex items-center gap-2">
                                <button
                                    className="w-9 h-9 rounded-lg bg-orange-400 text-white flex items-center justify-center hover:bg-[#E66D00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    onClick={() => handleUpdate(count - 1)}
                                >
                                    <BiMinus className="w-4 h-4" />
                                </button>
                                <span className="w-12 text-center">{count}</span>
                                <button
                                    className="w-9 h-9 rounded-lg bg-orange-400 text-white flex items-center justify-center hover:bg-[#E66D00] transition-colors"
                                    onClick={() => handleUpdate(count + 1)}
                                >
                                    <BiPlus className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Total Section */}
                    <div className="w-full mt-4 pt-4 border-t border-gray-200 sm:w-auto sm:mt-0 sm:pt-0 sm:border-none sm:ml-auto flex sm:flex-col justify-between sm:justify-center items-center sm:items-end flex-shrink-0 text-right">
                        <div className="text-sm text-gray-500 mb-2 hidden sm:block">Total</div>
                        <div className="text-sm text-gray-700 font-medium block sm:hidden">Total:</div>
                        <div className="text-2xl text-[#FF7A00] font-bold flex items-baseline gap-1">
                            {price * count}
                            <span className="text-sm text-gray-500 font-medium">EGP</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}