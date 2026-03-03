import BrandsGrid from "@/features/brands/components/BrandsGrid";
import BrandsServerAction from "@/features/brands/server/BrandsServer";
import type { BrandType } from "@/features/brands/types/BrandsTypes";

export default async function BrandsPage() {
  let brands: BrandType[] = [];
  try {
    const response = await BrandsServerAction();
    brands = response?.data ?? [];
  } catch {
    brands = [];
  }

  return <BrandsGrid brands={brands} />;
}
