import { withPayload } from '@payloadcms/next/withPayload'

import redirects from './redirects.js'

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined || process.env.__NEXT_PRIVATE_ORIGIN || 'http://localhost:3000'

const BLOB_PUBLIC_HOST = process.env.BLOB_PUBLIC_HOST

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      ...[NEXT_PUBLIC_SERVER_URL /* 'https://example.com' */].map((item) => {
        const url = new URL(item)

        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(':', ''),
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
                },
              ]
            } catch {
              // If provided without protocol, assume https
              const host = BLOB_PUBLIC_HOST.replace(/^https?:\/\//, '')
              return [
                {
                  protocol: 'https',
                  hostname: host,
                },
              ]
            }
          })()
        : [
            {
              protocol: 'https',
              hostname: '**.public.blob.vercel-storage.com',
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
