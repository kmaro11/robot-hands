import { WhyBlock as WhyBlockProps } from '@/payload-types'
import { Card } from './Card'

export const WhyBlock: React.FC<WhyBlockProps> = ({ title, cards }) => {
  return (
    <div className="pb-[100px] md:pb-[213px] max-w-[1216px] mx-auto px-6">
      <h2 className="text-center text-30 md:text-40 font-bold mb-9 md:mb-14">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-5">
        {cards?.map((card) => (
          <Card key={card.id} {...card} />
        ))}
      </div>
    </div>
  )
}
