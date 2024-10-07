"use client";

import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "../ui/button";
import { MoveLeft, MoveRight } from "lucide-react";

interface EmblaCarouselProps {
  slides: string[];
}

export default function EmblaCarousel({ slides }: EmblaCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="embla mx-auto mt-10 max-w-full">
      <div className="mt-3 flex justify-between items-center">
        <Button
          type="button"
          onClick={scrollPrev}
          variant={"ghost"}
          className="rounded-full border-gray-200 border-2 h-10 w-10 p-2 flex items-center justify-center"
        >
          <MoveLeft color="black" className="h-5 w-5" />
        </Button>
        <div className="embla__viewport h-56 border" ref={emblaRef}>
          <div className="embla__container h-full">
            {slides.map((src, index) => (
              <div
                className="embla__slide flex items-center justify-center"
                key={index}
              >
                <img
                  src={src}
                  alt={`Slide ${index + 1}`}
                  className="h-full w-auto object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        <Button
          type="button"
          variant={"ghost"}
          onClick={scrollNext}
          className="rounded-full border-gray-200 border-2 h-10 w-10 p-2 flex items-center justify-center"
        >
          <MoveRight color="black" className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
