"use client";

import React from "react";
import type { Expense } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/utils";

export function ExpenseTable({ expenses, onDelete }: { expenses: Expense[]; onDelete: (id: string) => void }) {
  return (
    <div>
      <div className="row" style={{ justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <div className="badge">{expenses.length} items</div>
      </div>
      <div style={{ overflowX: "auto" }}>
        <table className="table" role="table" aria-label="Expenses">
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Description</th>
              <th style={{ textAlign: "right" }}>Amount</th>
              <th style={{ width: 1 }}></th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((e) => (
              <tr key={e.id}>
                <td>{formatDate(e.date)}</td>
                <td><span className="badge">{e.category}</span></td>
                <td>{e.description}</td>
                <td style={{ textAlign: "right", fontWeight: 600 }}>{formatCurrency(e.amount)}</td>
                <td>
                  <button className="button danger" onClick={() => onDelete(e.id)}>Delete</button>
                </td>
              </tr>
            ))}
            {expenses.length === 0 && (
              <tr>
                <td colSpan={5} style={{ color: "var(--muted)", textAlign: "center", padding: 20 }}>No expenses found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
