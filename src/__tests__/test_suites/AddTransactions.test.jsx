import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import AccountContainer from "../../components/AccountContainer";

const initial = [
  { id: 1, date: "2019-12-01", description: "Paycheck", category: "Income", amount: 1000 },
];

describe("Add Transactions", () => {
  beforeEach(() => {
    vi.spyOn(global, "fetch")
      // 1) initial GET /transactions
      .mockResolvedValueOnce({
        ok: true,
        json: async () => initial,
      })
      // 2) POST /transactions
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          id: 999,
          date: "2019-12-05",
          description: "Coffee",
          category: "Food",
          amount: -3.5,
        }),
      });
  });

  afterEach(() => vi.restoreAllMocks());

  it("adds a new transaction when form is submitted (no component changes)", async () => {
    const { container } = render(<AccountContainer />);

    // wait for existing row
    await screen.findByText("Paycheck");

    // grab inputs from DOM (component has no labels)
    const dateInput = container.querySelector('input[name="date"]');
    const descInput = screen.getByPlaceholderText(/Description/i);
    const catInput  = screen.getByPlaceholderText(/Category/i);
    const amtInput  = screen.getByPlaceholderText(/Amount/i);

    // set values
    fireEvent.change(dateInput, { target: { value: "2019-12-05" } });
    fireEvent.change(descInput, { target: { value: "Coffee" } });
    fireEvent.change(catInput,  { target: { value: "Food" } });
    fireEvent.change(amtInput,  { target: { value: "-3.50" } });

    // JSDOM quirk: the <form> doesn't expose inputs as properties.
    // The component reads e.target.date/description/category/amount,
    // so attach those properties manually before submitting.
    const form = container.querySelector("form");
    form.date = dateInput;
    form.description = descInput;
    form.category = catInput;
    form.amount = amtInput;

    // submit the form (so event.target === form)
    fireEvent.submit(form);

    // assert POST call
    const postCall = global.fetch.mock.calls[1]; // second fetch is POST
    expect(postCall[0]).toMatch(/\/transactions$/);
    expect(postCall[1].method).toBe("POST");
    const body = JSON.parse(postCall[1].body);
    expect(body).toMatchObject({
      date: "2019-12-05",
      description: "Coffee",
      category: "Food",
      amount: "-3.50", // form sends string values
    });

    // new row from mocked POST response
    await screen.findByText("Coffee");
    expect(screen.getByText("Food")).toBeInTheDocument();
    expect(screen.getByText("-3.5")).toBeInTheDocument();
  });
});
