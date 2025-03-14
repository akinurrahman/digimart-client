import { AutoBreadcrumb } from "@/components/layout/auto-breadcrump";
import CategoryManagement from "./components/category-management";

export default function Categories() {
  return (
    <main className="container mx-auto px-4">
      <AutoBreadcrumb />
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Category Management</h1>
        <p className="text-muted-foreground">
          Create and manage your categories and subcategories
        </p>
      </div>
      <CategoryManagement />
    </main>
  );
}
