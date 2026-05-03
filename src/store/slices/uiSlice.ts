import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ExpenseFilters {
  month: string; // YYYY-MM
  search: string;
  category: string;
  paymentMethod: string;
  sortBy: "date" | "amount";
  sortOrder: "asc" | "desc";
}

export interface UiState {
  expenseFilters: ExpenseFilters;
  isAddExpenseModalOpen: boolean;
  isEditExpenseModalOpen: boolean;
  editingExpenseId: string | null;
  isDeleteExpenseModalOpen: boolean;
  deletingExpenseId: string | null;
}

const initialState: UiState = {
  expenseFilters: {
    month: new Date().toISOString().slice(0, 7), // YYYY-MM
    search: "",
    category: "",
    paymentMethod: "",
    sortBy: "date",
    sortOrder: "desc",
  },
  isAddExpenseModalOpen: false,
  isEditExpenseModalOpen: false,
  editingExpenseId: null,
  isDeleteExpenseModalOpen: false,
  deletingExpenseId: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setExpenseFilters: (state, action: PayloadAction<Partial<ExpenseFilters>>) => {
      state.expenseFilters = { ...state.expenseFilters, ...action.payload };
    },
    openAddExpenseModal: (state) => {
      state.isAddExpenseModalOpen = true;
    },
    closeAddExpenseModal: (state) => {
      state.isAddExpenseModalOpen = false;
    },
    openEditExpenseModal: (state, action: PayloadAction<string>) => {
      state.isEditExpenseModalOpen = true;
      state.editingExpenseId = action.payload;
    },
    closeEditExpenseModal: (state) => {
      state.isEditExpenseModalOpen = false;
      state.editingExpenseId = null;
    },
    openDeleteExpenseModal: (state, action: PayloadAction<string>) => {
      state.isDeleteExpenseModalOpen = true;
      state.deletingExpenseId = action.payload;
    },
    closeDeleteExpenseModal: (state) => {
      state.isDeleteExpenseModalOpen = false;
      state.deletingExpenseId = null;
    },
  },
});

export const {
  setExpenseFilters,
  openAddExpenseModal,
  closeAddExpenseModal,
  openEditExpenseModal,
  closeEditExpenseModal,
  openDeleteExpenseModal,
  closeDeleteExpenseModal,
} = uiSlice.actions;

export default uiSlice.reducer;