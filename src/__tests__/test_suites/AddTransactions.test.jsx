


import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";

import { describe, it, expect, vi } from "vitest";
import App from "../../components/App";

describe("Add Transactions", () => {
  it("adds transaction and calls POST request", async () => {
    const fetchMock = vi.fn((url, options) => {
      if (options?.method === "POST") {
        return Promise.resolve({
          json: () =>
            Promise.resolve({
              id: 2,
              description: "Groceries",
              category: "Food",
              amount: 50,
            }),
        });
      }

      return Promise.resolve({
        json: () => Promise.resolve([]),
      });
    });

    vi.stubGlobal("fetch", fetchMock);

    render(<App />);

    fireEvent.change(
      screen.getByPlaceholderText("Description"),
      {
        target: { value: "Groceries" },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Category"),
      {
        target: { value: "Food" },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Amount"),
      {
        target: { value: "50" },
      }
    );

    fireEvent.click(
      screen.getByText("Add Transaction")
    );

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalled();
    });

    expect(
      await screen.findByText("Groceries")
    ).toBeInTheDocument();
  });
});