/**
 * Get the full image URL for display
 * @param {string} imagePath - The image path from the database
 * @returns {string} - The full URL to the image
 */
const FALLBACK_IMG = 'https://dummyimage.com/600x400/e5e7eb/9ca3af.png&text=Image';
const BACKEND_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

export const getImageUrl = (imagePath) => {
  try {
    if (!imagePath || typeof imagePath !== 'string') return FALLBACK_IMG;
    if (imagePath.startsWith('http')) return imagePath;
    
    let normalizedPath = imagePath.replace(/\\/g, '/');

    // If it's a bare filename (no slash), assume uploads/products
    if (!normalizedPath.includes('/')) {
      normalizedPath = `uploads/products/${normalizedPath}`;
    }
    // Ensure it starts with /uploads
    if (!normalizedPath.startsWith('/')) {
      normalizedPath = `/${normalizedPath}`;
    }
    
    // Use relative path for both dev and prod (Vercel rewrite handles routing)
    return normalizedPath;
  } catch {
    return FALLBACK_IMG;
  }
};

/**
 * Handle image load errors by setting a fallback
 * @param {Event} e - The error event
 */
export const handleImageError = (e) => {
  if (!e?.currentTarget) return;
  e.currentTarget.onerror = null;
  try {
    const url = new URL(e.currentTarget.src);
    const isLocal = url.origin === window.location.origin;
    const path = url.pathname;
    if (isLocal && path.startsWith('/uploads/') && BACKEND_URL) {
      e.currentTarget.src = `${BACKEND_URL}${path}`;
      return;
    }
  } catch {}
  e.currentTarget.src = FALLBACK_IMG;
};
