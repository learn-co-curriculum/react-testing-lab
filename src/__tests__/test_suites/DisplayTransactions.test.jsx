import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../../components/App";

describe("Display transactions", () => {
  it("displays transactions on startup", async () => {
    // Fake the server response with two sample transactions
    global.setFetchResponse([
      { id: "1", date: "2019-12-01", description: "Paycheck from Bob's Burgers", category: "Income", amount: 1000 },
      { id: "2", date: "2019-12-01", description: "Chipotle", category: "Food", amount: -17.59 },
    ]);

    render(<App />);

    // Transactions load asynchronously, so wait for the first one to appear
    expect(await screen.findByText("Chipotle")).toBeInTheDocument();
    expect(screen.getByText("Paycheck from Bob's Burgers")).toBeInTheDocument();
  });
});