import React from "react";
import "../src/index.css";
import { addDecorator } from "@storybook/react";
import { ThemeProvider } from "styled-components";
import { colors } from "src/utils/theme.ts";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};

addDecorator((fn) => <ThemeProvider theme={colors}>{fn()}</ThemeProvider>);
