export const SIDE_BAR_MIN_WIDTH = 48;
export const SIDE_BAR_SHOW_TITLE_MIN_WIDTH = 80;

// App mode enum
export enum AppModeEnum {
  DARK = 'dark',
  LIGHT = 'light',
}

// Menu theme enum
export enum ThemeEnum {
  DARK = 'dark',
  LIGHT = 'light',
}

export enum ThemeMode {
  Light = 'light',
  Dark = 'dark',
}

// Page switching animation
export enum PageTransitionEnum {
  FADE = 'fade',
  FADE_SIDE = 'fade-slide',
  FADE_BOTTOM = 'fade-bottom',
  FADE_SCALE = 'fade-scale',
  ZOOM_FADE = 'zoom-fade',
  ZOOM_OUT = 'zoom-out',
}

// Permission mode
export enum PermissionModeEnum {
  // Route mapping
  MAPPING = 'MAPPING',
  // The back-end response
  BACKEND = 'BACKEND',
}

export enum BasicStatus {
  DISABLE,
  ENABLE,
}

export enum PermissionType {
  CATALOGUE,
  MENU,
  BUTTON,
}

export enum StorageEnum {
  Settings = 'settings',
}

export enum ThemeLayout {
  Vertical = 'vertical',
  Horizontal = 'horizontal',
  Mini = 'mini',
}

export enum ThemeColorPresets {
  Default = 'default',
  Cyan = 'cyan',
  Purple = 'purple',
  Blue = 'blue',
  Orange = 'orange',
  Red = 'red',
}

export enum MultiTabOperation {
  REFRESH = 'refresh',
  CLOSE = 'close',
  CLOSEOTHERS = 'closeOthers',
  CLOSEALL = 'closeAll',
  CLOSELEFT = 'closeLeft',
  CLOSERIGHT = 'closeRight',
}
