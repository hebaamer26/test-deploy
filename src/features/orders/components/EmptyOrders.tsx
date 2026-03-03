"use client"
import Link from 'next/link';
import { BiShoppingBag } from 'react-icons/bi';

export default function EmptyOrders() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mb-6">
                <BiShoppingBag className="w-12 h-12 text-orange-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
                No orders found
            </h2>
            <p className="text-gray-500 mb-8 max-w-md text-center">
                You haven&apos;t placed any orders yet. Start exploring our products and find something you&apos;ll love!
            </p>
            <Link
                href="/allProducts"
                className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors shadow-md hover:shadow-lg"
            >
                Start Shopping
            </Link>
        </div>
    );
}
