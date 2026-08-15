import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import App from '../../components/App';

const mockTransactions = [
  { id: "1", date: "2019-12-01", description: "Paycheck from Bob's Burgers", category: "Income", amount: 1000 },
  { id: "2", date: "2019-12-04", description: "Sunglasses, Urban Outfitters", category: "Fashion", amount: -24.99 }
];

describe('Search Transactions Test Suite', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    global.fetch = vi.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockTransactions),
      })
    );
  });

  it('updates page when search input triggers a change event', async () => {
    render(<App />);
    const user = userEvent.setup();

    await waitFor(() => {
      expect(screen.getByText("Paycheck from Bob's Burgers")).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText(/search your recent transactions/i);
    await user.type(searchInput, 'Sunglasses');

    await waitFor(() => {
      expect(screen.getByText('Sunglasses, Urban Outfitters')).toBeInTheDocument();
      expect(screen.queryByText("Paycheck from Bob's Burgers")).not.toBeInTheDocument();
    });
  });
});