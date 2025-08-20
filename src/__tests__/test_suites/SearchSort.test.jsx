import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AccountContainer from "../../components/AccountContainer";

const data = [
  { id: 1, date: "2019-12-01", description: "Paycheck",  category: "Income",         amount: 1000 },
  { id: 2, date: "2019-12-02", description: "Chipotle",  category: "Food",           amount: -10.55 },
  { id: 3, date: "2019-12-03", description: "MetroCard", category: "Transportation", amount: -2.75 },
];

describe("Search & Sort controls (no component tweaks)", () => {
  beforeEach(() => {
    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: async () => data,
    });
  });
  afterEach(() => vi.restoreAllMocks());

  it("renders the search input and sort select with expected options", async () => {
    render(<AccountContainer />);

    // wait for initial data to ensure component mounted/fetched
    await screen.findByText("Paycheck");

    // search input exists (matches your placeholder text exactly)
    expect(
      screen.getByPlaceholderText(/Search your Recent Transactions/i)
    ).toBeInTheDocument();

    // sort select exists with Description & Category options
    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();
    expect(screen.getByRole("option", { name: /Description/i })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: /Category/i })).toBeInTheDocument();
  });

  it("filters rows when typing in the search box (matches description or category)", async () => {
    render(<AccountContainer />);
    await screen.findByText("Paycheck");

    const search = screen.getByPlaceholderText(/Search your Recent Transactions/i);
    await userEvent.clear(search);
    await userEvent.type(search, "chi"); // should match "Chipotle"

    expect(screen.getByText("Chipotle")).toBeInTheDocument();
    expect(screen.queryByText("Paycheck")).toBeNull();
    expect(screen.queryByText("MetroCard")).toBeNull();
  });

  it("sorts rows by Category when selected", async () => {
    render(<AccountContainer />);
    await screen.findByText("Paycheck");

    const select = screen.getByRole("combobox");
    await userEvent.selectOptions(select, "category");

    const rows = screen.getAllByRole("row").slice(1); // skip header
    const indexOfText = (txt) => rows.findIndex((r) => r.textContent.includes(txt));

    // After category sort (alphabetical): Food, Income, Transportation
    expect(indexOfText("Chipotle")).toBeLessThan(indexOfText("Paycheck"));
    expect(indexOfText("Paycheck")).toBeLessThan(indexOfText("MetroCard"));
  });
});
