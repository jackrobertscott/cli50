export function toKebabCase(str: string): string {
  // Step 1: Convert to lowercase
  str = str.toLowerCase();

  // Step 2: Replace spaces and underscores with hyphens
  str = str.replace(/[\s_]/g, "-");

  // Step 3: Remove all non-alphanumeric characters except hyphens
  str = str.replace(/[^a-z0-9-]/g, "");

  // Step 4: Replace multiple consecutive hyphens with a single hyphen
  str = str.replace(/-{2,}/g, "-");

  return str;
}
