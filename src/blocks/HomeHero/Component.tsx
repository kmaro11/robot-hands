import { HomeHeroBlock as HomeHeroBlockProps } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { Button } from '@/components/ui/button'

export const HomeHero: React.FC<HomeHeroBlockProps> = ({ title, subtitle, images, link }) => {
  const desktopMedia: any = images?.[0]?.media

  const desktopUrl = desktopMedia ? getMediaUrl(desktopMedia?.url, desktopMedia?.updatedAt) : ''

  const textButton = (link: any) => {
    if (!link || !link?.label || !link?.linkType) return
    
    // Generate the href with proper fallbacks
    let href = '#'
    if (link?.linkType === 'custom' && link?.url) {
      href = link.url
    } else if (link?.page?.slug) {
      href = `/${link.page.slug}`
    }
    
    return (
      <Button
        href={href}
        linkType={link?.linkType}
        variant="primary"
        size="normal"
        className="mt-[30px] md:mt-11 font-bold"
      >
        {link?.label}
      </Button>
    )
  }

  return (
    <section className="relative overflow-hidden pt-[145px] md:pt-[157px] h-screen bg-gray">
      {desktopUrl && (
        <div
          className="absolute inset-0 block bg-cover bg-center"
          style={{ backgroundImage: `url(${desktopUrl})` }}
          aria-hidden="true"
        />
      )}

      <div className="relative z-10 px-[30px]">
        <div className=" max-w-[1216px] w-full mx-auto">
          <div className="max-w-[635px] w-full">
            <h1 className="text-primary mb-6 md:mb-7 text-30 md:text-50 font-bold">{title}</h1>
            <p className="text-gray-100 text-15 md:text-25 w-full">{subtitle}</p>
            {link && textButton(link)}
          </div>
        </div>
      </div>
    </section>
  )
}
