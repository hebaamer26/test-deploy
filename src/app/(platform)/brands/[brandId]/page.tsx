import BrandProductsGrid from "@/features/brands/components/BrandProductsGrid";
import BrandsServerAction from "@/features/brands/server/BrandsServer";
import { ProductsByBrandServerAction } from "@/features/Products/Server/ProductsServerAction";

interface BrandProductsPageProps {
  params: Promise<{ brandId: string }>;
}

export default async function BrandProductsPage({ params }: BrandProductsPageProps) {
  const { brandId } = await params;

  const [productsRes, brandsRes] = await Promise.all([
    ProductsByBrandServerAction(brandId),
    BrandsServerAction(),
  ]);

  const products = productsRes?.data ?? [];
  const brandName =
    products[0]?.brand?.name ??
    brandsRes?.data?.find((b) => b._id === brandId)?.name ??
    "Brand";

  return (
    <BrandProductsGrid
      brandName={brandName}
      brandId={brandId}
      products={products}
    />
  );
}
