"use client";

import React from "react";
import type { FilterState } from "@/lib/store";

export function Filters({ filter, onChange, onClear }: { filter: FilterState; onChange: (f: Partial<FilterState>) => void; onClear: () => void }) {
  return (
    <form className="row" style={{ gap: 8 }} onSubmit={(e) => e.preventDefault()}>
      <div style={{ minWidth: 140, flex: 1 }}>
        <label style={{ display: "block", fontSize: 12, color: "var(--muted)", marginBottom: 6 }}>Search</label>
        <input className="input" placeholder="Search description" value={filter.query ?? ""} onChange={(e) => onChange({ query: e.target.value })} />
      </div>
      <div style={{ minWidth: 140 }}>
        <label style={{ display: "block", fontSize: 12, color: "var(--muted)", marginBottom: 6 }}>Category</label>
        <input className="input" placeholder="All" value={filter.category ?? ""} onChange={(e) => onChange({ category: e.target.value || undefined })} />
      </div>
      <div style={{ minWidth: 140 }}>
        <label style={{ display: "block", fontSize: 12, color: "var(--muted)", marginBottom: 6 }}>From</label>
        <input className="input" type="date" value={filter.startDate ?? ""} onChange={(e) => onChange({ startDate: e.target.value || undefined })} />
      </div>
      <div style={{ minWidth: 140 }}>
        <label style={{ display: "block", fontSize: 12, color: "var(--muted)", marginBottom: 6 }}>To</label>
        <input className="input" type="date" value={filter.endDate ?? ""} onChange={(e) => onChange({ endDate: e.target.value || undefined })} />
      </div>
      <div>
        <button className="button secondary" type="button" onClick={onClear}>Clear</button>
      </div>
    </form>
  );
}
