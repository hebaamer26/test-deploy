'use client'

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function Slider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <section className="relative w-full h-[50vh] sm:h-[60vh] lg:h-[70vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        {/* Next.js Image for Hero Background */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/images/hero.jpg"
            alt="Fresh Groceries Delivered"
            fill
            priority
            className={`object-cover object-center transition-all duration-[2000ms] ease-out bg-gray-100 ${isMounted ? "scale-100 blur-none opacity-100" : "scale-105 blur-sm opacity-50"
              }`}
          />
        </div>

        {/* Gradient Overlay for superior text readability across all devices */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-10" />

        {/* Content Container */}
        <div className="container relative mx-auto px-6 sm:px-8 lg:px-12 z-20 h-full flex items-center">
          <div className="max-w-xl sm:max-w-2xl lg:max-w-3xl transform transition-all duration-[1200ms] delay-300">
            {/* Animated Heading */}
            <h1
              className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-[1.2] drop-shadow-xl transition-all duration-[1000ms] ease-out ${isMounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
            >
              Fresh Products <br className="hidden sm:block" />
              <span className="text-orange-400">Delivered to</span> Your Door
            </h1>

            {/* Animated Subtext */}
            <p
              className={`text-base sm:text-lg md:text-xl text-gray-200 mb-8 drop-shadow-lg max-w-md sm:max-w-lg transition-all duration-[1000ms] delay-500 ease-out ${isMounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
            >
              Daily delivery of everything you need. Farm-fresh, organic, and locally sourced groceries.
            </p>

            {/* Application Buttons */}
            <div
              className={`flex flex-col sm:flex-row flex-wrap gap-4 transition-all duration-[1000ms] delay-700 ease-out ${isMounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
            >
              <Link href={"/allProducts"}>
                <button className="w-full sm:w-auto px-6 py-3 rounded-full bg-orange-500 text-white font-bold text-base hover:bg-orange-600 transition-all duration-300 shadow-xl hover:shadow-orange-500/40 hover:-translate-y-1">
                  Shop Now
                </button>
              </Link>

              <Link href={"/allProducts"}>
                <button className="w-full sm:w-auto px-6 py-3 rounded-full border-2 border-white text-white font-bold text-base hover:bg-white hover:text-orange-500 transition-all duration-300 shadow-xl hover:-translate-y-1 backdrop-blur-sm">
                  Explore More
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
