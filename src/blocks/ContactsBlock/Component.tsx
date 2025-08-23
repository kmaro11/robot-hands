import React from 'react'
import { ContactBlock } from '@/payload-types'
import { Media } from '@/components/Media'

export const ContactsBlock: React.FC<ContactBlock> = ({
  title,
  phone,
  email,
  address,
  addressTitle,
  media,
}) => {
  return (
    <section className="px-8 pt-[114px] md:pt-[112px]">
      <div className="max-w-[888px] w-full mx-auto">
        <h1 className="text-primary mb-14 md:mb-10 md:mb-[76px] text-30 md:text-60 font-bold text-center max-w-[664px] w-full mx-auto">
          {title}
        </h1>
        <h1 className="text-primary mb-14 md:mb-10 md:mb-[76px] text-30 md:text-60 font-bold text-center max-w-[664px] w-full mx-auto">
          {title}
        </h1>
        <div className="flex flex-col md:flex-row justify-between max-w-[800px] w-full gap-x-8 ml-auto mb-20 md:mb-24 gap-y-6">
          <a href={`tel:${phone}`} className="flex items-center md:text-30">
            <div className="bg-green mr-8 md:mr-11 flex items-center justify-center rounded w-10 h-[38px] md:w-16 md:h-[60px]">
              <div className="w-[14px] md:w-[22px]">
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 22 31"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.9237 29.2241L17.4682 30.06C8.93963 34.6739 -5.86737 7.76086 2.45665 2.67983L3.8571 1.86851L8.39676 10.1129L7.00418 10.916C4.47865 12.5059 10.3794 23.2908 12.9679 21.8074L14.3919 20.9879L18.9316 29.2241H18.9237ZM6.93337 0L4.8799 1.24567L9.41956 9.49005L11.473 8.24438L6.93337 0ZM17.4603 19.1194L15.4069 20.3651L19.9465 28.6095L22 27.3638L17.4603 19.1194Z"
                    fill="black"
                  />
                </svg>
              </div>
            </div>
            <span className="text-20 md:text-30">{phone}</span>
          </a>
          <a href={`mailto:${email}`} className="flex items-center md:text-30">
            <div className="bg-green mr-8 md:mr-11 flex items-center justify-center rounded w-10 h-[38px] md:w-16 md:h-[60px]">
              <div className="w-[18px] md:w-[29px]">
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 29 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 23.2059H29V0H0V23.2059ZM25.9981 2.57751L14.4961 12.5229L2.9941 2.57751H25.9981ZM2.41862 20.6284V5.39537L14.5039 15.838L26.5892 5.39537V20.6284H2.42641H2.41862Z"
                    fill="black"
                  />
                </svg>
              </div>
            </div>
            <span className="text-20 md:text-30">{email}</span>
          </a>
        </div>
        <div className="bg-green-100 p-3 pb-9 md:pt-8 md:pl-9 md:pr-7 md:pb-16 rounded-[10px]">
          <div className="rounded-[10px] overflow-hidden mb-7 md:mb-9 h-[340px] md:h-auto relative">
            <Media
              resource={media}
              imgClassName="absolute md:relative inset-0 object-cover object-left h-full w-full"
            />
          </div>
          <h3 className="md:text-40 text-30 mb-[22px] md:mb-[18px] text-white max-w-[216px] md:max-w-full ">
            {addressTitle}
          </h3>
          <p className="text-[15px] md:text-xl text-gray-200">{address}</p>
        </div>
      </div>
    </section>
  )
}
