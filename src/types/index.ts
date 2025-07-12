import { DebtState } from "./debt";
import { ExpenseState } from "./expense";
import { NotificationState } from "./notification";

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
export type EntryState = Partial<ExpenseState | DebtState | NotificationState>;
type EntryActionType = "create" | "edit" | "delete" | "modify";
type EntrySideEffectAction = {
  isSuccess?: boolean;
  success?: () => void;
  error?: () => void;
};

type EntrySideEffect<K extends EntryActionType = EntryActionType> = Partial<{
  [Key in Lowercase<K>]: EntrySideEffectAction;
}>;

type EntryAction = Partial<{
  create: (entry: EntryState) => void;
  edit: (entry: EntryState) => void;
  modify: (entry: EntryState) => void;
  delete: (entryId: string) => void;
}>;

export type EntryContext = {
  type: string;
  navigation: {
    addEntry: () => void;
    editEntry: () => void;
    showAll: (entryId: string) => void;
  };
  isEntryLoaded: boolean;
  entries: EntryState[];
  activeEntry: EntryState | undefined;
  actions: EntryAction;
  sideEffects?: EntrySideEffect;
};
