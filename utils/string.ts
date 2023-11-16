export function stringToColorHex(value: string): string {
  let hex = "";

  for (const char of value.substring(0, 3)) {
    hex += char.charCodeAt(0).toString(16);
  }

  return `#${hex}`;
}
