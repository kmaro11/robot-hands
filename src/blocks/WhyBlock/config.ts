import type { Block } from 'payload'

export const WhyBlock: Block = {
  slug: 'whyBlock',
  interfaceName: 'WhyBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'cards',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'subtitle',
          type: 'text',
          required: true,
        },
        {
          name: 'media',
          type: 'relationship',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}
