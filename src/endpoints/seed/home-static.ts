import type { RequiredDataFromCollectionSlug } from 'payload'

// Used for pre-seeded content so that the homepage is not empty
export const homeStatic: RequiredDataFromCollectionSlug<'pages'> = {
  slug: 'home',
  _status: 'published',

  meta: {
    description: 'Robodam: robotinės rankos',
    title: 'Robodam: robotinės rankos',
  },
  title: 'Home',
  layout: [],
}
