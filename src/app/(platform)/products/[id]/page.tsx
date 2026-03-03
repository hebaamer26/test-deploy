import ProductsDetailsScreen from "@/features/Products/Screens/ProductsDetailsScreen";

type ProductDetailsProps={
  params: Promise<{id:string}>
}

export default async function productDetails({params}:ProductDetailsProps) {
  const {id}=await params
  return (
    <>
      <ProductsDetailsScreen productId={id}/>
    </>
  )
}
