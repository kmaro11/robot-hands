import type { Block } from 'payload'

export const HomeHero: Block = {
  slug: 'homeHero',
  interfaceName: 'HomeHeroBlock',
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
    {
      name: 'images',
      type: 'array',
      fields: [
        {
          name: 'media',
          label: 'Image(first for desktop, second for mobile)',
          type: 'relationship',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}
