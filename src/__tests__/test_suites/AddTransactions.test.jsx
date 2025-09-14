import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../components/App";

const initialTransactions = [
  { id: "1", date: "2019-12-01", description: "Paycheck from Bob's Burgers", category: "Income", amount: 1000 },
  { id: "6", date: "2019-12-06", description: "Chipotle", category: "Food", amount: -17.59 },
];

describe("Add Transactions", () => {
  it("adds a new transaction and calls POST", async () => {
    const created = { id: "13", date: "2020-01-01", description: "Coffee R Us", category: "Food", amount: -4.5 };

    global.fetch = vi
      .fn()
      .mockResolvedValueOnce({ ok: true, status: 200, json: async () => initialTransactions }) // GET
      .mockResolvedValueOnce({ ok: true, status: 201, json: async () => created }); // POST

    const user = userEvent.setup();
    const { container } = render(<App />);

    expect(await screen.findByText("Paycheck from Bob's Burgers")).toBeInTheDocument();

    const dateInput = container.querySelector('input[name="date"]');
    await user.type(dateInput, "2020-01-01");
    await user.type(screen.getByPlaceholderText("Description"), "Coffee R Us");
    await user.type(screen.getByPlaceholderText("Category"), "Food");
    await user.type(screen.getByPlaceholderText("Amount"), "-4.50");

    await user.click(screen.getByRole("button", { name: /add transaction/i }));

    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(global.fetch).toHaveBeenNthCalledWith(
      2,
      "http://localhost:6001/transactions",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: "2020-01-01", description: "Coffee R Us", category: "Food", amount: "-4.50" }),
      })
    );

    expect(await screen.findByText("Coffee R Us")).toBeInTheDocument();
  });
});