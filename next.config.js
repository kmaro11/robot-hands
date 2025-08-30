import { withPayload } from '@payloadcms/next/withPayload'

import redirects from './redirects.js'

const RAW_ORIGIN =
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  process.env.__NEXT_PRIVATE_ORIGIN ||
  'http://localhost:3000'

const NEXT_PUBLIC_SERVER_URL =
  RAW_ORIGIN.startsWith('http://') || RAW_ORIGIN.startsWith('https://')
    ? RAW_ORIGIN
    : `https://${RAW_ORIGIN}`

const BLOB_PUBLIC_HOST = process.env.BLOB_PUBLIC_HOST

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      (() => {
        try {
          const u = new URL(NEXT_PUBLIC_SERVER_URL)
          return u.hostname
        } catch {
          return ''
        }
      })(),
      (() => {
        try {
          const u = new URL(BLOB_PUBLIC_HOST || '')
          return u.hostname
        } catch {
          return ''
        }
      })(),
    ].filter(Boolean),
    remotePatterns: [
      ...[NEXT_PUBLIC_SERVER_URL /* 'https://example.com' */].map((item) => {
        const url = new URL(item)

        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(':', ''),
          pathname: '/**',
        }
      }),
      // Allow explicitly provided Blob host, or any Vercel Blob host in dev
      ...(BLOB_PUBLIC_HOST
        ? (() => {
            try {
              const u = new URL(BLOB_PUBLIC_HOST)
              return [
                {
                  protocol: u.protocol.replace(':', ''),
                  hostname: u.hostname,
                  pathname: '/**',
                },
              ]
            } catch {
              // If provided without protocol, assume https
              const host = BLOB_PUBLIC_HOST.replace(/^https?:\/\//, '')
              return [
                {
                  protocol: 'https',
                  hostname: host,
                  pathname: '/**',
                },
              ]
            }
          })()
        : [
            {
              protocol: 'https',
              hostname: '*.public.blob.vercel-storage.com',
              pathname: '/**',
            },
          ]),
    ],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  reactStrictMode: true,
  redirects,
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
