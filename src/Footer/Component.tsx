import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { Media } from '@/components/Media'

export async function Footer() {
  const footerData: any = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []

  const policySlug = footerData?.policy?.[0]?.link?.reference?.value?.slug
  const policyLabel = footerData?.policy?.[0]?.link?.label

  const slug = (item: any) => {
    if (
      item.type === 'reference' &&
      typeof item.reference?.value === 'object' &&
      item.reference.value.slug
    )
      return `/${item.reference.value.slug}`
    return '#'
  }

  return (
    <footer className="bg-green-100 px-8 pb-7 md:pb-12 pt-[46px] md:pt-11 ">
      <div className="max-w-[1256px] mx-auto">
        <div className="flex flex-col">
          <div className="flex flex-col md:flex-row gap-x-10 justify-between md:items-center mb-20 md:mb-[150px]">
            <Link href="https://robodam.com" className="mb-14 md:mb-0 max-w-[154px]">
              <Media resource={footerData?.media} />
            </Link>
            <div className="flex flex-col md:flex-row gap-x-7 gap-y-6">
              {navItems.map((item: any, index: number) => (
                <React.Fragment key={item?.id ?? `${item?.link?.label ?? 'nav'}-${index}`}>
                  {item.link.type === 'custom' && item.link.url && (
                    <a
                      href={item.link.url}
                      target={item.link.newTab ? '_blank' : '_self'}
                      className="text-white text-15 md:text-20 hover:underline"
                    >
                      {item.link.label}
                    </a>
                  )}
                  {item.link.type === 'reference' && (
                    <Link
                      href={slug(item.link)}
                      target={item.link.newTab ? '_blank' : '_self'}
                      className="text-white text-15 md:text-20 hover:underline"
                    >
                      {item.link.label}
                    </Link>
                  )}
                </React.Fragment>
              ))}
              {policySlug && (
                <Link
                  href={policySlug}
                  className="md:hidden text-white text-15 md:text-20 hover:underline"
                >
                  {policyLabel}
                </Link>
              )}
            </div>
          </div>
          <div className="flex flex-col lg:flex-row justify-between">
            <div className="order-2 lg:order-none mt-20 lg:mt-0 flex items-center gap-x-14">
              <div className="text-white text-15 md:text-20">{footerData?.copyright}</div>
              {policySlug && (
                <Link
                  href={policySlug}
                  className="hidden md:inline text-white text-15 md:text-20 hover:underline"
                >
                  {policyLabel}
                </Link>
              )}
            </div>
            <div className="flex flex-col md:flex-row gap-y-10 gap-x-10">
              <a
                href={`mailto:${footerData?.email}`}
                className="text-white text-20 flex items-center gap-4 hover:underline"
              >
                <div className="w-[22px] flex justify-center">
                  <svg
                    width="22"
                    height="18"
                    viewBox="0 0 22 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 18H22V0H0V18ZM19.7227 1.99929L10.9971 9.71357L2.27139 1.99929H19.7227ZM1.83482 16.0007V4.185L11.003 12.285L20.1711 4.185V16.0007H1.84072H1.83482Z"
                      fill="white"
                    />
                  </svg>
                </div>
                {footerData?.email}
              </a>
              <a
                href={`tel:${footerData?.phone}`}
                className="text-white text-20 flex items-center gap-4 hover:underline"
              >
                <div className="w-[22px] flex justify-center">
                  <svg
                    width="16"
                    height="22"
                    viewBox="0 0 16 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.7627 21.018L12.7042 21.6191C6.50155 24.9375 -4.26718 5.58161 1.78665 1.92733L2.80516 1.34383L6.10673 7.27318L5.09395 7.85079C3.2572 8.99422 7.54867 16.7507 9.43119 15.6839L10.4669 15.0945L13.7684 21.018H13.7627ZM5.04245 0L3.54902 0.895886L6.85059 6.82524L8.34402 5.92935L5.04245 0ZM12.6984 13.7507L11.205 14.6466L14.5066 20.5759L16 19.68L12.6984 13.7507Z"
                      fill="white"
                    />
                  </svg>
                </div>
                {footerData?.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
