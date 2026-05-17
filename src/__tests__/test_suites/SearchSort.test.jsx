



import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import App from "../../components/App";

const mockTransactions = [
  {
    id: 1,
    date: "2024-01-01",
    description: "Salary",
    category: "Income",
    amount: 1000,
  },
  {
    id: 2,
    date: "2024-01-02",
    description: "Rent",
    category: "Housing",
    amount: 500,
  },
];

describe("Search and Sort", () => {
  it("filters transactions based on search input", async () => {
    vi.stubGlobal("fetch", vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockTransactions),
      })
    ));

    render(<App />);

    await screen.findByText("Salary");

    fireEvent.change(
      screen.getByPlaceholderText(/search/i),
      {
        target: { value: "Rent" },
      }
    );

    await waitFor(() => {
      expect(screen.getByText("Rent")).toBeInTheDocument();
      expect(screen.queryByText("Salary")).not.toBeInTheDocument();
    });
  });

  it("sorts transactions when dropdown changes", async () => {
    vi.stubGlobal("fetch", vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockTransactions),
      })
    ));

    render(<App />);

    await screen.findByText("Salary");

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "category" },
    });

    await waitFor(() => {
      expect(screen.getByText("Rent")).toBeInTheDocument();
    });
  });
});