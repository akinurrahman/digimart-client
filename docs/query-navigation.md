# `useQueryNavigation` Hook

A **custom Next.js hook** to manage query parameters and handle **navigation without losing query params**.

## 📌 Features

✅ **Update query parameters** without page reload.  
✅ **Remove query parameters** dynamically.  
✅ **Redirect to a new path** while preserving existing query parameters.  
✅ **Prevents unnecessary updates** for efficiency.

---

## 🛠️ Installation

Simply copy and paste the `useQueryNavigation` hook into your **Next.js App Router project**.

---

## 🐜 Usage

### **Import the Hook**

```tsx
import { useQueryNavigation } from "@/hooks/useQueryNavigation";
```

### **Access the `updateQuery` Function**

```tsx
const { updateQuery } = useQueryNavigation();
```

---

## 📚 API Reference

### **`updateQuery(options: QueryOptions)`**

Updates query parameters, removes existing ones, or redirects.

#### **Parameters:**

| Name           | Type                   | Default     | Description                                       |
| -------------- | ---------------------- | ----------- | ------------------------------------------------- | --------------------------------------------------------- |
| `params`       | `Record<string, string | undefined>` | `{}`                                              | Key-value pairs of query parameters to set.               |
| `removeParams` | `string                | string[]`   | `[]`                                              | Query params to **remove** (can be a string or an array). |
| `redirectPath` | `string`               | `undefined` | Path to redirect **without losing query params**. |

#### **Returns:**

An object containing:

- `updateQuery`: Function to modify query parameters and/or navigate.

---

## 🏗️ Examples

### **1️⃣ Add or Update Query Params**

```tsx
updateQuery({ params: { category: "webdev", page: "2" } });
```

🔹 `/blog` → `/blog?category=webdev&page=2`

---

### **2️⃣ Redirect Without Losing Query Params**

```tsx
updateQuery({ redirectPath: "/dashboard" });
```

🔹 `/blog?category=webdev&page=2` → `/dashboard?category=webdev&page=2`

---

### **3️⃣ Set Query Params & Redirect Together**

```tsx
updateQuery({ params: { sort: "asc" }, redirectPath: "/dashboard" });
```

🔹 `/blog?category=webdev&page=2` → `/dashboard?category=webdev&page=2&sort=asc`

---

### **4️⃣ Remove a Single Query Param**

```tsx
updateQuery({ removeParams: "page" });
```

🔹 `/blog?category=webdev&page=2` → `/blog?category=webdev`

---

### **5️⃣ Remove Multiple Query Params**

```tsx
updateQuery({ removeParams: ["page", "sort"] });
```

🔹 `/blog?category=webdev&page=2&sort=asc` → `/blog?category=webdev`

---

## 🛠️ Full Hook Code

```tsx
"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";

export function useQueryNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateQuery = ({
    params = {},
    removeParams = [],
    redirectPath,
  }: {
    params?: Record<string, string | undefined>;
    removeParams?: string | string[];
    redirectPath?: string;
  }) => {
    const currentParams = new URLSearchParams(searchParams.toString());

    // Ensure removeParams is an array
    const removeList = Array.isArray(removeParams)
      ? removeParams
      : [removeParams];

    // Add or update query parameters
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        currentParams.set(key, value);
      }
    });

    // Remove specified query parameters
    removeList.forEach((param) => currentParams.delete(param));

    // Construct new URL
    const newUrl = `${redirectPath ?? pathname}?${currentParams.toString()}`;

    // Prevent unnecessary updates
    if (newUrl !== `${pathname}?${searchParams.toString()}`) {
      router.push(newUrl);
    }
  };

  return { updateQuery };
}
```

---

## 🔥 Why Use This Hook?

✅ **Optimized for Next.js App Router**  
✅ **Prevents redundant updates**  
✅ **Handles query updates & navigation seamlessly**  
✅ **Works with both single and multiple query params**

💡 Now you can **easily modify query params** and **redirect without losing them** in your Next.js projects! 🚀
