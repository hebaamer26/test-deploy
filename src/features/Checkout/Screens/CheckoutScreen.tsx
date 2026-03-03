"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BiChevronRight, BiCreditCard, BiMapPin, BiPhone, BiLock, BiLockAlt, BiLockOpen, BiErrorCircle } from "react-icons/bi";
import { LuBanknote } from "react-icons/lu";
import { toast } from "react-toastify";

import { checkoutFormSchema, CheckoutFormTypes } from "../Schema/CheckoutSchema";
import { useAppSelector, useAppDispatch } from "@/store/Hooks";
import { createCashOrder, createOnlineOrder } from "../Server/CheckoutServerAction";
import { clearCart } from "@/features/cart/store/CartSlice";
import { BsTruck } from "react-icons/bs";

export default function CheckoutScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { cartId, numOfCartItems, products, totalCartPrice } = useAppSelector(
    (state) => state.Cart
  );

  const [paymentMethod, setPaymentMethod] = useState<"cash" | "card">("cash");
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express' | 'overnight'>('standard');
  const [sameAsShipping, setSameAsShipping] = useState(true);

  //handle subtotal and shipping
  const subtotal = products.reduce((sum, item) => sum + item.price * item.product.quantity, 0);
  const shippingCosts = {
    standard: 0,
    express: 15.99,
    overnight: 29.99,
  };
  const shipping = shippingCosts[shippingMethod];
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CheckoutFormTypes>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      details: "",
      phone: "",
      city: "",
      paymentMethod: "cash",
    },
  });

  /* ---------------- Submit ---------------- */
  const onSubmit: SubmitHandler<CheckoutFormTypes> = async (values) => {
    try {
      if (!cartId) return;

      if (values.paymentMethod === "cash") {
        const response = await createCashOrder({
          cartId,
          shippingAddress: {
            details: values.details,
            phone: values.phone,
            city: values.city,
            paymentMethod: "cash",
          },
        });

        if (response.status === "success") {
          dispatch(clearCart());
          toast.success("Order created successfully");
          reset();
          router.push("/orders");
        }
      } else {
        const response = await createOnlineOrder({
          cartId,
          shippingAddress: {
            details: values.details,
            phone: values.phone,
            city: values.city,
            paymentMethod: "card",
            cardNumber: values.cardNumber,
            expiryDate: values.expiryDate,
            cvc: values.cvc,
            cardHolder: values.cardHolder,
          },
          url: location.origin,
        });

        if (response.status === "success") {
          toast.loading("Redirecting to payment...");
          setTimeout(() => {
            location.href = response.session.url;
          }, 2000);
        }
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-8">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/">Cart</Link>
          <BiChevronRight />
          <span className="text-gray-700">Checkout</span>
        </div>
        {/* Page Title */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-[#FF7A00] rounded-xl flex items-center justify-center">
            <BiLockOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-4xl">Secure Checkout</h1>
            <p className="text-gray-600 text-sm">Your information is safe and secure</p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#FF7A00] rounded-full flex items-center justify-center text-white">
                1
              </div>
              <span className="text-[#FF7A00]">Shipping</span>
            </div>
            <div className="w-16 h-0.5 bg-[#FF7A00]" />
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#FF7A00] rounded-full flex items-center justify-center text-white">
                2
              </div>
              <span className="text-[#FF7A00]">Payment</span>
            </div>
            <div className="w-16 h-0.5 bg-gray-300" />
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white">
                3
              </div>
              <span className="text-gray-600">Review</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid lg:grid-cols-3 gap-8 container">

          {/* Hidden Payment Method */}
          <input type="hidden" value={paymentMethod} {...register("paymentMethod")} />

          {/* ---------------- Left Side ---------------- */}
          <div className="lg:col-span-2 space-y-6">

            {/* Shipping Information */}
            <div className="bg-white border border-gray-200 p-6 sm:p-8 rounded-2xl shadow-sm space-y-6">
              <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                <BiMapPin className="text-[#FF7A00] w-6 h-6" />
                <h2 className="text-2xl font-semibold text-gray-800">Shipping Information</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
                  <input
                    {...register("details")}
                    className={`w-full border p-3.5 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#FF7A00] focus:border-transparent outline-none transition-all ${errors.details ? "border-red-500 ring-1 ring-red-500" : "border-gray-200"
                      }`}
                    placeholder="123 Main St, Apartment 4B"
                  />
                  {errors.details && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><BiErrorCircle className="inline" /> {errors.details.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                  <input
                    {...register("phone")}
                    className={`w-full border p-3.5 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#FF7A00] focus:border-transparent outline-none transition-all ${errors.phone ? "border-red-500 ring-1 ring-red-500" : "border-gray-200"
                      }`}
                    placeholder="01xxxxxxxxx"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                  <input
                    {...register("city")}
                    className={`w-full border p-3.5 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#FF7A00] focus:border-transparent outline-none transition-all ${errors.city ? "border-red-500 ring-1 ring-red-500" : "border-gray-200"
                      }`}
                    placeholder="Cairo"
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Shipping Method */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-6">
                <BsTruck className="w-6 h-6 text-[#FF7A00]" />
                <h2 className="text-2xl font-semibold text-gray-800">Shipping Method</h2>
              </div>

              <div className="space-y-4">
                <label
                  className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all ${shippingMethod === 'standard'
                    ? 'border-[#FF7A00] bg-orange-50/50 shadow-sm'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                >
                  <div className="flex items-center gap-4">
                    <input
                      type="radio"
                      name="shipping"
                      value="standard"
                      checked={shippingMethod === 'standard'}
                      onChange={() => setShippingMethod('standard')}
                      className="w-5 h-5 text-[#FF7A00] accent-[#FF7A00] cursor-pointer"
                    />
                    <div>
                      <div className="font-semibold text-gray-900">Standard Shipping</div>
                      <div className="text-sm text-gray-500">5-7 business days</div>
                    </div>
                  </div>
                  <span className="text-[#FF7A00] font-bold">FREE</span>
                </label>

                <label
                  className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all ${shippingMethod === 'express'
                    ? 'border-[#FF7A00] bg-orange-50/50 shadow-sm'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                >
                  <div className="flex items-center gap-4">
                    <input
                      type="radio"
                      name="shipping"
                      value="express"
                      checked={shippingMethod === 'express'}
                      onChange={() => setShippingMethod('express')}
                      className="w-5 h-5 text-[#FF7A00] accent-[#FF7A00] cursor-pointer"
                    />
                    <div>
                      <div className="font-semibold text-gray-900">Express Shipping</div>
                      <div className="text-sm text-gray-500">2-3 business days</div>
                    </div>
                  </div>
                  <span className="text-gray-900 font-semibold">$15.99</span>
                </label>

                <label
                  className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all ${shippingMethod === 'overnight'
                    ? 'border-[#FF7A00] bg-orange-50/50 shadow-sm'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                >
                  <div className="flex items-center gap-4">
                    <input
                      type="radio"
                      name="shipping"
                      value="overnight"
                      checked={shippingMethod === 'overnight'}
                      onChange={() => setShippingMethod('overnight')}
                      className="w-5 h-5 text-[#FF7A00] accent-[#FF7A00] cursor-pointer"
                    />
                    <div>
                      <div className="font-semibold text-gray-900">Overnight Shipping</div>
                      <div className="text-sm text-gray-500">Next business day</div>
                    </div>
                  </div>
                  <span className="text-gray-900 font-semibold">$29.99</span>
                </label>
              </div>
            </div>

            {/* Payment Method Section */}
            <div className="bg-white border border-gray-200 p-6 sm:p-8 rounded-2xl shadow-sm space-y-6">
              <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                <BiCreditCard className="text-[#FF7A00] w-6 h-6" />
                <h2 className="text-2xl font-semibold text-gray-800">Payment Method</h2>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`p-4 border-2 rounded-xl flex items-center justify-center gap-2 font-semibold transition-all ${paymentMethod === "card" ? "border-[#FF7A00] bg-orange-50/50 text-[#FF7A00] shadow-sm" : "border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                >
                  <BiCreditCard className="w-5 h-5" /> Visa / Mastercard
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("cash")}
                  className={`p-4 border-2 rounded-xl flex items-center justify-center gap-2 font-semibold transition-all ${paymentMethod === "cash" ? "border-[#FF7A00] bg-orange-50/50 text-[#FF7A00] shadow-sm" : "border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                >
                  <LuBanknote className="w-5 h-5" /> Cash on Delivery
                </button>
              </div>

              {/* Card Details Overlay */}
              {paymentMethod === "card" && (
                <div className="mt-6 p-6 border border-gray-100 bg-gray-50 rounded-xl space-y-5 animate-in fade-in slide-in-from-top-4 duration-300">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Card Number *</label>
                    <div className="relative">
                      <input
                        {...register("cardNumber")}
                        className={`w-full border p-3.5 pl-10 rounded-xl bg-white focus:ring-2 focus:ring-[#FF7A00] outline-none transition-all ${errors.cardNumber ? "border-red-500 ring-1 ring-red-500" : "border-gray-200"
                          }`}
                        placeholder="0000 0000 0000 0000"
                        maxLength={19}
                      />
                      <BiCreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    </div>
                    {errors.cardNumber && (
                      <p className="text-red-500 text-sm mt-1">{errors.cardNumber.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name *</label>
                    <input
                      {...register("cardHolder")}
                      className={`w-full border p-3.5 rounded-xl bg-white focus:ring-2 focus:ring-[#FF7A00] outline-none transition-all ${errors.cardHolder ? "border-red-500 ring-1 ring-red-500" : "border-gray-200"
                        }`}
                      placeholder="JOHN DOE"
                    />
                    {errors.cardHolder && (
                      <p className="text-red-500 text-sm mt-1">{errors.cardHolder.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date *</label>
                      <input
                        {...register("expiryDate")}
                        className={`w-full border p-3.5 rounded-xl bg-white focus:ring-2 focus:ring-[#FF7A00] outline-none transition-all ${errors.expiryDate ? "border-red-500 ring-1 ring-red-500" : "border-gray-200"
                          }`}
                        placeholder="MM/YY"
                        maxLength={5}
                      />
                      {errors.expiryDate && (
                        <p className="text-red-500 text-sm mt-1">{errors.expiryDate.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">CVC *</label>
                      <div className="relative">
                        <input
                          {...register("cvc")}
                          type="password"
                          className={`w-full border p-3.5 pr-10 rounded-xl bg-white focus:ring-2 focus:ring-[#FF7A00] outline-none transition-all ${errors.cvc ? "border-red-500 ring-1 ring-red-500" : "border-gray-200"
                            }`}
                          placeholder="123"
                          maxLength={4}
                        />
                        <BiLock className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      </div>
                      {errors.cvc && (
                        <p className="text-red-500 text-sm mt-1">{errors.cvc.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ---------------- Right Side ---------------- */}
          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[#FAFAFA] rounded-2xl p-8 sticky top-6">
              <h2 className="text-2xl mb-6">Order Summary</h2>

              {/* Cart Items */}
              <div className="mb-6 pb-6 border-b border-gray-300">
                <div className="max-h-56 overflow-y-auto space-y-4">
                  {products.map((item) => (
                    <div key={cartId} className="flex gap-4">
                      <img
                        src={item.product.imageCover}
                        alt={item.product.title}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm mb-1 line-clamp-2">{item.product.title}</h3>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-600">Qty: {item.product.quantity}</span>
                          <span className="text-[#FF7A00]">${item.price.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-[#FF7A00]">
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center pt-6 border-t border-gray-300 mb-6">
                <span className="text-xl">Total</span>
                <span className="text-3xl text-[#FF7A00]">
                  ${total.toFixed(2)}
                </span>
              </div>

              {/* Place Order Button */}
              <button
                type="submit"
                className="w-full bg-[#FF7A00] hover:bg-[#E66D00] text-white py-4 rounded-xl text-lg transition-colors flex items-center justify-center gap-2"
              >
                <BiLockAlt className="w-5 h-5" />
                Place Order
              </button>

              <p className="text-xs text-center text-gray-600 mt-4">
                Your payment information is encrypted and secure
              </p>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}