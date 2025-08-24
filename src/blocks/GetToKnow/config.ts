import type { Block } from 'payload'

export const GetToKnow: Block = {
  slug: 'getToKnow',
  interfaceName: 'GetToKnowBlock',
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
    {
      name: 'link',
      label: 'Link',
      type: 'group',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Button Text',
        },
        {
          name: 'linkType',
          type: 'radio',
          options: [
            { label: 'Page', value: 'pages' },
            { label: 'Custom URL', value: 'custom' },
          ],
          defaultValue: 'pages',
        },
        {
          name: 'page',
          type: 'relationship',
          relationTo: 'pages',
          admin: {
            condition: (_, siblingData) => siblingData.linkType === 'pages',
          },
        },
        {
          name: 'url',
          type: 'text',
          admin: {
            condition: (_, siblingData) => siblingData.linkType === 'custom',
          },
        },
        {
          name: 'newTab',
          type: 'checkbox',
          label: 'Open in new tab',
        },
      ],
    },
  ],
}
