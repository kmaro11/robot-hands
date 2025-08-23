import type { CollectionConfig } from 'payload'
import type { Media as MediaDoc } from '@/payload-types'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { put } from '@vercel/blob'
import path from 'path'
import { fileURLToPath } from 'url'
import { promises as fs } from 'fs'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Use writable temp dir on Vercel, local folder in dev
const uploadsDir = process.env.VERCEL
  ? path.resolve('/tmp/media')
  : path.resolve(dirname, '../../public/media')

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
    beforeChange: [
      async () => {
        // Ensure upload directory exists when running on Vercel
        if (process.env.VERCEL) {
          try {
            await fs.mkdir(uploadsDir, { recursive: true })
          } catch {}
        }
      },
    ],
    afterChange: [
      async ({ doc, previousDoc: _prev }) => {
        try {
          // Skip if already points to Vercel Blob
          const url: string | undefined = (doc as MediaDoc)?.url ?? undefined
          if (url && url.includes('vercel-storage.com')) return doc

          // Helper to upload a file by filename if it exists on disk
          const uploadFile = async (
            fileName: string | null | undefined,
          ): Promise<string | undefined> => {
            if (!fileName) return undefined
            const filePath = path.join(uploadsDir, fileName)
            try {
              const buffer = await fs.readFile(filePath)
              const blob = await put(fileName, buffer, { access: 'public', addRandomSuffix: false })
              return blob.url
            } catch {
              return undefined
            }
          }

          // Upload original
          const newUrl = await uploadFile((doc as MediaDoc)?.filename ?? undefined)
          if (newUrl) {
            ;(doc as MediaDoc).url = newUrl
          }

          // Upload sizes if present
          const mediaDoc = doc as MediaDoc
          const sizeKeys = [
            'thumbnail',
            'square',
            'small',
            'medium',
            'large',
            'xlarge',
            'og',
          ] as const
          for (const key of sizeKeys) {
            const sizeVal = mediaDoc.sizes?.[key]
            if (sizeVal?.filename) {
              const sizeUrl = await uploadFile(sizeVal.filename)
              if (sizeUrl) {
                if (!mediaDoc.sizes) mediaDoc.sizes = {}
                if (!mediaDoc.sizes[key]) mediaDoc.sizes[key] = {}
                mediaDoc.sizes[key]!.url = sizeUrl
              }
            }
          }

          return doc
        } catch {
          return doc
        }
      },
    ],
  },
}
