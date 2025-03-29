import { LayoutDashboard, Package } from "lucide-react";

export const adminNavItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    url: "/products",
    icon: Package,
    items: [
      { title: "Products", url: "/products" },
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
