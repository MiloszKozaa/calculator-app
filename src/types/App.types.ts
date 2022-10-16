export type NavTypes = {
  darkMode: any;
};

export type NumberButtonTypes = {
  digit: string;
  darkMode?: boolean;
  dispatch: ({}: {}) => void;
};

export type OperationButtonTypes = {
  operation: string;
  darkMode?: boolean;
  dispatch: ({}: {}) => void;
  special?: boolean;
  onClick?: () => void;
};

export type ActionButtonTypes = {
  name: string;
  darkMode?: boolean;
  special?: boolean;
  isCopied?: boolean;
  onClick: () => void;
};

export type LightModeButtonTypes = {
  darkMode?: boolean;
  onClick: () => void;
};

export type ResultTypes = {
  result?: string;
};

export type PreviewTypes = {
  preview?: string;
  operation?: string;
};
