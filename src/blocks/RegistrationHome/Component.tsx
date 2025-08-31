import { RegistrationHomeBlock as RegistrationHomeBlockProps } from '@/payload-types'

export const RegistrationHome: React.FC<RegistrationHomeBlockProps> = ({ title, subtitle }) => {
  return (
    <div className="max-w-[1216px] w-full mx-auto px-8 pb-[96px] md:pb-[90px]">
      <h1 className="text-primary text-30 font-bold">{title}</h1>
      <p className="text-gray-100 text-15">{subtitle}</p>
    </div>
  )
}
