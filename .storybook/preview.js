import React from "react";
import "../src/index.css";
import { addDecorator } from "@storybook/react";
import { ThemeProvider } from "styled-components";
import theme from "../src/theme";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};

addDecorator((fn) => <ThemeProvider theme={theme}>{fn()}</ThemeProvider>);
