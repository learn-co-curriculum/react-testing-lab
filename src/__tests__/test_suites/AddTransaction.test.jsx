import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, test, expect, beforeEach, afterEach, vi } from "vitest";
import App from "../../components/App";

const mockTransactions = [
  { id: 1, date: "2026-08-01", description: "Coffee Shop", category: "Food", amount: "4.50" },
];

describe("Add transactions", () => {
  beforeEach(() => {
    global.fetch = vi.fn((url, options) => {
      if (options?.method === "POST") {
        return Promise.resolve({
          json: () => Promise.resolve({ id: 2, date: "2026-08-10", description: "Groceries", category: "Food", amount: "85.50" }),
        });
      }
      return Promise.resolve({ json: () => Promise.resolve(mockTransactions) });
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("submits POST request and displays new transaction on frontend", async () => {
    render(<App />);
    await screen.findByText("Coffee Shop");

    fireEvent.change(screen.getByPlaceholderText("Description"), { target: { value: "Groceries" } });
    fireEvent.change(screen.getByPlaceholderText("Category"), { target: { value: "Food" } });
    fireEvent.change(screen.getByPlaceholderText("Amount"), { target: { value: "85.50" } });
    
    fireEvent.click(screen.getByRole("button", { name: /Add Transaction/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:6001/transactions",
        expect.objectContaining({ method: "POST" })
      );
    });

    expect(await screen.findByText("Groceries")).toBeInTheDocument();
  });
});