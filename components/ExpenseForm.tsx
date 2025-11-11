"use client";

import React, { useMemo, useState } from "react";
import type { Expense } from "@/lib/types";
import { CATEGORIES } from "@/lib/types";

export function ExpenseForm({ onAdd }: { onAdd: (expense: Expense) => void }) {
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const [date, setDate] = useState<string>(today);
  const [category, setCategory] = useState<string>(CATEGORIES[0]);
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [busy, setBusy] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsedAmount = Number(amount);
    if (!description.trim() || !Number.isFinite(parsedAmount) || parsedAmount <= 0) return;
    setBusy(true);
    const expense: Expense = {
      id: crypto.randomUUID(),
      date,
      category,
      description: description.trim(),
      amount: Math.round(parsedAmount * 100) / 100
    };
    onAdd(expense);
    setDescription("");
    setAmount("");
    setBusy(false);
  }

  return (
    <form onSubmit={handleSubmit} className="row" style={{ gap: 8 }}>
      <div style={{ minWidth: 130, flex: 0.9 }}>
        <label style={{ display: "block", fontSize: 12, color: "var(--muted)", marginBottom: 6 }}>Date</label>
        <input className="input" type="date" required value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <div style={{ minWidth: 150, flex: 1 }}>
        <label style={{ display: "block", fontSize: 12, color: "var(--muted)", marginBottom: 6 }}>Category</label>
        <select className="select" value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
      <div style={{ minWidth: 160, flex: 2 }}>
        <label style={{ display: "block", fontSize: 12, color: "var(--muted)", marginBottom: 6 }}>Description</label>
        <input className="input" placeholder="Coffee, groceries, subscription..." value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div style={{ minWidth: 120, flex: 0.9 }}>
        <label style={{ display: "block", fontSize: 12, color: "var(--muted)", marginBottom: 6 }}>Amount</label>
        <input className="input" type="number" step="0.01" min="0.01" required value={amount} onChange={(e) => setAmount(e.target.value)} />
      </div>
      <div>
        <button className="button" disabled={busy}>Add</button>
      </div>
    </form>
  );
}
