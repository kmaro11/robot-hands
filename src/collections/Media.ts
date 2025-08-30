import type { CollectionConfig } from 'payload'
// import type { Media as MediaDoc } from '@/payload-types'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { put } from '@vercel/blob'
import path from 'path'
// import { fileURLToPath } from 'url'
import { promises as fs } from 'fs'
// import { getServerSideURL } from '../utilities/getURL'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

// const filename = fileURLToPath(import.meta.url)
// const dirname = path.dirname(filename)

// Use a writable temp dir in all environments to keep behavior consistent
const uploadsDir = path.resolve('/tmp/media')

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      //required: true,
    },
    {
      name: 'caption',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
    },
  ],
  upload: {
    // Keep local storage to allow Payload to generate sizes via sharp, then mirror to Vercel Blob
    staticDir: uploadsDir,
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
      },
      {
        name: 'square',
        width: 500,
        height: 500,
      },
      {
        name: 'small',
        width: 600,
      },
      {
        name: 'medium',
        width: 900,
      },
      {
        name: 'large',
        width: 1400,
      },
      {
        name: 'xlarge',
        width: 1920,
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        crop: 'center',
      },
    ],
  },
  hooks: {
    // Simpler flow: on create, upload directly to Vercel Blob and store absolute URL
    beforeChange: [
      async ({ data, operation, req }) => {
        try {
          await fs.mkdir(uploadsDir, { recursive: true })
        } catch {}

        const files = (req as { files?: { file?: { name: string; data: Buffer } } }).files
        if (operation === 'create' && files?.file) {
          const file = files.file as { name: string; data: Buffer }
          const blob = await put(file.name, file.data, { access: 'public', addRandomSuffix: true })
          return { ...data, url: blob.url }
        }
        return data
      },
    ],
  },
}
