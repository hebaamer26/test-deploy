import { ProductCard } from "@/features/Products/Components/ProductCard"
import AllProductsServerAction from "@/features/Products/Server/ProductsServerAction"
import { BiChevronRight, BiPackage } from "react-icons/bi"
import { BsChevronRight } from "react-icons/bs"
export default async function AllProducts() {
  const response = await AllProductsServerAction()
  return (
    <>

      <div className="min-h-screen bg-white py-6 sm:py-8 px-4 sm:px-6 lg:px-2 mx-auto">
        <div className="container mx-auto ">
          {/* Header with Orange Gradient */}
          <header className=" text-white w-full">
            {/* Breadcrumbs */}
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">
              <a href="/" className="hover:text-[#FF7A00] transition-colors">
                Home
              </a>
              <BiChevronRight className="w-4 h-4 shrink-0" />
              <span className="text-gray-700">All Products</span>
            </div>

            {/* Title */}
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#FF7A00] rounded-xl flex items-center justify-center shrink-0">
                <BiPackage className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl text-gray-700">All Products</h1>
            </div>
          </header>
          {/* Products */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-5  ">
            {response.data.map((product) => (
              <ProductCard
                key={product.id}
                info={product}

              />
            ))}
          </div>

        </div>
      </div>

    </>
  )
}

