import Image from "next/image";
import Link from "next/link";
import { BiChevronRight, BiStore } from "react-icons/bi";
import type { BrandType } from "../types/BrandsTypes";

interface BrandsGridProps {
  brands: BrandType[];
}

function BrandCard({ brand }: { brand: BrandType }) {
  return (
    <Link
      href={`/brands/${brand._id}`}
      className="group flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-4 sm:p-6 shadow-sm transition-all duration-300 hover:border-orange-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
    >
      <div className="relative mb-3 sm:mb-4 h-16 w-16 sm:h-24 sm:w-24 overflow-hidden rounded-full bg-gray-50 transition-transform duration-300 group-hover:scale-105">
        <Image
          src={brand.image}
          alt={brand.name}
          width={96}
          height={96}
          quality={90}
          className="h-full w-full object-contain p-2"
        />
      </div>
      <h3 className="text-center text-xs sm:text-sm font-semibold text-gray-800 transition-colors group-hover:text-orange-600">
        {brand.name}
      </h3>
    </Link>
  );
}

export default function BrandsGrid({ brands }: BrandsGridProps) {
  return (
    <section className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Breadcrumb */}
        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">
          <Link href="/" className="hover:text-orange-600 transition-colors">
            Home
          </Link>
          <BiChevronRight className="w-4 h-4 shrink-0" />
          <span className="text-gray-700">Brands</span>
        </div>

        {/* Title */}
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-400 rounded-xl flex items-center justify-center shrink-0">
            <BiStore className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">Brands</h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">Shop by your favorite brands</p>
          </div>
        </div>

        {brands.length === 0 ? (
          <div className="rounded-2xl bg-white p-8 sm:p-12 text-center shadow-sm">
            <p className="text-gray-500">No brands available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-6">
            {brands.map((brand) => (
              <BrandCard key={brand._id} brand={brand} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
