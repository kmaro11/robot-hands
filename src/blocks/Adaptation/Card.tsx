import { Media } from '@/components/Media'

export const Card: React.FC<{
  title: string
  subtitle: string
  media: any
}> = ({ title, subtitle, media }) => {
  return (
    <div className="rounded-[10px] relative h-[266px] md:h-[351px]">
      <Media
        resource={media}
        imgClassName="absolute inset-0 rounded-[10px] h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 rounded-[10px] pointer-events-none bg-gradient-to-b from-black/0 to-black/80" />
      <div className="p-5 md:p-7 relative z-10">
        <h3 className="text-white text-20 md:text-25 font-bold mb-4">{title}</h3>
        <p className="text-white text-12 md:text-15">{subtitle}</p>
      </div>
    </div>
  )
}
