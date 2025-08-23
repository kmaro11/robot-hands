import { getClientSideURL } from '@/utilities/getURL'

/**
 * Processes media resource URL to ensure proper formatting
 * @param url The original URL from the resource
 * @param cacheTag Optional cache tag to append to the URL
 * @returns Properly formatted URL with cache tag if provided
 */
export const getMediaUrl = (url: string | null | undefined, cacheTag?: string | null): string => {
  if (!url) return ''

  // Check if URL already has http/https protocol
  if (url.startsWith('http://') || url.startsWith('https://')) {
    const prodMediaBase = process.env.NEXT_PUBLIC_MEDIA_BASE_URL
    if (prodMediaBase) {
      const hasProtocol =
        prodMediaBase.startsWith('http://') || prodMediaBase.startsWith('https://')
      const base = (hasProtocol ? prodMediaBase : `https://${prodMediaBase}`).replace(/\/$/, '')
      try {
        const current = new URL(url)
        const prod = new URL(base)
        const isBlob = /\.blob\.vercel-storage\.com$/i.test(current.hostname)
        const sameHost = current.hostname === prod.hostname
        if (!isBlob && !sameHost) {
          const path = current.pathname.startsWith('/') ? current.pathname : `/${current.pathname}`
          return cacheTag ? `${base}${path}?${cacheTag}` : `${base}${path}`
        }
      } catch {
        // fall through to return the original url
      }
    }
    return cacheTag ? `${url}?${cacheTag}` : url
  }

  // Prefer a prod media base if provided (works locally and in prod)
  const prodMediaBase = process.env.NEXT_PUBLIC_MEDIA_BASE_URL
  if (prodMediaBase) {
    const hasProtocol = prodMediaBase.startsWith('http://') || prodMediaBase.startsWith('https://')
    const base = (hasProtocol ? prodMediaBase : `https://${prodMediaBase}`).replace(/\/$/, '')
    const path = url.startsWith('/') ? url : `/${url}`
    return cacheTag ? `${base}${path}?${cacheTag}` : `${base}${path}`
  }

  // Otherwise prepend client-side URL
  const baseUrl = getClientSideURL()
  return cacheTag ? `${baseUrl}${url}?${cacheTag}` : `${baseUrl}${url}`
}
