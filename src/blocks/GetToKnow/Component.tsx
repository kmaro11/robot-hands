'use client'
import { Button } from '@/components/ui/button'
import { Card } from './Card'
import useEmblaCarousel from 'embla-carousel-react'
export const GetToKnow: React.FC<{
  title?: string
  subtitle?: string
  cards?: any[]
  link?: any
}> = ({ title, subtitle, cards, link }) => {
  const [ref] = useEmblaCarousel({
    loop: true,
    align: 'center',
    containScroll: 'trimSnaps',
    duration: 20,
  })

  const textButton = (link: any) => {
    if (!link || !link?.label || !link?.linkType) return
    return (
      <Button
        href={link?.linkType === 'custom' ? link?.url : link.page?.slug}
        linkType={link?.linkType}
        variant="primary"
        size="normal"
        className="font-bold mx-auto w-full max-w-full md:max-w-max"
      >
        {link?.label}
      </Button>
    )
  }

  return (
    <div className="w-full pb-[135px] md:pb-[157px]">
      <div className="max-w-[580px] w-full mx-auto  px-8">
        <h1 className="text-primary text-30 md:text-40 font-bold text-center mb-4 md:mb-8">
          {title}
        </h1>
        <p className="text-primary text-15 md:text-20 text-center">{subtitle}</p>
      </div>
      <div className="overflow-hidden px-8 pt-12 md:pt-20 pb-[72px] md:pb-20" ref={ref}>
        <div className="flex -ml-6 will-change-transform">
          {cards?.map((card) => (
            <div
              key={card.id}
              className="pl-4 md:pl-5 shrink-0 min-w-0 basis-[80%] sm:basis-[60%] md:basis-[45%] lg:basis-1/4 2xl:basis-1/6"
            >
              <Card {...card} />
            </div>
          ))}
        </div>
      </div>
      <div className="max-w-[580px] w-full mx-auto px-8">{link && textButton(link)}</div>
    </div>
  )
}
