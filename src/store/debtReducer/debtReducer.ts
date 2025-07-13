import { DebtState } from "@/types/debt";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface expenseState {
  isLoaded: boolean;
  debts: DebtState[];
}

const initialState: expenseState = {
  isLoaded: false,
  debts: [],
};
const debtSlice = createSlice({
  name: "debt",
  initialState,
  reducers: {
    loadDebts: (state, action: PayloadAction<DebtState[]>) => {
      return {
        ...state,
        isLoaded: true,
        debts: action.payload,
      };
    },
    addDebt: (state, action: PayloadAction<DebtState>) => {
      return {
        ...state,
        debts: [action.payload, ...state.debts],
      };
    },
    editDebt: (state, action: PayloadAction<DebtState>) => {
      const modifiedDebt = action.payload;
      return {
        ...state,
        debts: state.debts.map((expense: DebtState) => {
          if (expense.id !== modifiedDebt.id) return expense;
          return { ...expense, ...modifiedDebt };
        }),
      };
    },
    removeDebt: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        debts: state.debts.filter(
          (expense: DebtState) => expense.id !== action.payload
        ),
      };
    },
    resetDebt: () => {
      return initialState;
    },
  },
});

export const { loadDebts, addDebt, editDebt, removeDebt, resetDebt } =
  debtSlice.actions;

export default debtSlice.reducer;
