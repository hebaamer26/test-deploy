import Link from "next/link";
import { BiErrorCircle } from "react-icons/bi";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6">
      <div className="text-center w-full max-w-lg">
        {/* Animated Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-orange-100 rounded-full animate-ping opacity-75"></div>
            <div className="relative bg-orange-100 p-4 rounded-full">
              <BiErrorCircle className="w-16 h-16 text-orange-500" />
            </div>
          </div>
        </div>

        {/* 404 Text */}
        <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 drop-shadow-sm mb-4">
          404
        </h1>

        {/* Main Message */}
        <h2 className="text-3xl font-bold text-gray-800 mb-4 tracking-tight">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-lg text-gray-500 mb-8 leading-relaxed">
          Oops! The page you are looking for doesn't exist. It might have been moved or deleted.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="w-full sm:w-auto px-8 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-all duration-300 shadow-lg hover:shadow-orange-500/30 transform hover:-translate-y-0.5"
          >
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="w-full sm:w-auto px-8 py-3 bg-white text-gray-700 font-semibold rounded-lg border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-300"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
