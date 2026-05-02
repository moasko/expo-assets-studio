import { ReactNode } from 'react';

export type AppMode = 'assets' | 'screenshots';
export type AssetType = 'icon' | 'splash' | 'adaptive-foreground' | 'adaptive-background' | 'monochrome' | 'notification' | 'favicon' | 'web-icons';
export type Theme = 'light' | 'dark';
export type Device = 'ios' | 'android' | 'web';
export type SplashResizeMode = 'contain' | 'cover' | 'native';
export type AndroidMask = 'circle' | 'squircle' | 'rounded-rect' | 'teardrop';

export interface ScreenshotConfig {
  id: string;
  title: string;
  subtitle: string;
  titleColor: string;
  subtitleColor: string;
  bgColor: string;
  bgGradient: string;
  deviceType: 'ios' | 'android';
  screenshotUrl: string | null;
  layout: 'top' | 'bottom' | 'left' | 'right' | 'center';
  fontSize: number;
  deviceScale: number;
  deviceRotation: number;
  deviceOffsetX: number;
  deviceOffsetY: number;
  showTitle: boolean;
  showSubtitle: boolean;
  fontFamily: string;
  bgImageUrl: string | null;
  statusTime: string;
  statusBattery: number;
  showStatusBar: boolean;
  showReflection: boolean;
  showShadow: boolean;
}



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

