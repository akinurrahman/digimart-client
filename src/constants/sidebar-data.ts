import { LayoutDashboard, Package } from "lucide-react";

export const adminNavItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    url: "",
    icon: Package,
    items: [
      { title: "Add Product", url: "/products/add/basic-info" },
      { title: "Categories", url: "/products/categories" },
    ],
  },
];

// Navigation data for user
export const userNavItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
];
