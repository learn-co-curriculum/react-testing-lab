import { render, screen, fireEvent } from "@testing-library/react";
import { expect, it, describe, vi } from "vitest";
import TransactionsList from "./TransactionsList";
import AddTransactionForm from "./AddTransactionForm";

const mockData = [
  { id: 1, date: "2024-01-01", description: "Rent", category: "Bills", amount: 1000 }
];

describe("Banking Lab Requirements", () => {
  // Criterion 1: Test if transaction is displayed
  it("displays transactions correctly", () => {
    render(<TransactionsList transactions={mockData} />);
    expect(screen.getByText(/Rent/i)).toBeInTheDocument();
  });

  // Criterion 2: Test if search is functional
  it("filters transactions by search term", () => {
    render(<TransactionsList transactions={mockData} />);
    const input = screen.getByPlaceholderText(/Search/i);
    fireEvent.change(input, { target: { value: "Nonexistent" } });
    expect(screen.queryByText(/Rent/i)).not.toBeInTheDocument();
  });

  // Criterion 3: Test if new transaction is added
  it("calls onAdd when form is submitted", () => {
    const mockAdd = vi.fn();
    render(<AddTransactionForm onAdd={mockAdd} />);
    
    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText(/Description/i), { target: { value: "New", name: "description" } });
    
    // Click submit
    const btn = screen.getByRole("button", { name: /Add Transaction/i });
    fireEvent.click(btn);
    
    expect(mockAdd).toHaveBeenCalled();
  });
});