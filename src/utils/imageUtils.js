const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Get the full image URL for display
 * @param {string} imagePath - The image path from the database
 * @returns {string} - The full URL to the image
 */
export const getImageUrl = (imagePath) => {
  try {
    if (!imagePath || typeof imagePath !== 'string') return '/images/logo.png';
    if (imagePath.startsWith('http')) return imagePath;
    
    const normalizedPath = imagePath.replace(/\\/g, '/');
    
    // In dev, use relative path so Vite proxy on 5173 serves /uploads
    if (import.meta.env.DEV) {
      const ensured = normalizedPath.startsWith('/') ? normalizedPath : `/${normalizedPath}`;
      return ensured;
    }
    
    // In prod, fall back to API_URL
    return `${API_URL}/${normalizedPath}`;
  } catch {
    return '/images/logo.png';
  }
};

/**
 * Handle image load errors by setting a fallback
 * @param {Event} e - The error event
 */
export const handleImageError = (e) => {
  if (!e?.currentTarget) return;
  e.currentTarget.onerror = null;
  e.currentTarget.src = '/images/logo.png';
};
