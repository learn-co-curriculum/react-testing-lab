import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import AccountContainer from "../../components/AccountContainer";

const mockRows = [
  { id: 1, date: "2019-12-01", description: "Paycheck", category: "Income", amount: 1000 },
  { id: 2, date: "2019-12-02", description: "Chipotle", category: "Food", amount: -10.55 },
];

describe("Display Transactions", () => {
  beforeEach(() => {
    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: async () => mockRows,
    });
  });

  afterEach(() => vi.restoreAllMocks());

  it("renders transactions on startup", async () => {
    render(<AccountContainer />);

    // table header by role (avoids collision with <option> "Description")
    expect(
      screen.getByRole("columnheader", { name: /description/i })
    ).toBeInTheDocument();

    // wait for rows after fetch resolves (findBy* avoids act() warning)
    await screen.findByText("Paycheck");
    expect(screen.getByText("Chipotle")).toBeInTheDocument();
    expect(screen.getByText("Income")).toBeInTheDocument();
    expect(screen.getByText("-10.55")).toBeInTheDocument();
  });
});  
