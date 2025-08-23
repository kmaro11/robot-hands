import React from 'react'
import { ServicesBlock as AboutUsBlockProps } from '@/payload-types'
import { ServiceAction } from './ServiceAction'

export const ServicesBlock: React.FC<AboutUsBlockProps> = ({ title, services }) => {
  return (
    <section className="px-8 pb-[120px]">
      <div className="max-w-[1193px] w-full mx-auto">
        <h2 className="text-primary mb-10 md:mb-12 text-30 md:text-40 font-bold text-center">
          {title}
        </h2>
        {services && (
          <ul className="border-t border-green-100">
            {services.map((service) => (
              <li
                key={service.id}
                className="flex flex-col md:flex-row justify-between md:pt-[68px] py-7 md:pb-14 border-b border-green-100"
              >
                <div className="flex flex-col justify-between">
                  <h3 className="text-primary text-xl mb-7 md:text-30 font-bold max-w-[240px] md:max-w-[390px] w-full tracking-[1px]">
                    {service.title}
                  </h3>
                  <ServiceAction link={service.link} className="hidden md:flex" />
                </div>

                <p className="text-primary text-15 md:text-25 max-w-[643px] w-full">
                  {service.text}
                </p>

                <ServiceAction link={service.link} className="flex md:hidden" />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
