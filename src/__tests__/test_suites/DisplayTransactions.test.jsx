import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../../components/App"; // <-- fixed path

const initialTransactions = [
  { id: "1", date: "2019-12-01", description: "Paycheck from Bob's Burgers", category: "Income", amount: 1000 },
  { id: "6", date: "2019-12-06", description: "Chipotle", category: "Food", amount: -17.59 },
  { id: "10", date: "2019-12-16", description: "Tickets, Flatiron Multiplex Cinemas", category: "Entertainment", amount: -24 },
];

describe("Display Transactions", () => {
  it("shows transactions on startup after fetch", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => initialTransactions,
    });

    render(<App />);

    expect(await screen.findByText("Paycheck from Bob's Burgers")).toBeInTheDocument();
    const rows = screen.getAllByRole("row");
    expect(rows.length).toBe(initialTransactions.length + 1);
    expect(screen.getByText("Chipotle")).toBeInTheDocument();
    expect(screen.getByText("Tickets, Flatiron Multiplex Cinemas")).toBeInTheDocument();
  });
});