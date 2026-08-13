import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, test, expect, beforeEach, afterEach, vi } from "vitest";
import App from "../../components/App";

const mockTransactions = [
  { id: 1, date: "2026-08-01", description: "Coffee Shop", category: "Food", amount: "4.50" },
];

describe("Display Transactions Test", () => {
  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({ json: () => Promise.resolve(mockTransactions) })
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("displays transactions on startup", async () => {
    render(<App />);
    expect(global.fetch).toHaveBeenCalledWith("http://localhost:6001/transactions");
    expect(await screen.findByText("Coffee Shop")).toBeInTheDocument();
  });
});