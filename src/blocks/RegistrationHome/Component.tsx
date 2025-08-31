import { RegistrationHomeBlock as RegistrationHomeBlockProps } from '@/payload-types'
import { FormFields } from '../Form/FormFields'

export const RegistrationHome: React.FC<RegistrationHomeBlockProps> = ({ title, subtitle }) => {
  return (
    <div className="flex flex-col lg:flex-row">
      <div className="bg-green lg:max-w-[671px] w-full pl-10 pr-7 pt-11 pb-16 md:py-[88px] flex justify-center flex-col">
        <div className="max-w-[520px] w-full">
          <h1 className="text-primary text-30 md:text-40 font-bold mb-9 md:mb-[30px] leading-[100%]">
            {title}
          </h1>
          <p className="text-primary text-15 md:text-20">{subtitle}</p>
        </div>
      </div>
      <div className="bg-gray-500 w-full py-[50px] px-8 md:px-20 md:pr-[100px]">
        <FormFields fieldsColor="bg-white" formType="register" />
      </div>
    </div>
  )
}
