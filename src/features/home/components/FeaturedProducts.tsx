import { ProductCard } from "@/features/Products/Components/ProductCard"
import AllProductsServerAction from "@/features/Products/Server/ProductsServerAction"
export default  async function featuredProducts() {
    const response = await AllProductsServerAction()
  return (
    <>
    
     <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-3 lg:px-8 ">
      <div className="max-w-9xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 my-8 mb-13">
              <div className="h-8 w-1.5 bg-linear-to-b from-orange-500 to-orange-700 rounded-full "></div>
              <h2 className="text-3xl font-bold text-gray-800 ">Featured <span className="text-orange-400">Products</span></h2>
            </div>
        {/* Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
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

