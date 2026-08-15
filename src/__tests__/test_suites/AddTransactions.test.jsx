import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import App from '../../components/App';

const initialTransactions = [
  { id: "1", date: "2019-12-01", description: "Paycheck", category: "Income", amount: 1000 }
];

const newTransaction = {
  id: "2",
  date: "2019-12-02",
  description: "Chipotle",
  category: "Food",
  amount: "15"
};

describe('Add Transactions Test Suite', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    global.fetch = vi.fn().mockImplementation((url, options) => {
      if (options && options.method === 'POST') {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(newTransaction),
        });
      }

      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(initialTransactions),
      });
    });
  });

  it('adds new transaction to frontend and triggers POST request', async () => {
    const { container } = render(<App />);
    const user = userEvent.setup();

    const dateInput = container.querySelector('input[type="date"]');
    const descriptionInput = screen.getByPlaceholderText('Description');
    const categoryInput = screen.getByPlaceholderText('Category');
    const amountInput = screen.getByPlaceholderText('Amount');

    await user.type(dateInput, '2019-12-02');
    await user.type(descriptionInput, 'Chipotle');
    await user.type(categoryInput, 'Food');
    await user.type(amountInput, '15');

    // Submit form
    const form = container.querySelector('form');

    Object.defineProperty(form, 'date', { value: dateInput });
    Object.defineProperty(form, 'description', { value: descriptionInput });
    Object.defineProperty(form, 'category', { value: categoryInput });
    Object.defineProperty(form, 'amount', { value: amountInput });

    fireEvent.submit(form);

    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:6001/transactions',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: '2019-12-02',
          description: 'Chipotle',
          category: 'Food',
          amount: '15'
        })
      })
    );

    await waitFor(() => {
      expect(screen.getByText('Chipotle')).toBeInTheDocument();
    });
  });
});