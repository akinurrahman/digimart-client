import useFormPersist from "react-hook-form-persist";
import { UseFormReturn, FieldValues } from "react-hook-form";

export const usePersistedForm = <T extends FieldValues>(
  form: UseFormReturn<T>,
  storageKey: string
) => {
  useFormPersist(storageKey, {
    watch: form.watch,
    setValue: form.setValue,
    storage: window.localStorage,
  });
};
