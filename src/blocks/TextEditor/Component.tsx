import { TextEditorBlock } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'

export const TextEditor: React.FC<TextEditorBlock> = ({ content }) => {
  return (
    <section className="px-8 pt-[114px] pb-[86px] md:pt-[106px] md:pb-[155px]">
      <RichText data={content} className="text-editor max-w-[1193px] w-full mx-auto" />
    </section>
  )
}
