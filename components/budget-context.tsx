"use client";

import { createContext, useContext, useState } from "react";

interface BudgetContextValue {
  budget: number;
  setBudget: (n: number) => void;
}

const BudgetContext = createContext<BudgetContextValue>({
  budget: 2500000,
  setBudget: () => {},
});

export function BudgetProvider({ children }: { children: React.ReactNode }) {
  const [budget, setBudget] = useState(2500000);
  return (
    <BudgetContext.Provider value={{ budget, setBudget }}>
      {children}
    </BudgetContext.Provider>
  );
}

export function useBudget() {
  return useContext(BudgetContext);
}
