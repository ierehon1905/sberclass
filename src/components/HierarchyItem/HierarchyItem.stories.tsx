import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { HierarchyItem } from ".";

export default {
  title: "Components/HierarchyItem",
  component: HierarchyItem,
} as Meta;

export const Normal = () => (
  <HierarchyItem title="Модуль Шмодуль" id="123" type="module" />
);

export const ToggleOff = () => (
  <HierarchyItem title="Модуль Шмодуль" id="123" type="module" hasToggle />
);

export const ToggleOn = () => (
  <HierarchyItem
    title="Модуль Шмодуль"
    id="123"
    type="module"
    hasToggle
    isToggled
  />
);
