"use client";

import React from "react";
import { ExpenseForm } from "@/components/ExpenseForm";
import { ExpenseTable } from "@/components/ExpenseTable";
import { Summary } from "@/components/Summary";
import { Filters } from "@/components/Filters";
import { useExpenseStore } from "@/lib/store";

export default function Page() {
  const store = useExpenseStore();

  return (
    <div className="grid">
      <section className="panel card" aria-label="Add expense and filters">
        <div className="row" style={{ flexWrap: "wrap", alignItems: "flex-end" }}>
          <div style={{ flex: 2, minWidth: 260 }}>
            <ExpenseForm onAdd={store.addExpense} />
          </div>
          <div style={{ flex: 3, minWidth: 260 }}>
            <Filters filter={store.filter} onChange={store.setFilter} onClear={store.clearFilter} />
          </div>
        </div>
      </section>

      <section className="panel card" aria-label="Summary and categories">
        <Summary expenses={store.filteredExpenses} />
      </section>

      <section className="panel card" aria-label="Expense list">
        <ExpenseTable expenses={store.filteredExpenses} onDelete={store.deleteExpense} />
      </section>
    </div>
  );
}
