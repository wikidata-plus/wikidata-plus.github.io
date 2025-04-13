function simpleHash(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0; // Convert to 32bit int
  }
  return Math.abs(hash);
}

function stringToHexColor(str: string) {
  const hash = simpleHash(str);
  const r = (hash >> 16) & 0xff;
  const g = (hash >> 8) & 0xff;
  const b = hash & 0xff;

  return `#${[r, g, b]
    .map(x => x.toString(16).padStart(2, '0'))
    .join('')}`
}

export function useColor() {
  return { stringToHexColor };
}