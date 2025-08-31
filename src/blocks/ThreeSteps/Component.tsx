import { Button } from '@/components/ui/button'
import { ThreeStepsBlock as ThreeStepsBlockProps } from '@/payload-types'

export const ThreeSteps: React.FC<ThreeStepsBlockProps> = ({ title, steps, link }) => {
  const textButton = (link: any) => {
    if (!link || !link?.label || !link?.linkType) return
    return (
      <Button
        href={link?.linkType === 'custom' ? link?.url : link.page?.slug}
        linkType={link?.linkType}
        variant="primary"
        size="normal"
        className="mt-[100px] md:mt-[75px] font-bold mx-auto w-full max-w-full md:max-w-max"
      >
        {link?.label}
      </Button>
    )
  }

  return (
    <div className="max-w-[1216px] w-full mx-auto px-8 pb-[96px] md:pb-[90px]">
      <h2 className="text-primary text-30 md:text-40 font-bold mb-[125px] md:mb-20 text-center max-w-[495px] mx-auto">
        {title}
      </h2>
      <div className="relative flex flex-col md:flex-row gap-y-20 md:gap-10">
        <div className="absolute left-[30px] md:left-[14%] md:top-7 w-[1px] md:w-[70%] h-[70%] md:h-[1px] bg-green"></div>
        {steps?.map((step, index) => (
          <div key={step.id} className="flex gap-x-7 md:gap-x-0 md:flex-col relative z-10 md:w-1/3">
            <div className="flex-shrink-0 mb-[30px] mx-auto w-14 h-14 rounded-full bg-green text-primary flex items-center justify-center text-25">
              <div>{index + 1}</div>
            </div>
            <div>
              <h3 className="mb-6 md:mb-[30px] text-20 md:text-25 font-bold text-primary">
                {step.title}
              </h3>
              <p className="text-15 text-primary">{step.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
      {link && textButton(link)}
    </div>
  )
}
