'use client'
import React, { useState, useEffect } from 'react'
import { TeamBlock as TeamBlockProps } from '@/payload-types'
import { Media } from '@/components/Media'

export const TeamBlock: React.FC<TeamBlockProps> = ({ title, members = [] }) => {
  const [isMobile, setIsMobile] = useState(false)
  const [visibleCount, setVisibleCount] = useState(4)
  const memebersList = members || []

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const displayedMembers = isMobile ? memebersList.slice(0, visibleCount) : memebersList

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 4, memebersList.length))
  }

  return (
    <section className="px-8">
      <div className="max-w-[1193px] w-full mx-auto">
        <h2 className="text-primary mb-10 md:mb-12 text-30 md:text-40 font-bold text-center">
          {title}
        </h2>
        {memebersList.length > 0 && (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 xl:gap-x-6">
            {displayedMembers.map((member) => (
              <li key={member.id} className="bg-green-100 rounded-lg pt-[14px] px-4 pb-6">
                <Media resource={member.media} className="mb-4 rounded-lg" />
                <h3 className="text-white text-25 mb-4">{member.title}</h3>
                <p className="text-green text-15">{member.role}</p>
              </li>
            ))}
          </ul>
        )}

        {isMobile && visibleCount < memebersList.length && (
          <div className="pt-12 mx-auto flex justify-center">
            <button onClick={loadMore} aria-label="Load more team members">
              <svg
                width="61"
                height="61"
                viewBox="0 0 61 61"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="30.5" cy="30.5" r="29.75" stroke="black" strokeWidth="1.5" />
                <line
                  x1="30.9648"
                  y1="18.2422"
                  x2="30.9648"
                  y2="41.0459"
                  stroke="black"
                  strokeWidth="1.5"
                />
                <line
                  x1="41.6172"
                  y1="30.3945"
                  x2="18.8134"
                  y2="30.3945"
                  stroke="black"
                  strokeWidth="1.5"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
