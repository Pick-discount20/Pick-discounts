/**
 * Resolves static asset paths with the repository basePath for GitHub Pages static export
 */
export function getAssetPath(path: string): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  const basePath = '/Pick-discounts';
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  if (cleanPath.startsWith(basePath)) {
    return cleanPath;
  }
  return `${basePath}${cleanPath}`;
}
