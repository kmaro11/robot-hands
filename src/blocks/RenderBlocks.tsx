import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { MediaBlock } from '@/blocks/MediaBlock/Component'

const blockComponents = {
  mediaBlock: MediaBlock,
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
                <div className="my-16" key={index}>
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
