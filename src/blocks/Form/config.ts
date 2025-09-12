import type { Block } from 'payload'

export const Form: Block = {
  slug: 'form',
  interfaceName: 'FormBlock',
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
      name: 'formType',
      type: 'radio',
      options: [
        { label: 'Download', value: 'download' },
        { label: 'Register', value: 'register' },
      ],
      defaultValue: 'download',
      required: true,
    },
  ],
}
