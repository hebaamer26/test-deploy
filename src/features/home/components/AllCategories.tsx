import Image from 'next/image'
import Link from 'next/link';
import { BsArrowRight } from 'react-icons/bs';
import CategoriesAction from '@/features/categories/server/CategoriesServer';



export default async function AllCategories() {


    const response= await CategoriesAction()


  return (
    <>
     {/* Categories */}
      <section id="categories" className="py-10 bg-zinc-100 px-4 sm:px-6 lg:px-8">
        <div  className="max-w-9xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3 my-8">
              <div className="h-8 w-1.5 bg-linear-to-b from-orange-500 to-orange-700 rounded-full"></div>
              <h2 className="text-3xl font-bold text-gray-800">
                Shop By <span className="text-orange-400">Category</span>
              </h2>
            </div>
            <Link
              href={'categories'}
              className="text-gray-500 hover:text-gray-700 duration-200 transition font-medium flex items-center cursor-pointer"
            >
              View All Categories
              <BsArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>


          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 ">
            {response?.data.map((category) => (
              <Link
                href={`/categories/${category._id}`}
                key={category._id}
                className="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-lg transition group cursor-pointer rounded-lg"
            >
          <div className="h-20 w-20 overflow-hidden  bg-primary-100 rounded-full flex items-center justify-center mx-auto ">
            <Image
              width={300}
              height={300}
              src={category.image}
              alt={category.name}
              className="w-full h-full object-contain rounded-full"
            />
          </div>
          <h3 className="mt-2 font-semibold text-sm text-gray-600 ">{category.name}</h3>
        </Link>
        ))}
      </div>
        </div>
    </section>

    
    </>
  )
}