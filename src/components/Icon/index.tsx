import styled, { css } from 'styled-components';
import { colors } from '../../utils/theme';
import { mapping } from './assets';

// const mapping = require.context("images/icons", true, /\.svg$/);
export type IconType = keyof typeof mapping;

type IconProps = {
  glyph: IconType;
  color?: string;
  size?: number;
  isColored?: boolean;
};

const Icon = styled.div<IconProps>`
  width: ${({ size }) => size || 24}px;
  height: ${({ size }) => size || 24}px;
  ${({ glyph, color, isColored }) => {
    if (isColored) {
      return css`
        background-image: url(${mapping[glyph]});
        background-size: cover;
      `;
    }
    if(!color) color = colors.gray6;
    return css`
      background-color: ${color};
      mask: url(${mapping[glyph]});
    `;
  }};
  -webkit-mask-repeat-x: no-repeat;
  -webkit-mask-repeat-y: no-repeat;
  mask-repeat: no-repeat;
  mask-size: contain;
`;

export default Icon;
