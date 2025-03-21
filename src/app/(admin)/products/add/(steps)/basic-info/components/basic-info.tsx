"use client";
import { FormProvider, UseFormReturn } from "react-hook-form";
import { FormInput } from "@/components/form-input";
import { BasicProductType } from "@/validators/product/add-product-basic-info";

interface BasicInfoFormProps {
  form: UseFormReturn<BasicProductType>;
  categories: { label: string; value: string }[];
  subCategories: { label: string; value: string }[];
}

const BasicInfoForm = (props: BasicInfoFormProps) => {
  const { form, categories, subCategories } = props;
  return (
    <FormProvider {...form}>
      <form className="space-y-5">
        <h2 className="text-2xl font-semibold">Basic Information</h2>
        <p className="text-muted-foreground">Enter product details</p>

        <FormInput
          name="product_name"
          fieldType="input"
          placeholder="Enter product name"
          label="Product Name"
          required
        />
        <FormInput
          name="product_description"
          fieldType="textarea"
          label="Description"
          rows={5}
          description="Provide a detailed description of your product. Include key features, materials, and any other relevant information."
          placeholder="Enter product description"
          required
        />

        <div className="mt-5 grid gap-6 sm:grid-cols-2">
          <FormInput
            name="category"
            fieldType="select"
            label="Select Category"
            placeholder="Select Category"
            options={categories}
            required
          />
          <FormInput
            name="sub_category"
            fieldType="select"
            label="Select Sub Category"
            placeholder="Select Sub Category"
            options={subCategories}
            disabled={!form.watch("category")}
            required
          />
        </div>
      </form>
    </FormProvider>
  );
};

export default BasicInfoForm;
