import { HomeHeroBlock as HomeHeroBlockProps } from '@/payload-types'
import Link from 'next/link'
import { getMediaUrl } from '@/utilities/getMediaUrl'

export const HomeHero: React.FC<HomeHeroBlockProps> = ({ title, subtitle, images, link }) => {
  const desktopMedia: any = images?.[0]?.media
  const mobileMedia: any = images?.[1]?.media

  const desktopUrl = desktopMedia ? getMediaUrl(desktopMedia?.url, desktopMedia?.updatedAt) : ''
  const mobileUrl = mobileMedia ? getMediaUrl(mobileMedia?.url, mobileMedia?.updatedAt) : ''

  const href =
    link?.linkType === 'custom'
      ? link?.url || '#'
      : typeof link?.page === 'object'
        ? (link?.page as any)?.slug || '#'
        : '#'

  return (
    <section className="relative overflow-hidden pt-[88px] md:pt-[112px]">
      {desktopUrl && (
        <div
          className="absolute inset-0 hidden md:block bg-cover bg-center"
          style={{ backgroundImage: `url(${desktopUrl})` }}
          aria-hidden="true"
        />
      )}
      {(mobileUrl || desktopUrl) && (
        <div
          className="absolute inset-0 md:hidden bg-cover bg-center"
          style={{ backgroundImage: `url(${mobileUrl || desktopUrl})` }}
          aria-hidden="true"
        />
      )}

      <div className="relative z-10">
        <div className="max-w-[1193px] w-full mx-auto px-8 py-16 md:py-24">
          <div className="max-w-[329px] md:max-w-[770px] mx-auto w-full mb-8 md:mb-12 text-center">
            <h1 className="text-primary mb-6 md:mb-8 text-30 md:text-60 font-bold">{title}</h1>
            <p className="text-gray-100 text-15 md:text-25 w-full">{subtitle}</p>
          </div>
          {link?.label && (
            <div className="flex justify-center">
              <Link
                href={href}
                className="bg-green text-primary px-6 py-3 rounded hover:opacity-90"
              >
                {link.label}
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
