import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import App from '../../components/App'

describe('Add Transactions', () => {
  
  beforeEach(() => {
    global.fetch = vi.fn()
  })

  it('should add a new transaction to the frontend', async () => {
    const user = userEvent.setup()
    // 1. Mock initial GET request
    const existingTransactions = [
        {
            id: 1,
            date: '2024-01-15',
            description: "Grocery Store",
            category: "Food",
            amount: 50.25
        }
    ]
    // 2. Mock POST request response
    const newTransaction = {
        id: 2,
        date: "2024-01-17",
        description: "Coffee Shop",
        category: "Food",
        amount: 5.50
    }

    global.fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => existingTransactions,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => newTransaction,
      })
    // 3. Render App
    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('Grocery Store')).toBeInTheDocument()
    })
    
    // 4. Fill out the form
    const dateInput = document.querySelector('input[name="date"]')
    const descriptionInput = screen.getByPlaceholderText('Description')
    const categoryInput = screen.getByPlaceholderText('Category')
    const amountInput = screen.getByPlaceholderText('Amount')
    
    fireEvent.change(dateInput, { target: { value: '2024-01-17' } })
    await user.type(descriptionInput, 'Coffee Shop')
    await user.type(categoryInput, 'Food')
    await user.type(amountInput, '5.50')

    // 5. Submit the form
    const submitButton = screen.getByRole('button', { name: /add transaction/i })
    await user.click(submitButton)
    
    // 6. Assert new transaction appears
    await waitFor(() => {
      expect(screen.getByText('Coffee Shop')).toBeInTheDocument()
    })
    expect(screen.getByText('Coffee Shop')).toBeInTheDocument()
  })

  it('should make a POST request when adding a transaction', async () => {
    const user = userEvent.setup()
    // 1. Mock requests
    global.fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => []
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          id: 1,
          date: "2024-01-17",
          description: "Test Transaction",
          category: "Test",
          amount: 10.00
        })
      })
    // 2. Render App
    render(<App />)

    const dateInput = document.querySelector('input[type="date"]')
    const descriptionInput = screen.getByPlaceholderText('Description')
    const categoryInput = screen.getByPlaceholderText('Category')
    const amountInput = screen.getByPlaceholderText('Amount')

    fireEvent.change(dateInput, { target: { value: '2024-01-17' } })
    await user.type(descriptionInput, 'Test Transaction')
    await user.type(categoryInput, 'Test')
    await user.type(amountInput, '10.00')
    
    // 3. Submit
    const submitButton = screen.getByRole('button', { name: /add transaction/i })
    await user.click(submitButton)
    
    // 4. Assert fetch was called with POST method
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:6001/transactions',
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: expect.any(String)
        })
      )
    })
  })
})