import { Media } from '@/components/Media'

export const Card: React.FC<{
  title: string
  subtitle: string
  media: any
}> = ({ title, subtitle, media }) => {
  return (
    <div className="rounded-[10px] relative h-[379px] md:h-[491px] flex flex-col justify-end shadow-[0_4px_15px_rgba(0,0,0,0.25)]">
      <Media
        resource={media}
        imgClassName="absolute inset-0 rounded-[10px] h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 rounded-[10px] pointer-events-none" />
      <div className="p-5 md:p-7 relative z-10 h-2/5">
        <h3 className="text-primary text-20 md:text-25 font-bold mb-2">{title}</h3>
        <p className="text-primary text-12 md:text-15">{subtitle}</p>
      </div>
    </div>
  )
}
