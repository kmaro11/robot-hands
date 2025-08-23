// import { getClientSideURL } from '@/utilities/getURL'

/**
 * Processes media resource URL to ensure proper formatting
 * @param url The original URL from the resource
 * @param cacheTag Optional cache tag to append to the URL
 * @returns Properly formatted URL with cache tag if provided
 */
export const getMediaUrl = (url: string | null | undefined, cacheTag?: string | null): string => {
  if (!url) return ''

  // If URL already absolute, return as-is (honors Blob URLs)
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return cacheTag ? `${url}?${cacheTag}` : url
  }

  // No public env usage to avoid exposing secrets. Fallback to current origin.

  // Otherwise, fall back to current origin
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  return cacheTag ? `${origin}${url}?${cacheTag}` : `${origin}${url}`
}
