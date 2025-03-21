import { FormInput } from "@/components/form-input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ImagesAndSizesType } from "@/validators/product/add-product-basic-info";
import { DevTool } from "@hookform/devtools";
import React from "react";
import { Controller, FormProvider, UseFormReturn } from "react-hook-form";

interface ImagesAndSizesProps {
  form: UseFormReturn<ImagesAndSizesType>;
  availableSizes: ImagesAndSizesType["sizes"];
}

const ImagesAndSizesForm = (props: ImagesAndSizesProps) => {
  const { form, availableSizes } = props;
  return (
    <FormProvider {...form}>
      <form className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold">Images & Sizes</h2>
          <p className="text-muted-foreground">
            Upload product images and select available sizes
          </p>
        </div>

        <div className="grid gap-6">
          {/* Product Images Upload */}
          <FormInput
            name="productImages"
            fieldType="file"
            variant="v1"
            FileDescription="You can upload up to 8 images. First image will be used as the product thumbnail."
            multiple
          />

          {/* Available Sizes Selection */}
          <div className="grid gap-3 pt-4">
            <Label>Available Sizes</Label>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
              {availableSizes.map((size) => (
                <Controller
                  key={size}
                  name="sizes"
                  control={form.control}
                  render={({ field: { value, onChange } }) => (
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`size-${size}`}
                        checked={value?.includes(size) || false}
                        onCheckedChange={(checked) =>
                          onChange(
                            checked
                              ? [...(value || []), size]
                              : (value || []).filter((s) => s !== size)
                          )
                        }
                      />
                      <Label
                        htmlFor={`size-${size}`}
                        className="cursor-pointer"
                      >
                        {size}
                      </Label>
                    </div>
                  )}
                />
              ))}
            </div>
            {form.formState.errors.sizes && (
              <p className="text-sm text-red-500">
                {form.formState.errors.sizes.message}
              </p>
            )}
          </div>
        </div>
      </form>

      {/* DevTool for Debugging */}
      <DevTool control={form.control} />
    </FormProvider>
  );
};

export default ImagesAndSizesForm;
