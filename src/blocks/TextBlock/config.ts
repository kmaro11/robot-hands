import type { Block } from 'payload'

export const Text: Block = {
  slug: 'text',
  interfaceName: 'TextBlock',
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
