import { vi } from "vitest";

const mockTransactions = [
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
];

global.fetch = vi.fn((url, options) => {
  if (!options) {
    // GET request
    return Promise.resolve({
      json: () => Promise.resolve(mockTransactions),
    });
  }

  // POST request
  return Promise.resolve({
    json: () =>
      Promise.resolve({
        id: 999,
        ...JSON.parse(options.body),
      }),
  });
});