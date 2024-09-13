import React from "react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";

type TestimonialCarouselProps = {
  testimonials: {
    name: string;
    image: string;
    designation: string;
    testimonial: string;
  }[];
};

const TestimonialCarousel = ({ testimonials }: TestimonialCarouselProps) => {
  const _testimonials = [...testimonials, ...testimonials];
  return (
    <div>
      <Carousel
        opts={{ loop: true }}
        plugins={[Autoplay({ delay: 5000 })]}
        itemsCount={_testimonials.length}
        className="w-screen max-w-screen-2xl overflow-hidden left-1/2 -translate-x-1/2 gradient-mask-r-[transparent,white_30%]"
      >
        <CarouselContent className="ml-0">
          {_testimonials.map((testimonial, i) => {
            // if (i > 0) return;
            return (
              <CarouselItem
                index={i}
                className={cn(
                  "max-w-xs border border-border space-y-4 bg-[radial-gradient(79.87%_66.06%_at_44.64%_34.16%,#07090A_0%,#101315_100%)] p-8  rounded-xl ml-6"
                )}
              >
                <div className="size-20 rounded-full overflow-hidden">
                  <img
                    className="w-full h-full object-cover "
                    src={testimonial.image}
                    alt={testimonial.name}
                    width="80"
                    height="80"
                  />
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-medium text-2xl">{testimonial.name}</h3>
                  <p className="text-muted-foreground text-md">
                    {testimonial.designation}
                  </p>
                </div>
                <p className="text-md font-light leading-tight">
                  {testimonial.testimonial}
                </p>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default TestimonialCarousel;
