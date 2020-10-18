import { ButtonProps } from "../components/Button";

export const colors = {
  white: '#FFFFFF',
  black: '#000000',
  dark: '#333333',
  light: '#F7F8F9',
  light2: '#E9EEF3',
  blue: '#2F80ED',
  orange: '#F2924C',
  red: '#EB5757',
  yellow: '#F2C94C',
  green: '#27AE60',
  brown: '#8E6D4E',
  gray6 : '#666666',
  gray4 : '#989898',
  gray2 : '#D5D5D5',
  gray1 : '#D5D5D5',
  lightBlue: '#E8F2FA',
  lightRed: '#FAE8E8',
  lightOrange: '#FAF3E8',
  lightGreen: '#E9FAE8',
};

export const shadows = {
  shadow3: '0px 4px 28px rgba(52, 58, 69, 0.1)',
}

export function lightenDarkenColor(hex, amt) {
  var col = hex.replace('#', '');
  if (col == hex) return hex;
  var num = parseInt(col, 16);
  var r = (num >> 16) + amt;
  var g = (num & 0x0000ff) + amt;
  var b = ((num >> 8) & 0x00ff) + amt;
  if (r > 255) r = 255;
  if (g > 255) g = 255;
  if (b > 255) b = 255;
  if (r < 0) r = 0;
  if (g < 0) g = 0;
  if (b < 0) b = 0;
  var newColor = g | (b << 8) | (r << 16);
  return `#${newColor.toString(16)}`;
}

// eslint-disable-next-line import/no-unused-modules
export function smartColor(hex, amt) {
  var col = hex.replace('#', '');
  var num = parseInt(col, 16);
  var r = num >> 16;
  var b = (num >> 8) & 0x00ff;
  var g = num & 0x0000ff;
  var sAmt = (r + g + b) / 3 >= 128 ? amt : -amt;
  var minAmt = sAmt;
  if (r + sAmt > 255) if (r + sAmt < minAmt) minAmt = r + minAmt;
  if (g + sAmt > 255) if (g + sAmt < minAmt) minAmt = g + minAmt;
  if (b + sAmt > 255) if (b + sAmt < minAmt) minAmt = b + minAmt;
  var newColor = (g + minAmt) | ((b + minAmt) << 8) | ((r + minAmt) << 16);
  return `#${newColor.toString(16)}`;
}

export function isDark(hex) {
  var col = hex.replace('#', '');
  var num = parseInt(col, 16);
  var r = num >> 16;
  var b = (num >> 8) & 0x00ff;
  var g = num & 0x0000ff;
  return (r + g + b) / 3 < 128;
}

export function getRGBA(hex, opacity) {
  var col = hex.replace('#', '');
  var num = parseInt(col, 16);
  var r = num >> 16;
  var b = (num >> 8) & 0x00ff;
  var g = num & 0x0000ff;
  return `rgba(${r}, ${b}, ${g}, ${opacity})`;
}

export function smartGrayColor(hex) {
  var col = hex.replace('#', '');
  if (col == hex) return hex;
  var num = parseInt(col, 16);
  var r = num >> 16;
  var b = (num >> 8) & 0x00ff;
  var g = num & 0x0000ff;
  return (r + g + b) / 3 >= 128
    ? 'rgba(0, 0, 0, 0.1)'
    : 'rgba(255, 255, 255, 0.2)';
}

export const textColorByTheme = (theme: ButtonProps['theme']) => {
  let color = colors.dark;
  if (theme === 'dark') {
    color = colors.dark;
  } else if (['accent', 'current'].includes(theme as string)) {
    color = colors.white;
  }
  return color;
};
