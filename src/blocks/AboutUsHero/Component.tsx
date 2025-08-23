import React from 'react'
import { AboutUsBlock } from '@/payload-types'
import { Media } from '@/components/Media'

export const AboutUsHero: React.FC<AboutUsBlock> = ({ title, subtitle, media, paragraph }) => {
  return (
    <section className="px-8 pt-[114px] pb-24 md:pt-[112px] md:pb-[150px] ">
      <div className="max-w-[1193px] w-full mx-auto">
        <div className="max-w-[329px] md:max-w-[770px] mx-auto w-full mb-8 md:mb-24">
          <h1 className="text-primary mb-6 md:mb-8 text-30 md:text-60 font-bold text-center">
            {title}
          </h1>
          <p className="text-gray-100 text-15 md:text-25 text-center w-full">{subtitle}</p>
        </div>
        <div className="w-full mb-8 md:mb-24 rounded-[5px] overflow-hidden h-[579px] md:h-auto relative">
          <Media
            resource={media}
            imgClassName="absolute md:relative inset-0 object-cover object-center h-full w-full"
          />
        </div>
        <p className="text-primary text-15 md:text-25 max-w-[860px] w-full">{paragraph}</p>
      </div>
    </section>
  )
}
