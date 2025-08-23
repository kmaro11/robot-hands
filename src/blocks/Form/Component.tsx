import React from 'react'
import { FormBlock as FormBlockProps } from '@/payload-types'
import { FormFields } from './FormFields'

export const FormBlock: React.FC<FormBlockProps> = ({ title, subtitle }) => {
  return (
    <section className="md:px-8 md:pb-[156px] py-[114px] md:pt-[104px]">
      <div className="max-w-[1193px] w-full mx-auto flex flex-col md:flex-row justify-between gap-x-16">
        <div className="max-w-[474px] w-full mb-16 md:mb-0 mx-auto md:mx-0 px-4 md:px-0">
          <h1 className="text-primary mb-9 text-30 md:text-40 font-bold text-center md:text-left">
            {title}
          </h1>
          <p className="text-gray-100 text-15 md:text-25 text-center md:text-left"> {subtitle}</p>
        </div>
        <div className="max-w-[586px] w-full px-8 md:px-0">
          <FormFields />
        </div>
      </div>
    </section>
  )
}
