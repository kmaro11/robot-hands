'use client'
import { AdaptationBlock as AdaptationBlockProps } from '@/payload-types'
import { Card } from './Card'
import useEmblaCarousel from 'embla-carousel-react'
import React, { useCallback, useEffect, useState } from 'react'

export const Adaptation: React.FC<AdaptationBlockProps> = ({ title, subtitle, cards }) => {
  const [ref, api] = useEmblaCarousel({
    loop: true,
    align: 'center',
    containScroll: 'trimSnaps',
    duration: 20,
  })

  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)

  const onSelect = useCallback(() => {
    if (!api) return
    setCanPrev(api.canScrollPrev())
    setCanNext(api.canScrollNext())
  }, [api])

  useEffect(() => {
    if (!api) return
    onSelect()
    api.on('select', onSelect)
    api.on('reInit', onSelect)
    return () => {
      api.off('select', onSelect)
      api.off('reInit', onSelect)
    }
  }, [api, onSelect])

  return (
    <div className="w-full pt-14 md:pt-[120px] pb-[124px]">
      <div className="max-w-[580px] w-full mx-auto mb-12 md:mb-20 px-8">
        <h1 className="text-primary text-30 md:text-40 font-bold text-center mb-4 md:mb-8">
          {title}
        </h1>
        <p className="text-primary text-15 md:text-20 text-center">{subtitle}</p>
      </div>
      <div className="overflow-hidden px-8" ref={ref}>
        <div className="flex -ml-6 will-change-transform">
          {cards?.map((card) => (
            <div
              key={card.id}
              className="pl-4 md:pl-5 shrink-0 min-w-0 basis-[95%] sm:basis-[60%] md:basis-[45%] lg:basis-1/3 xl:basis-1/4"
            >
              <Card {...card} />
            </div>
          ))}
        </div>
      </div>
      <div className="hidden md:flex md:mt-[70px] items-center justify-center gap-4">
        <button
          onClick={() => api?.scrollPrev()}
          disabled={!canPrev}
          aria-label="Previous"
          className="flex items-center justify-center bg-green-100 h-10 w-10 rounded-full text-2xl rotate-180"
        >
          <svg
            width="10"
            height="16"
            viewBox="0 0 10 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.07081 8L-4.07937e-08 15.0667L0.863339 16L10 8L0.863339 -3.77378e-08L-6.58588e-07 0.933252L8.07081 8Z"
              fill="white"
            />
          </svg>
        </button>
        <button
          onClick={() => api?.scrollNext()}
          disabled={!canNext}
          aria-label="Next"
          className="flex items-center justify-center bg-green-100 h-10 w-10 rounded-full text-2xl"
        >
          <svg
            width="10"
            height="16"
            viewBox="0 0 10 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.07081 8L-4.07937e-08 15.0667L0.863339 16L10 8L0.863339 -3.77378e-08L-6.58588e-07 0.933252L8.07081 8Z"
              fill="white"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
