import { render, screen, waitFor } from "@testing-library/react";
import App from "../components/App";
import "@testing-library/jest-dom";
import "./mock"; // if you move fetch mock to file

describe("Display Transactions", () => {
  test("renders transactions on load", async () => {
    render(<App />);

    const items = await screen.findAllByTestId("transaction-item");

    expect(items).toHaveLength(2);
  });
});