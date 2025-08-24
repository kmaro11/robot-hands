import Image from 'next/image'

export const Card: React.FC<{
  title: string
  subtitle: string
  media: any
}> = ({ title, subtitle, media }) => {
  return (
    <div className="bg-gray-500 rounded-[5px] h-[380px] pt-4 px-6">
      {media && (
        <div className="w-11 h-11 bg-green rounded-full flex items-center justify-center mb-8">
          <Image src={media.url} alt={media.alt} width={20} height={20} />
        </div>
      )}
      <h3 className="text-25 text-primary font-bold mb-5">{title}</h3>
      <p className="text-15 text-primary">{subtitle}</p>
    </div>
  )
}
