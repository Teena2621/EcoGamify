'use client'

import * as React from 'react'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { PlaceHolderImages } from '@/lib/placeholder-images'

const slideshowContent = [
  {
    id: 'slide-1',
    caption: 'The serene water cycle, a life-giving phenomenon.'
  },
  {
    id: 'slide-2',
    caption: 'Harnessing the power of renewable energy for a brighter future.'
  },
  {
    id: 'slide-3',
    caption: 'Embracing an eco-friendly lifestyle with reusable items.'
  },
  {
    id: 'picture-1',
    caption: 'Sunlight filtering through a lush green forest.'
  },
  {
    id: 'slide-5',
    caption: 'Celebrating the rich biodiversity of our planet.'
  },
]

export default function LectureSlideshow() {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  )

  const slides = slideshowContent.map(item => {
    const imageData = PlaceHolderImages.find(p => p.id === item.id)
    return { ...item, ...imageData }
  })

  return (
    <section>
       <h2 className="text-2xl md:text-3xl font-bold font-headline mb-6 text-center">Game Highlights</h2>
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.id}>
              <div className="relative w-full h-[250px] md:h-[350px] rounded-lg overflow-hidden bg-primary/10">
                {slide.imageUrl && (
                  <Image
                    src={slide.imageUrl}
                    alt={slide.description || 'Slideshow image'}
                    fill
                    className="object-cover"
                    data-ai-hint={slide.imageHint}
                  />
                )}
                <div className="absolute inset-0 bg-black/40 flex items-end p-4 md:p-6">
                  <p className="text-white text-lg md:text-xl font-semibold max-w-2xl animate-fade-in animate-slide-in-from-bottom [animation-delay:0.4s]">
                    {slide.caption}
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 hidden sm:flex" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 hidden sm:flex" />
      </Carousel>
    </section>
  )
}
