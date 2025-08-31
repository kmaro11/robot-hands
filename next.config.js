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
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
