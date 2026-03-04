import Link from "next/link";
import { BiChevronRight } from "react-icons/bi";
import { ProductCard } from "@/features/Products/Components/ProductCard";
import type { ProductsTypes } from "@/features/Products/Types/AllProductsTypes";

interface BrandProductsGridProps {
  brandName: string;
  brandId: string;
  products: ProductsTypes[];
}

export default function BrandProductsGrid({
  brandName,
  brandId,
  products,
}: BrandProductsGridProps) {
  return (
    <section className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Breadcrumb */}
        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">
          <Link href="/" className="hover:text-orange-600 transition-colors">
            Home
          </Link>
          <BiChevronRight className="w-4 h-4 shrink-0" />
          <Link href="/brands" className="hover:text-orange-600 transition-colors">
            Brands
          </Link>
          <BiChevronRight className="w-4 h-4 shrink-0" />
          <span className="text-gray-700">{brandName}</span>
        </div>

        {/* Title */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">{brandName}</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            {products.length} {products.length === 1 ? "product" : "products"}
          </p>
        </div>

        {products.length === 0 ? (
          <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
            <p className="text-gray-500">No products found for this brand.</p>
            <Link
              href="/brands"
              className="mt-4 inline-block text-orange-600 hover:text-orange-700 font-medium"
            >
              Back to Brands
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} info={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
