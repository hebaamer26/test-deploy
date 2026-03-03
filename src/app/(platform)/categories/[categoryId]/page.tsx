import CategoryProductsGrid from "@/features/categories/components/CategoryProductsGrid";
import CategoriesAction from "@/features/categories/server/CategoriesServer";
import { ProductsByCategoryServerAction } from "@/features/Products/Server/ProductsServerAction";

interface CategoryProductsPageProps {
  params: Promise<{ categoryId: string }>;
}

export default async function CategoryProductsPage({ params }: CategoryProductsPageProps) {
  const { categoryId } = await params;

  const [productsRes, categoriesRes] = await Promise.all([
    ProductsByCategoryServerAction(categoryId),
    CategoriesAction(),
  ]);

  const products = productsRes?.data ?? [];
  const categoryName =
    products[0]?.category?.name ??
    categoriesRes?.data?.find((c) => c._id === categoryId)?.name ??
    "Category";

  return (
    <CategoryProductsGrid
      categoryName={categoryName}
      categoryId={categoryId}
      products={products}
    />
  );
}
