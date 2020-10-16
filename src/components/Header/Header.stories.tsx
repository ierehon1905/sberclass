import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Header } from ".";

export default {
  title: "Components/Header",
  component: Header,
} as Meta;

export const Normal = () => <Header>Далее</Header>;
