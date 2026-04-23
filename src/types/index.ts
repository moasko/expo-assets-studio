import { ReactNode } from 'react';

export type AssetType = 'icon' | 'splash' | 'adaptive-icon' | 'favicon';
export type Theme = 'light' | 'dark';
export type Device = 'ios' | 'android';

export interface TooltipProps {
  children: ReactNode;
  text: string;
  position?: 'right' | 'top' | 'bottom';
  className?: string;
}

export interface SectionTitleProps {
  children: ReactNode;
  className?: string;
}

export interface IconButtonProps {
  icon: any;
  onClick: () => void;
  active?: boolean;
  label?: string;
  tooltip?: string;
}

export interface Notification {
  message: string;
  type: 'success' | 'info';
}
