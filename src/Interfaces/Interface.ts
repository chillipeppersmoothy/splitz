export interface Expense {
  id: string;
  item: string;
  amount: number;
  splitBetween: string[];
}

export interface SplitzContextType {
  names: string[];
  setNames: (names: string[]) => void;
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, "id">) => void;
  getTotalPerPerson: () => Record<string, number>;
}
