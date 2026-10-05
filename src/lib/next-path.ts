export function safeNextPath(value: string | undefined, fallback = '/') {
  if (!value) return fallback;
  if (!value.startsWith('/') || value.startsWith('//') || value.includes('\\') || value.includes('://')) {
    return fallback;
  }
  return value;
}
