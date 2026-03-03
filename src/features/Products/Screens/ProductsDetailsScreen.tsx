import ProductInfo from "../Components/ProductDetails/ProductInfo";
import { ProductDetailsServerAction } from "../Server/ProductsServerAction";

export default async function ProductsDetailsScreen({
  productId,
}: {
  productId: string;
}) {
  const response = await ProductDetailsServerAction({ id: productId });

  return (
    <>
      <ProductInfo product={response.data} />
    </>
  );
}