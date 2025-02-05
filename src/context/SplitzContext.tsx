import React, { createContext, useState, useMemo, useCallback } from "react";
import { Expense, SplitzContextType } from "../Interfaces/Interface";

export const SplitzContext = createContext<SplitzContextType | undefined>(
  undefined
);

export function SplitzProvider({ children }: { children: React.ReactNode }) {
  const [names, setNames] = useState<string[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const getTotalPerPerson = useMemo(() => {
    const totals: Record<string, number> = {};
    names.forEach((name) => (totals[name] = 0));

    expenses.forEach((expense) => {
      const peopleCount = expense.splitBetween.length;
      const totalCents = Math.round(expense.amount * 100);
      const baseCents = Math.floor(totalCents / peopleCount);
      const remainder = totalCents - baseCents * peopleCount;

      expense.splitBetween.forEach((person) => {
        totals[person] = (totals[person] || 0) + baseCents / 100;
      });

      const shuffledPeople = [...expense.splitBetween].sort(
        () => Math.random() - 0.5
      );
      for (let i = 0; i < remainder; i++) {
        totals[shuffledPeople[i]] =
          Math.round((totals[shuffledPeople[i]] + 0.01) * 100) / 100;
      }
    });

    return totals;
  }, [expenses, names]);

  const getTotal = useMemo(() => {
    return expenses.reduce((acc, cur) => acc + cur.amount, 0);
  }, [expenses]);

  const addExpense = useCallback(
    (expense: Omit<Expense, "id">) => {
      const newExpense = {
        ...expense,
        id: Math.random().toString(36).substr(2, 9),
      };
      setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
    },
    [setExpenses]
  );

  const deleteExpense = useCallback(
    (id: string) => {
      setExpenses((prevExpenses) =>
        prevExpenses.filter((expense) => expense.id !== id)
      );
    },
    [setExpenses]
  );

  const editExpense = useCallback(
    (id: string, updatedExpense: Omit<Expense, "id">) => {
      setExpenses((prevExpenses) =>
        prevExpenses.map((expense) =>
          expense.id === id ? { ...updatedExpense, id } : expense
        )
      );
    },
    [setExpenses]
  );

  return (
    <SplitzContext.Provider
      value={{
        names,
        setNames,
        expenses,
        addExpense,
        deleteExpense,
        editExpense,
        getTotalPerPerson,
        getTotal,
      }}
    >
      {children}
    </SplitzContext.Provider>
  );
}
