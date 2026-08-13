import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, test, expect, beforeEach, afterEach, vi } from "vitest";
import App from "../../components/App";

const mockTransactions = [
  { id: 1, date: "2026-08-01", description: "Coffee Shop", category: "Food", amount: "4.50" },
  { id: 2, date: "2026-08-02", description: "Income", category: "Paycheck", amount: "1000.00" },
];

describe("Search Transactions and sort transactions", () => {
  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({ json: () => Promise.resolve(mockTransactions) })
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("updates page when search change event triggers", async () => {
    render(<App />);
    await screen.findByText("Coffee Shop");

    const searchInput = screen.getByPlaceholderText("Search your Recent Transactions");
    fireEvent.change(searchInput, { target: { value: "Coffee" } });

    expect(screen.getByText("Coffee Shop")).toBeInTheDocument();
    expect(screen.queryByText("Income")).not.toBeInTheDocument();
  });
});