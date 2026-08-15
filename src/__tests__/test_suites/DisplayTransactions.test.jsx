import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import App from '../../components/App';

const mockTransactions = [
  {
    id: "1",
    date: "2019-12-01",
    description: "Paycheck from Bob's Burgers",
    category: "Income",
    amount: 1000
  },
  {
    id: "2",
    date: "2019-12-01",
    description: "South by Southwest Quinoa Bowl at Fresh & Co",
    category: "Food",
    amount: -10.55
  }
];

describe('Display Transactions Test Suite', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    global.fetch = vi.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockTransactions),
      })
    );
  });

  it('displays transactions on startup', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("Paycheck from Bob's Burgers")).toBeInTheDocument();
      expect(screen.getByText("South by Southwest Quinoa Bowl at Fresh & Co")).toBeInTheDocument();
    });
  });
});