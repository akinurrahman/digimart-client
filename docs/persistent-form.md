## Persistent Form Usage Guide

### Overview

The `usePersistentForm` hook extends the functionality of `useForm` by adding localStorage persistence. It automatically saves form data to localStorage and restores it on refresh.

### How to Use

To enable localStorage persistence in forms, simply replace:

```tsx
const form = useForm<FormValues>({...})
```

with:

```tsx
const form = usePersistentForm<FormValues>({
  storageKey: "your-storage-key", // Unique key for localStorage
  defaultValues: {...},
  ...otherOptions
});
```

Everything else remains the same. The `usePersistentForm` hook works exactly like `useForm`, meaning all methods (`register`, `handleSubmit`, `reset`, etc.) function as expected.

### Extra Requirement

The only additional parameter required is:

- `storageKey`: A unique key to store and retrieve form data from localStorage.

### Example Implementation

Refer to `/example/persistent-form.tsx` for a working example of how to implement `usePersistentForm`.

### Benefits

- **Automatic Data Persistence:** No need to manually handle localStorage.
- **Seamless Integration:** Uses the same API as `useForm`.
- **Enhanced User Experience:** Users won’t lose progress on page refresh.

By following this guide, any form can be made persistent in seconds with minimal changes.
