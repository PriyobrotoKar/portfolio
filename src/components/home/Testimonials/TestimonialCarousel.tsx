import {
  Carousel,
  CarouselContent,
  CarouselItem
} from '@/components/ui/carousel'
import useIsMobile from '@/hooks/useIsMobile'
import { cn } from '@/lib/utils'
import Autoplay from 'embla-carousel-autoplay'

type TestimonialCarouselProps = {
  testimonials: {
    metadata: {
      name: string
      profile_picture: {
        url: string
      }
      designation: string
      testimonial: string
      social_link: string
    }
  }[]
}

const TestimonialCarousel = ({ testimonials }: TestimonialCarouselProps) => {
  const _testimonials = [...testimonials, ...testimonials]
  const isMobile = useIsMobile()

  return (
    <div>
      <Carousel
        opts={{ loop: true }}
        plugins={[
          Autoplay({
            delay: 5000,
            stopOnInteraction: false,
            stopOnMouseEnter: true
          })
        ]}
        itemsCount={_testimonials.length}
        offset={isMobile ? 0 : 1}
        className="w-screen max-w-screen-2xl overflow-x-hidden overflow-y-visible left-1/2 -translate-x-1/2 gradient-mask-r-[transparent,white_30%]"
      >
        <CarouselContent className="ml-0">
          {_testimonials.map((testimonial, i) => {
            return (
              <CarouselItem index={i} className={cn('max-w-xs  ml-6')}>
                <a
                  className="block space-y-3"
                  href={testimonial.metadata.social_link}
                >
                  <div className="size-20 rounded-full overflow-hidden">
                    <img
                      className="w-full h-full object-cover "
                      src={testimonial.metadata.profile_picture.url}
                      alt={testimonial.metadata.name}
                      width="80"
                      height="80"
                    />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium text-2xl">
                      {testimonial.metadata.name}
                    </h3>
                    <p className="text-muted-foreground text-md">
                      {testimonial.metadata.designation}
                    </p>
                  </div>
                  <p className="text-md font-light leading-tight">
                    {testimonial.metadata.testimonial}
                  </p>
                </a>
              </CarouselItem>
            )
          })}
        </CarouselContent>
      </Carousel>
    </div>
  )
}

export default TestimonialCarousel
