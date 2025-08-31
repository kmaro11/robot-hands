import { withPayload } from '@payloadcms/next/withPayload'

import redirects from './redirects.js'

/** @type {import('next').NextConfig} */
const blobHost = process.env.BLOB_PUBLIC_HOST?.replace(/^https?:\/\//, '').split('/')?.[0]

const nextConfig = {
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
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'blob.vercel-storage.com' },
      ...(blobHost ? [{ protocol: 'https', hostname: blobHost }] : []),
    ],
    domains: ['localhost'],
  },
  async rewrites() {
    const rewrites = []
    if (blobHost) {
      rewrites.push(
        { source: '/api/media/file/:filename*', destination: `https://${blobHost}/:filename*` },
        { source: '/media/:filename*', destination: `https://${blobHost}/:filename*` },
      )
    }
    return rewrites
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
