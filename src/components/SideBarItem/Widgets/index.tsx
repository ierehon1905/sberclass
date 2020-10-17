import React from 'react';

import components from './components';

export interface TemplateParams {
  [key: string]: any;
}

export interface WidgetsState {
  activated: boolean;
}

export interface WidgetProps {
  type: keyof typeof components;
  data: TemplateParams;
}

export const Widget = ({
  type,
  data,
}: WidgetProps) => {
  const Component = components[type];

  return (
    <Component
      {...data}
    />
  );
};
