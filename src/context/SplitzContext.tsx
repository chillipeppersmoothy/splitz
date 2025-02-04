import React, { createContext, useState } from "react";
import { Expense, SplitzContextType } from "../Interfaces/Interface";

export const SplitzContext = createContext<SplitzContextType | undefined>(
  undefined
);

export function SplitzProvider({ children }: { children: React.ReactNode }) {
  const [names, setNames] = useState<string[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const addExpense = (expense: Omit<Expense, "id">) => {
    const newExpense = {
      ...expense,
      id: Math.random().toString(36).substr(2, 9),
    };
    setExpenses([...expenses, newExpense]);
  };

  const getTotalPerPerson = () => {
    const totals: Record<string, number> = {};
    names.forEach((name) => (totals[name] = 0));

    expenses.forEach((expense) => {
      const splitAmount = expense.amount / expense.splitBetween.length;
      expense.splitBetween.forEach((person) => {
        totals[person] = (totals[person] || 0) + splitAmount;
      });
    });

    return totals;
  };

  return (
    <SplitzContext.Provider
      value={{ names, setNames, expenses, addExpense, getTotalPerPerson }}
    >
      {children}
    </SplitzContext.Provider>
  );
}
