'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BiMapPin, BiPhone } from 'react-icons/bi';
import { BsInstagram, BsTwitter } from 'react-icons/bs';
import { FaFacebook } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';
import CategoriesAction from '@/features/categories/server/CategoriesServer';
import type { categoriesTypes } from '@/features/categories/types/CategoriesTypes';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [categories, setCategories] = useState<categoriesTypes[]>([]);

  useEffect(() => {
    CategoriesAction()
      .then((res) => setCategories(res?.data ?? []))
      .catch(() => setCategories([]));
  }, []);

  return (
    <footer className="bg-zinc-900 text-gray-300 mt-16 border-t-4 border-[#FF7A00]">
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-8 text-center md:text-left">
          {/* Company Info - Takes 2 columns */}
          <div className="md:col-span-2 lg:col-span-2 space-y-6 flex flex-col items-center md:items-start">
            {/* Logo */}
            <div className="inline-block px-4 py-2 rounded-xl h-[50px] w-[170px] relative">
              <Link href="/" className="flex items-center absolute inset-0 justify-center">
                <div className="font-extrabold text-3xl tracking-tight">
                  <span className="text-white">Fresh</span>
                  <span className="text-[#FF7A00]">Cart</span>
                </div>
              </Link>
            </div>

            <p className="text-gray-400 leading-relaxed max-w-sm">
              FreshCart is your one-stop destination for quality products. From fresh groceries to daily essentials, we bring you the best brands at competitive prices with a seamless shopping experience.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a href="tel:+18001234567" className="flex items-center justify-center md:justify-start gap-3 text-gray-300 hover:text-[#FF7A00] transition-colors group">
                <BiPhone className="w-4 h-4 text-[#FF7A00]" />
                <span>+1 (800) 123-4567</span>
              </a>

              <a href="mailto:support@freshcart.com" className="flex items-center justify-center md:justify-start gap-3 text-gray-300 hover:text-[#FF7A00] transition-colors group">
                <IoMdMail className="w-4 h-4 text-[#FF7A00]" />
                <span>support@freshcart.com</span>
              </a>

              <div className="flex items-center justify-center md:justify-start gap-3 text-gray-300">
                <BiMapPin className="w-4 h-4 text-[#FF7A00] flex-shrink-0" />
                <span className="text-center md:text-left">123 Commerce Street, New York, NY 10001</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex gap-3 pt-2 justify-center md:justify-start">
              <a
                href="#"
                className="w-9 h-9 bg-[#2a2a2a] rounded-lg flex items-center justify-center hover:bg-[#FF7A00] text-gray-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-[#2a2a2a] rounded-lg flex items-center justify-center hover:bg-[#FF7A00] text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <BsTwitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-[#2a2a2a] rounded-lg flex items-center justify-center hover:bg-[#FF7A00] text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <BsInstagram className="w-4 h-4" />
              </a>

            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-white text-lg mb-4">Shop</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/allProducts" className="text-gray-400 hover:text-[#FF7A00] transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-gray-400 hover:text-[#FF7A00] transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/brands" className="text-gray-400 hover:text-[#FF7A00] transition-colors">
                  Brands
                </Link>
              </li>
              {categories.map((category) => (
                <li key={category._id}>
                  <Link
                    href={`/categories/${category._id}`}
                    className="text-gray-400 hover:text-[#FF7A00] transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account Links */}
          <div>
            <h3 className="text-white text-lg mb-4">Account</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/profile" className="text-gray-400 hover:text-[#FF7A00] transition-colors">
                  My Account
                </Link>
              </li>
              <li>
                <Link href="/orders" className="text-gray-400 hover:text-[#FF7A00] transition-colors">
                  Order History
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="text-gray-400 hover:text-[#FF7A00] transition-colors">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-gray-400 hover:text-[#FF7A00] transition-colors">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-gray-400 hover:text-[#FF7A00] transition-colors">
                  Sign In
                </Link>
              </li>
              <li>
                <Link href="/signup" className="text-gray-400 hover:text-[#FF7A00] transition-colors">
                  Create Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Legal Combined */}
          <div>
            <h3 className="text-white text-lg mb-4">Support</h3>
            <ul className="space-y-3 mb-6">
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-[#FF7A00] transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-[#FF7A00] transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-[#FF7A00] transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-[#FF7A00] transition-colors">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link href="/orders" className="text-gray-400 hover:text-[#FF7A00] transition-colors">
                  Track Order
                </Link>
              </li>
            </ul>

            <h3 className="text-white text-lg mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-gray-400 hover:text-[#FF7A00] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-[#FF7A00] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-[#FF7A00] transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 pb-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
            {/* Copyright */}
            <div className="text-sm text-gray-500">
              © {currentYear} FreshCart. All rights reserved.
            </div>

            {/* Payment Methods */}
            <div className="flex items-center gap-2">
              {/* Visa */}
              <div className="h-7 px-2.5 bg-white rounded flex items-center justify-center">
                <span className="text-blue-600 text-xs font-bold">VISA</span>
              </div>
              {/* Mastercard */}
              <div className="h-7 px-2.5 bg-white rounded flex items-center justify-center">
                <div className="flex">
                  <div className="w-3.5 h-3.5 rounded-full bg-red-500 -mr-1.5"></div>
                  <div className="w-3.5 h-3.5 rounded-full bg-orange-400"></div>
                </div>
              </div>
              {/* Amex */}
              <div className="h-7 px-2.5 bg-blue-400 rounded flex items-center justify-center">
                <span className="text-white text-[10px] font-bold">AMEX</span>
              </div>
              {/* PayPal */}
              <div className="h-7 px-2.5 bg-white rounded flex items-center justify-center">
                <span className="text-blue-600 text-xs font-bold">PayPal</span>
              </div>
              {/* Apple Pay */}
              <div className="h-7 px-2.5 bg-white rounded flex items-center justify-center">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}