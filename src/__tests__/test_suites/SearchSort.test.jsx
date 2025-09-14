import { describe, it, expect, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../components/App"; // <-- fixed path

const initialTransactions = [
  { id: "1", date: "2019-12-01", description: "Paycheck from Bob's Burgers", category: "Income", amount: 1000 },
  { id: "6", date: "2019-12-06", description: "Chipotle", category: "Food", amount: -17.59 },
  { id: "10", date: "2019-12-16", description: "Tickets, Flatiron Multiplex Cinemas", category: "Entertainment", amount: -24 },
];

describe("Search & Sort", () => {
  it("SEARCH: typing filters visible rows by description (case-insensitive)", async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: true, status: 200, json: async () => initialTransactions });

    const user = userEvent.setup();
    render(<App />);

    expect(await screen.findByText("Paycheck from Bob's Burgers")).toBeInTheDocument();

    const input = screen.getByPlaceholderText(/search your recent transactions/i);
    await user.type(input, "cHiP");

    expect(screen.getByText("Chipotle")).toBeInTheDocument();
    expect(screen.queryByText("Paycheck from Bob's Burgers")).not.toBeInTheDocument();
    expect(screen.queryByText("Tickets, Flatiron Multiplex Cinemas")).not.toBeInTheDocument();
  });

  it("SORT: selecting Category reorders rows A→Z by category", async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: true, status: 200, json: async () => initialTransactions });

    const user = userEvent.setup();
    render(<App />);

    expect(await screen.findByText("Paycheck from Bob's Burgers")).toBeInTheDocument();

    const select = screen.getByRole("combobox");
    await user.selectOptions(select, "category");

    const rows = screen.getAllByRole("row");
    const firstDataCells = within(rows[1]).getAllByRole("cell");
    expect(firstDataCells[2]).toHaveTextContent("Entertainment");
  });
});