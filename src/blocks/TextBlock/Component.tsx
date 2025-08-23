import React from 'react'
import { TextBlock as TextBlockProps } from '@/payload-types'
import { Button } from '@/components/ui/button'

const textButton = (link: any) => {
  if (!link || !link?.label || !link?.linkType) return
  return (
    <Button
      href={link?.linkType === 'custom' ? link?.url : link.page?.slug}
      linkType={link?.linkType}
      variant="primary"
      size="normal"
      className="mx-auto"
    >
      {link?.label}
    </Button>
  )
}

export const TextBlock: React.FC<TextBlockProps> = ({ title, subtitle, link }) => {
  return (
    <section className="max-w-[1092px] w-full mx-auto px-8 pt-[116px] pb-[160px] md:pt-[118px] md:pb-[177px]">
      <div className="max-w-[795px] w-full mx-auto">
        <h2 className="text-center text-30 md:text-40 font-bold pb-6 text-primary">{title}</h2>
        <p className="text-center text-15 md:text-25 mb-12 text-gray-100 font-normal font-custom">
          {subtitle}
        </p>
        {link && textButton(link)}
      </div>
    </section>
  )
}
