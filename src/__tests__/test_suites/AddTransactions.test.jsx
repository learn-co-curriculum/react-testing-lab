import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../components/App";

describe("Add transactions", () => {
  it("sends a POST request and shows the new transaction", async () => {
    const user = userEvent.setup();

    // Start with an empty transaction list
    global.setFetchResponse([]);
    render(<App />);

    // Type into the form fields like a real user would
    await user.type(screen.getByPlaceholderText("Description"), "Coffee");
    await user.type(screen.getByPlaceholderText("Category"), "Food");
    await user.type(screen.getByPlaceholderText("Amount"), "4.5");

    // Fake the server's reply to the POST request
    global.setFetchResponse({
      id: "99",
      date: "",
      description: "Coffee",
      category: "Food",
      amount: "4.5",
    });

    // Click the submit button
    await user.click(screen.getByRole("button", { name: /add transaction/i }));

    // The POST request was called with the right URL and method
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:6001/transactions",
        expect.objectContaining({ method: "POST" })
      );
    });

    // The new transaction appears on the page
    expect(await screen.findByText("Coffee")).toBeInTheDocument();
  });
});