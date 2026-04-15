import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import AddTransactionForm from "./AddTransactionForm";

describe("AddTransactionForm Component", () => {
  it("submits the correct data when the form is filled and submitted", () => {
    // mock function: prop
    const mockPostTransaction = jest.fn();

    // render component
    render(<AddTransactionForm postTransaction={mockPostTransaction} />);

    // input elements
    const dateInput = screen.getByLabelText(/date/i) || screen.getByRole("textbox", { type: "date" }) || document.querySelector('input[name="date"]');
    const descInput = screen.getByPlaceholderText(/Description/i);
    const catInput = screen.getByPlaceholderText(/Category/i);
    const amountInput = screen.getByPlaceholderText(/Amount/i);
    const submitButton = screen.getByRole("button", { name: /Add Transaction/i });

    //  simulate user typing
    fireEvent.change(dateInput, { target: { value: "2026-04-15", name: "date" } });
    fireEvent.change(descInput, { target: { value: "New Shoes", name: "description" } });
    fireEvent.change(catInput, { target: { value: "Fashion", name: "category" } });
    fireEvent.change(amountInput, { target: { value: "120", name: "amount" } });

    // simulate form submission
    fireEvent.click(submitButton);

    // check: POST function called
    expect(mockPostTransaction).toHaveBeenCalledTimes(1);

    // check: called with correct object structure
    expect(mockPostTransaction).toHaveBeenCalledWith({
      date: "2026-04-15",
      description: "New Shoes",
      category: "Fashion",
      amount: "120",
    });
  });
});