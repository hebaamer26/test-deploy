import Image from 'next/image'
import Link from 'next/link';
import { BsArrowRight } from 'react-icons/bs';
import CategoriesAction from '@/features/categories/server/CategoriesServer';



export default async function AllCategories() {


  const response = await CategoriesAction()


  return (
    <>
      {/* Categories */}
      <section id="categories" className="py-6 sm:py-10 bg-zinc-100 px-4 sm:px-6 lg:px-8">
        <div className="max-w-9xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-1.5 bg-linear-to-b from-orange-500 to-orange-700 rounded-full"></div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
                Shop By <span className="text-orange-400">Category</span>
              </h2>
            </div>
            <Link
              href={'categories'}
              className="text-gray-500 hover:text-gray-700 duration-200 transition font-medium flex items-center cursor-pointer text-sm sm:text-base"
            >
              View All Categories
              <BsArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>


          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 ">
            {response?.data.map((category) => (
              <Link
                href={`/categories/${category._id}`}
                key={category._id}
                className="bg-white rounded-lg p-3 sm:p-4 lg:p-5 text-center shadow-sm hover:shadow-lg transition group cursor-pointer"
              >
                <div className="h-16 w-16 sm:h-20 sm:w-20 overflow-hidden bg-primary-100 rounded-full flex items-center justify-center mx-auto ">
                  <Image
                    width={300}
                    height={300}
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-contain rounded-full"
                  />
                </div>
                <h3 className="mt-2 sm:mt-3 font-semibold text-xs sm:text-sm text-gray-600 ">{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>


    </>
  )
}