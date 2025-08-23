import Link from 'next/link'
import React from 'react'

export default function NotFound() {
  return (
    <div className="">
      <div className="">
        <h1 style={{ marginBottom: 0 }}>404</h1>
        <p className="mb-4">This page could not be found.</p>
      </div>
      <Link className="underline" href="/">
        Go home
      </Link>
    </div>
  )
}
