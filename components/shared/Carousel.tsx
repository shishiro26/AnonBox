"use client";

import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "../ui/button";

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
    <div className="embla mx-auto mt-12 max-w-lg">
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

      <div className="mt-3 flex justify-between">
        <Button type="button" onClick={scrollPrev}>
          Prev
        </Button>
        <Button type="button" onClick={scrollNext}>
          Next
        </Button>
      </div>
    </div>
  );
}
