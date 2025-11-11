export const metadata = {
  title: "Expense Tracker",
  description: "Minimalist expense tracking dashboard"
};

import "./globals.css";
import React from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <header className="header">
            <h1>Expense Tracker</h1>
          </header>
          <main>{children}</main>
          <footer className="footer">Built for minimal, fast tracking</footer>
        </div>
      </body>
    </html>
  );
}
