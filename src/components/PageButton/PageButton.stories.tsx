import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { PageButton, PageButtonWithAnchor } from ".";

export default {
  title: "Components/Button",
  component: PageButton,
} as Meta;

export const Normal = () => <PageButton>Далее</PageButton>;
export const WithAnchor = () => (
  <PageButtonWithAnchor active >Далее</PageButtonWithAnchor>
);

export const WithAnchorDisabled = () => (
  <PageButtonWithAnchor active={false}>Далее</PageButtonWithAnchor>
);
