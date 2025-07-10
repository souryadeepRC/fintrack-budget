import { ExpenseState } from "@/types/expense";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface expenseState {
  isLoaded: boolean;
  expenses: ExpenseState[];
}

const initialState: expenseState = {
  isLoaded: false,
  expenses: [],
};
const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    loadExpenses: (state, action: PayloadAction<ExpenseState[]>) => {
      return {
        ...state,
        isLoaded: true,
        expenses: action.payload,
      };
    },
    addExpense: (state, action: PayloadAction<ExpenseState>) => {
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };
    },
    editExpense: (state, action: PayloadAction<ExpenseState>) => {
      const modifiedExpense = action.payload;
      return {
        ...state,
        expenses: state.expenses.map((expense: ExpenseState) => {
          if (expense.id !== modifiedExpense.id) return expense;
          return { ...expense, ...modifiedExpense };
        }),
      };
    },
    removeExpense: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        expenses: state.expenses.filter(
          (expense: ExpenseState) => expense.id !== action.payload
        ),
      };
    },
  },
});

export const { loadExpenses, addExpense, editExpense, removeExpense } =
  expenseSlice.actions;

export default expenseSlice.reducer;
