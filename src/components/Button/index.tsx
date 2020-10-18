import React, {
  PropsWithChildren,
  CSSProperties,
  forwardRef,
  ForwardRefRenderFunction,
  useEffect,
} from "react";
import styled, { css } from "styled-components";

import {
  colors,
  textColorByTheme,
  getRGBA,
  lightenDarkenColor,
  smartGrayColor,
  isDark,
} from "../../utils/theme";

import Icon, { IconType } from "../Icon";

export type ButtonProps = PropsWithChildren<{
  icon?: IconType;
  iconLeft?: IconType;
  iconRight?: IconType;
  theme?: "light" | "dark" | "accent" | "current" | "gray" | "dangerous";
  view?: "pseudo" | "action";
  size?: "s" | "m" | "l" | "xl" | "xxl" | "xxxl";
  onClick?: () => void;
  disabled?: boolean;
  shadow?: boolean;
  title?: string;
  style?: CSSProperties;
  className?: string;
  keyListener?: string;
  type?: "button" | "submit" | "reset";
}>;

const sizeMap = {
  s: {
    iconSize: 34,
    fontSize: 16,
    padding: 4,
  },
  m: {
    iconSize: 16,
    fontSize: 14,
    padding: 7,
  },
  l: {
    iconSize: 37,
    fontSize: 20,
    padding: 10,
  },
  xl: {
    iconSize: 40,
    fontSize: 20,
    padding: 14,
  },
  xxl: {
    iconSize: 48,
    fontSize: 26,
    padding: 20,
  },
  xxxl: {
    iconSize: 48,
    fontSize: 26,
    padding: 20,
  },
};

const bgColorMap: {
  [key in Exclude<ButtonProps["theme"], undefined>]: string;
} = {
  light: colors.light,
  dark: colors.dark,
  dangerous: colors.lightRed,
  accent: colors.blue,
  current: colors.light,
  gray: colors.gray1,
};

const themeStylesMap: {
  [key in Exclude<ButtonProps["theme"], undefined>]: any;
} = {
  light: {},
  dangerous: {},
  dark: {},
  accent: {},
  current: {},
  gray: {
    boxShadow: "none",
    background: bgColorMap.gray,
    color: colors.gray2,
  },
};

type StyledButtonProps = {
  bgColor: string;
  color: string;
  padding: number;
  fontSize: number;
  disabled?: boolean;
  shadow?: boolean;
  minHeight?: number;
  borderWidth?: number;
  type?: "button" | "submit" | "reset";
  size?: ButtonProps["size"];
};

const BORDER_WIDTH = 3;

const StyledButton = styled.button<StyledButtonProps>`
  position: relative;
  background: none;
  border: none;
  padding: ${({ padding }) => padding}px;
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ color }) => color};
  border: ${({ color, borderWidth }) =>
    `${borderWidth && borderWidth > 0 ? borderWidth : BORDER_WIDTH}px solid ${
      borderWidth && borderWidth > 0 ? color : "transparent"
    }`};
  border-radius: ${({ size }) =>
    size === "xxl" || size === "xxxl" ? 16 : 12}px;
  display: inline-flex;
  vertical-align: top;
  align-items: center;
  font-weight: 600;
  font-size: ${({ fontSize }) => fontSize}px;
  min-height: ${({ minHeight }) => minHeight || 48}px;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "all")};
  transition: 0.2s ease-out;
  ${({ shadow, bgColor }) =>
    shadow &&
    css`
      box-shadow: ${isDark(bgColor)
        ? `0px 16px 32px ${getRGBA(bgColor, 0.1)}`
        : `8px 24px 42px rgba(0, 0, 0, 0.22)`};
    `}
  outline: none;
  &:hover {
    border: ${({ color, borderWidth }) =>
      `${borderWidth && borderWidth > 0 ? borderWidth : BORDER_WIDTH}px solid ${
        borderWidth && borderWidth > 0
          ? lightenDarkenColor(color, 20)
          : "transparent"
      }`};
    background-color: ${({ bgColor }) => lightenDarkenColor(bgColor, -10)};
    /* box-shadow: ${({ bgColor }) =>
      isDark(bgColor)
        ? `0px 16px 32px ${getRGBA(bgColor, 0.3)}`
        : `8px 24px 42px rgba(0, 0, 0, 0.32)`}; */
  }
  &:focus {
    ${({ bgColor, borderWidth }) =>
      smartGrayColor(bgColor) != bgColor &&
      css`
        border: ${`${
          borderWidth && borderWidth > 0 ? borderWidth : BORDER_WIDTH
        }px solid ${smartGrayColor(bgColor)}`};
      `}
    background-color: ${({ bgColor }) => lightenDarkenColor(bgColor, -10)};
  }
`;

const coloredIcons: IconType[] = [];

const Divider = styled.hr<{ color: string }>`
  border: none;
  /* TODO под size редачить */
  height: 24px;
  width: 1px;
  background-color: ${({ color }) => color};
  margin: 0 6px;
  opacity: 0.2;
`;

const ButtonEl: ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (
  props: ButtonProps,
  ref
) => {
  const {
    style,
    className,
    keyListener,
    onClick,
    theme,
    disabled,
    type,
  } = props;
  let bgColor = colors.light;
  let color = textColorByTheme(theme);
  const defaultSizes = sizeMap.m;
  let padding = defaultSizes.padding;
  let fontSize = defaultSizes.fontSize;
  let iconSize = defaultSizes.iconSize;
  let border = 0;
  let themeStyles = themeStylesMap[theme];
  if (theme) {
    bgColor = bgColorMap[theme];
  }
  if (props.view === "pseudo") {
    color = bgColor;
    bgColor = "transparent";
    border = BORDER_WIDTH;
  }
  if (props.size) {
    padding = sizeMap[props.size].padding;
    fontSize = sizeMap[props.size].fontSize;
    iconSize = sizeMap[props.size].iconSize;
  }
  const hasContent = !!props.children;

  useEffect(() => {
    if (keyListener && onClick) {
      const onKeyUp = (event: KeyboardEvent) => {
        if (
          event.code === keyListener &&
          !disabled &&
          // @ts-ignore
          (event.target.nodeName !== "INPUT" ||
            keyListener === "ArrowRight" ||
            keyListener === "ArrowLeft")
        ) {
          event.preventDefault();
          onClick();
        }
      };
      window.addEventListener("keydown", onKeyUp);
      return () => {
        window.removeEventListener("keydown", onKeyUp);
      };
    }
  }, [onClick, keyListener]);

  return (
    <StyledButton
      borderWidth={border}
      bgColor={bgColor}
      color={color}
      padding={padding}
      fontSize={fontSize}
      onClick={onClick}
      disabled={props.disabled}
      shadow={props.shadow}
      title={props.title}
      style={style || themeStyles}
      className={className}
      ref={ref}
      size={props.size as any}
      type={type}
      minHeight={(3 + padding) * 2 + iconSize}
    >
      {props.iconLeft && (
        <>
          <Icon
            size={iconSize}
            glyph={props.iconLeft as any}
            color={color}
            isColored={coloredIcons.includes(props.iconLeft)}
          />
          {/* {(hasContent || props.iconRight) && <Divider color={color} />} */}
        </>
      )}
      {hasContent && (
        <span style={{ padding: "0 10px" }}>{props.children}</span>
      )}
      {(props.icon || props.iconRight) && (
        <>
          {/* {hasContent && <Divider color={color} />} */}
          <Icon
            size={iconSize}
            glyph={(props.icon || props.iconRight) as any}
            color={color}
            isColored={coloredIcons.includes(
              (props.icon || props.iconRight) as any
            )}
          />
        </>
      )}
    </StyledButton>
  );
};

export default forwardRef(ButtonEl);
