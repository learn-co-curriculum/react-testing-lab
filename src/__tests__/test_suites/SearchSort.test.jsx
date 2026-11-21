import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../../components/App";

const sampleTransactions = [
  { id: "1", date: "2019-12-01", description: "Paycheck from Bob's Burgers", category: "Income", amount: 1000 },
  { id: "2", date: "2019-12-01", description: "Chipotle", category: "Food", amount: -17.59 },
  { id: "3", date: "2019-12-02", description: "Lyft Ride", category: "Transportation", amount: -13.25 },
];

describe("Search and sort transactions", () => {
  it("filters the list when the search box changes", async () => {
    global.setFetchResponse(sampleTransactions);
    render(<App />);

    // Everything shows up before searching
    expect(await screen.findByText("Chipotle")).toBeInTheDocument();
    expect(screen.getByText("Lyft Ride")).toBeInTheDocument();

    // Typing in the search box triggers a change event
    fireEvent.change(screen.getByPlaceholderText("Search your Recent Transactions"), {
      target: { value: "chip" },
    });

    // The page updates: only the matching transaction remains
    expect(screen.getByText("Chipotle")).toBeInTheDocument();
    expect(screen.queryByText("Lyft Ride")).not.toBeInTheDocument();
  });

  it("reorders the list when the sort dropdown changes", async () => {
    global.setFetchResponse(sampleTransactions);
    render(<App />);
    await screen.findByText("Chipotle");

    // Row 0 is the header row, so the first transaction is row 1
    let rows = screen.getAllByRole("row");
    expect(rows[1]).toHaveTextContent("Paycheck from Bob's Burgers");

    // Choose "Category" in the dropdown (a change event)
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "category" },
    });

    // Alphabetically by category, Food comes first
    rows = screen.getAllByRole("row");
    expect(rows[1]).toHaveTextContent("Chipotle");
  });
});