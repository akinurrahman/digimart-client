import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import React from "react";
import { useReviewSubmitContext } from "../../context";

const ImageDisplaySection = () => {
  const { imagesAndSizes } = useReviewSubmitContext();

  if (!imagesAndSizes?.productImages.length) {
    return null;
  }

  return (
    <div className="max-w-sm space-y-4">
      <div className="relative aspect-square overflow-hidden rounded-md border">
        <Image
          src={imagesAndSizes.productImages[0].thumbnail}
          alt={imagesAndSizes.productImages[0].url}
          fill
          className="object-cover"
        />
      </div>
      <Carousel className="w-full">
        <CarouselContent>
          {imagesAndSizes.productImages.map((image) => (
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
