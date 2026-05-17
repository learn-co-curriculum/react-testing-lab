import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../components/App";
import "@testing-library/jest-dom";
import { vi } from "vitest";

global.fetch = vi.fn((url, options) => {
  if (!options) {
    return Promise.resolve({
      json: () =>
        Promise.resolve([
          {
            id: 1,
            date: "2024-01-01",
            description: "Salary",
            category: "Income",
            amount: 1000,
          },
        ]),
    });
  }

  return Promise.resolve({
    json: () =>
      Promise.resolve({
        id: 2,
        ...JSON.parse(options.body),
      }),
  });
});

describe("Add Transaction", () => {
  test("adds transaction", async () => {
    render(<App />);

    const inputs = screen.getAllByRole("textbox");

    const description = inputs[0];
    const category = inputs[1];

    const amount = screen.getByPlaceholderText("Amount");

    const button = screen.getByText(/add transaction/i);

    await userEvent.type(description, "Test Item");
    await userEvent.type(category, "Food");
    await userEvent.type(amount, "100");

    await userEvent.click(button);

    expect(await screen.findByText("Test Item")).toBeInTheDocument();
  });
});