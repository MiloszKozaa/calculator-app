export type LinkTypes = {
  link: string;
  linkTitle: string;
};

export type NumberButtonTypes = {
  digit: string;
  dispatch: ({}: {}) => void;
};

export type OperationButtonTypes = {
  operation: string;
  dispatch: ({}: {}) => void;
  special?: boolean;
};

export type ActionButtonTypes = {
  name: string;
  special?: boolean;
  onClick?: () => void;
};

export type ResultTypes = {
  result: string;
};

export type PreviewTypes = {
  preview?: string;
  operation?: string;
};
