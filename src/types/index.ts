export type CategoryOption = {
  id: string;
  label: string;
  value: string;
};

export type ButtonVariant = "outlined" | "contained" | "text";
export type ButtonMode = "info" | "warning" | "error";

export type ActionButtonType = {
  label: string;
  mode?: ButtonMode;
  variant?: ButtonVariant;
  onClick: () => void;
  startIcon?: React.ReactNode;
};
export type EntryContext = {
  type: string;
  onAddEntry: () => void;
  onEditEntry: () => void;
  showEntryDetails: (entryId: string) => void;
  isEntryLoaded: boolean;
  entries: any;
  activeEntry: any;
  onDeleteEntry: any;
};
