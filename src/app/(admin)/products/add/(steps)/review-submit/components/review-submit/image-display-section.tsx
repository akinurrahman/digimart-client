import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ImagesAndSizesType } from "@/validators/product/add-product-basic-info";
import Image from "next/image";
import React from "react";

interface ImagesProps {
  productImages: ImagesAndSizesType["productImages"];
}

const ImageDisplaySection = ({ productImages }: ImagesProps) => {
  return (
    <div className="max-w-sm space-y-4">
      <div className="relative aspect-square overflow-hidden rounded-md border">
        <Image
          src={productImages[0].thumbnail}
          alt={productImages[0].url}
          fill
          className="object-cover"
        />
      </div>
      <Carousel className="w-full">
        <CarouselContent>
          {productImages.map((image) => (
            <CarouselItem key={image.url} className="basis-auto">
              <div className="relative h-16 w-16 overflow-hidden rounded-md border">
                <Image
                  src={image.thumbnail}
                  alt={image.url}
                  fill
                  className="object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default ImageDisplaySection;
