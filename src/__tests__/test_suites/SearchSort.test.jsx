import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../components/App";
import "@testing-library/jest-dom";

global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        {
          id: 1,
          date: "2024-01-01",
          description: "Salary",
          category: "Income",
          amount: 1000,
        },
        {
          id: 2,
          date: "2024-01-02",
          description: "Groceries",
          category: "Food",
          amount: 200,
        },
      ]),
  })
);

describe("Search and Sort", () => {
  test("search filters transactions", async () => {
    render(<App />);

    const searchInput = screen.getByPlaceholderText(
      "Search your Recent Transactions"
    );

    await userEvent.type(searchInput, "salary");

    expect(screen.getByText(/salary/i)).toBeInTheDocument();
  });

  test("sort dropdown changes value", async () => {
    render(<App />);

    const select = screen.getByRole("combobox");

    await userEvent.selectOptions(select, "asc");

    expect(select.value).toBe("asc");

    await userEvent.selectOptions(select, "desc");

    expect(select.value).toBe("desc");
  });
});