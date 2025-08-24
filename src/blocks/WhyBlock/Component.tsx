import { WhyBlock as WhyBlockProps } from '@/payload-types'
import { Card } from './Card'

export const WhyBlock: React.FC<WhyBlockProps> = ({ title, cards }) => {
  return (
    <div className="md:pb-[213px]">
      <h2 className="text-center text-40 font-bold mb-14">{title}</h2>
      <div className="grid grid-cols-3 gap-5">
        {cards?.map((card) => (
          <Card key={card.id} {...card} />
        ))}
      </div>
    </div>
  )
}
