'use client'
import { WhyBlock as WhyBlockProps } from '@/payload-types'
import { Card } from './Card'
import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'

export const WhyBlock: React.FC<WhyBlockProps> = ({ title, cards }) => {
  const [ref] = useEmblaCarousel({
    loop: true,
    align: 'center',
    containScroll: 'trimSnaps',
    duration: 20,
  })

  return (
    <div className="pb-[100px] md:pb-[213px]">
      <div className="max-w-[1216px] w-full mx-auto px-8">
        <h2 className="text-center text-30 md:text-40 font-bold mb-9 md:mb-14">{title}</h2>

        {/* Desktop grid */}
        <div className="hidden md:grid grid-cols-3 xl:grid-cols-4 gap-5">
          {cards?.map((card) => (
            <Card key={card.id} {...card} />
          ))}
        </div>
      </div>

      {/* Mobile slider */}
      <div className="overflow-hidden md:hidden" ref={ref}>
        <div className="flex -ml-4 will-change-transform">
          {cards?.map((card) => (
            <div key={card.id} className="pl-4 shrink-0 min-w-0 basis-[80%]">
              <Card {...card} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
