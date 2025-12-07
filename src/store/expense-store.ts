import { create } from 'zustand';

type Expense = {
  id: string;
  title: string;
  amount: number;
};

type ExpenseStore = {
  expenses: Expense[];
  setExpenses: (expenses: Expense[]) => void;
};

export const useExpenseStore = create<ExpenseStore>((set) => ({
  expenses: [],
  setExpenses: (expenses) => set({ expenses }),
}));

