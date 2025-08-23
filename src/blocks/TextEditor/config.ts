import { lexicalEditor } from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'

export const TextEditor: Block = {
  slug: 'textEditor',
  interfaceName: 'TextEditorBlock',
  fields: [
    {
      name: 'content',
      label: 'Text Content',
      type: 'richText',
      required: true,
      editor: lexicalEditor({}),
    },
  ],
}
