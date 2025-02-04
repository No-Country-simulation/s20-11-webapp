export function hexToRgbString(hex, alpha = 1) {
  if (typeof hex !== "string") {
    throw new Error("Input must be a string.");
  }

  hex = hex.trim().replace(/^#/, "");

  if (![3, 6].includes(hex.length)) {
    throw new Error("Invalid HEX color format");
  }

  let r, g, b;

  if (hex.length === 3) {
    r = parseInt(hex[0] + hex[0], 16);
    g = parseInt(hex[1] + hex[1], 16);
    b = parseInt(hex[2] + hex[2], 16);
  } else {
    r = parseInt(hex.slice(0, 2), 16);
    g = parseInt(hex.slice(2, 4), 16);
    b = parseInt(hex.slice(4, 6), 16);
  }

  if (isNaN(r) || isNaN(g) || isNaN(b)) {
    throw new Error("Invalid HEX color format");
  }

  return alpha < 1 ? `rgba(${r}, ${g}, ${b}, ${alpha})` : `rgb(${r}, ${g}, ${b})`;
}
