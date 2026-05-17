


import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import App from "../../components/App";

describe("Display Transactions", () => {
  it("displays transactions on startup", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          json: () =>
            Promise.resolve([
              {
                id: 1,
                description: "Salary",
                category: "Income",
                amount: 1000,
              },
            ]),
        })
      )
    );

    render(<App />);

    expect(
      await screen.findByText("Salary")
    ).toBeInTheDocument();
  });
});