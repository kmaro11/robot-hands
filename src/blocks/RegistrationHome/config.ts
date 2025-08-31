import type { Block } from 'payload'

export const RegistrationHome: Block = {
  slug: 'registrationHome',
  interfaceName: 'RegistrationHomeBlock',
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
  ],
}
