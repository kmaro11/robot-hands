import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { AboutUsHero } from '@/blocks/AboutUsHero/Component'
import { ServicesBlock } from '@/blocks/ServicesBlock/Component'
import { TeamBlock } from '@/blocks/TeamBlock/Component'
import { TextBlock } from '@/blocks/TextBlock/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { TextEditor as TextEditorBlockComponent } from '@/blocks/TextEditor/Component'
import { ContactsBlock } from '@/blocks/ContactsBlock/Component'
import { HomeHero } from '@/blocks/HomeHero/Component'
import { WhyBlock } from '@/blocks/WhyBlock/Component'
import { Adaptation } from '@/blocks/Adaptation/Component'
import { ThreeSteps } from '@/blocks/ThreeSteps/Component'
import { GetToKnow } from '@/blocks/GetToKnow/Component'

const blockComponents = {
  mediaBlock: MediaBlock,
  aboutUs: AboutUsHero,
  services: ServicesBlock,
  team: TeamBlock,
  text: TextBlock,
  form: FormBlock,
  textEditor: TextEditorBlockComponent,
  contact: ContactsBlock,
  homeHero: HomeHero,
  whyBlock: WhyBlock,
  adaptation: Adaptation,
  threeSteps: ThreeSteps,
  getToKnow: GetToKnow,
} as const

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block
          const type = blockType as keyof typeof blockComponents

          if (type && type in blockComponents) {
            const Block = blockComponents[type]

            if (Block) {
              return (
                <div key={index}>
                  <Block {...(block as any)} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
