"use client";

import React, { useMemo } from "react";
import type { Expense } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

export function Summary({ expenses }: { expenses: Expense[] }) {
  const { total, thisMonth, avg, byCategory } = useMemo(() => {
    const now = new Date();
    const monthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
    let sum = 0;
    let monthSum = 0;
    const categories: Record<string, number> = {};

    for (const e of expenses) {
      sum += e.amount;
      const key = e.date.slice(0, 7);
      if (key === monthKey) monthSum += e.amount;
      categories[e.category] = (categories[e.category] ?? 0) + e.amount;
    }
    const average = expenses.length ? sum / expenses.length : 0;
    return { total: sum, thisMonth: monthSum, avg: average, byCategory: categories };
  }, [expenses]);

  const maxCategory = useMemo(() => Math.max(1, ...Object.values(byCategory)), [byCategory]);

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div className="kpi">
        <div className="item">
          <div className="label">Total</div>
          <div className="value">{formatCurrency(total)}</div>
        </div>
        <div className="item">
          <div className="label">This Month</div>
          <div className="value">{formatCurrency(thisMonth)}</div>
        </div>
        <div className="item">
          <div className="label">Avg / Expense</div>
          <div className="value">{formatCurrency(avg)}</div>
        </div>
      </div>

      <div className="panel" style={{ padding: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <div style={{ fontWeight: 600 }}>By Category</div>
          <div className="badge">{Object.keys(byCategory).length} categories</div>
        </div>
        <div style={{ display: "grid", gap: 8 }}>
          {Object.entries(byCategory).sort((a,b) => b[1]-a[1]).map(([cat, amt]) => (
            <div key={cat}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <div>{cat}</div>
                <div style={{ color: "var(--muted)" }}>{formatCurrency(amt)}</div>
              </div>
              <div className="progress">
                <div className="bar" style={{ width: `${Math.round((amt / maxCategory) * 100)}%` }} />
              </div>
            </div>
          ))}
          {Object.keys(byCategory).length === 0 && (
            <div style={{ color: "var(--muted)", textAlign: "center", padding: 12 }}>No data yet</div>
          )}
        </div>
      </div>
    </div>
  );
}
