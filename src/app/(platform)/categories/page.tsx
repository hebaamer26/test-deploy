import CategoriesGrid from "@/features/categories/components/CategoriesGrid";
import CategoriesAction from "@/features/categories/server/CategoriesServer";
import type { categoriesTypes } from "@/features/categories/types/CategoriesTypes";

export default async function CategoriesPage() {
  let categories: categoriesTypes[] = [];
  try {
    const response = await CategoriesAction();
    categories = response?.data ?? [];
  } catch {
    categories = [];
  }

  return <CategoriesGrid categories={categories} />;
}
