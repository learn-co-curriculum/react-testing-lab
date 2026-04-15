import { render, screen } from "@testing-library/react";
import TransactionsList from "./TransactionsList";

// mock child component
// test ability to render 
jest.mock("./Transaction", () => {
    return function MockTransaction({ transaction }) {
        return (
            <tr data-testid="transaction-row">
                <td>{transaction.description}</td>
            </tr>
        );
    }; 
}); 

describe("TransactionsList Component", () => {
  const mockTransactions = [
    { id: 1, date: "2024-01-01", description: "Rent", category: "Housing", amount: 1200 },
    { id: 2, date: "2024-01-02", description: "Coffee", category: "Food", amount: 5 },
  ];

  it("renders the correct number of transactions on startup", () => {
    render(<TransactionsList transactions={mockTransactions} />);

    // Check if the table headers are present
    expect(screen.getByText(/Date/i)).toBeInTheDocument();
    expect(screen.getByText(/Description/i)).toBeInTheDocument();

    // correct number of transaction components rendered
    const rows = screen.getAllByTestId("transaction-row");
    expect(rows).toHaveLength(2);
  });

  it("displays the specific transaction data provided in props", () => {
    render(<TransactionsList transactions={mockTransactions} />);

    // data passed in is visible
    expect(screen.getByText("Rent")).toBeInTheDocument();
    expect(screen.getByText("Coffee")).toBeInTheDocument();
  });

  it("renders an empty table when no transactions are provided", () => {
    render(<TransactionsList transactions={[]} />);
    
    // headers should exist, but no rows should be found
    expect(screen.queryByTestId("transaction-row")).not.toBeInTheDocument();
  });
});