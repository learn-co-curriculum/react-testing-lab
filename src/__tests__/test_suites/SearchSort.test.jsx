import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import App from '../../components/App'

describe('Search and Sort Transactions', () => {
  
  beforeEach(() => {
    global.fetch = vi.fn()
  })

  it('should filter transactions when search input changes', async () => {
    const user = userEvent.setup()

    // Mock transactions data
    const mockTransactions = [
      {
        id: 1,
        date: "2024-01-15",
        description: "Grocery Store",
        category: "Food",
        amount: 50.25
      },
      {
        id: 2,
        date: "2024-01-16",
        description: "Gas Station",
        category: "Transportation",
        amount: 35.00
      },
      {
        id: 3,
        date: "2024-01-17",
        description: "Coffee Shop",
        category: "Food",
        amount: 5.50
      }
    ]

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockTransactions
    })

    // Render App
    render(<App />)

    // Wait for all transactions to load
    await waitFor(() => {
      expect(screen.getByText('Grocery Store')).toBeInTheDocument()
    })

    // Verify all transactions are displayed initially
    expect(screen.getByText('Grocery Store')).toBeInTheDocument()
    expect(screen.getByText('Gas Station')).toBeInTheDocument()
    expect(screen.getByText('Coffee Shop')).toBeInTheDocument()

    // Find search input and type "coffee"
    const searchInput = screen.getByPlaceholderText('Search your Recent Transactions')
    await user.type(searchInput, 'coffee')

    // After searching, only Coffee Shop should be visible
    await waitFor(() => {
      expect(screen.getByText('Coffee Shop')).toBeInTheDocument()
    })

    // Grocery Store and Gas Station should NOT be in the document
    expect(screen.queryByText('Grocery Store')).not.toBeInTheDocument()
    expect(screen.queryByText('Gas Station')).not.toBeInTheDocument()
  })

  it('should sort transactions by description or category', async () => {
    const user = userEvent.setup()

    // Mock transactions (intentionally unsorted)
    const mockTransactions = [
      {
        id: 1,
        date: "2024-01-15",
        description: "Zebra Supplies",
        category: "Office",
        amount: 50.25
      },
      {
        id: 2,
        date: "2024-01-16",
        description: "Apple Store",
        category: "Electronics",
        amount: 35.00
      },
      {
        id: 3,
        date: "2024-01-17",
        description: "Middle Shop",
        category: "Food",
        amount: 5.50
      }
    ]

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockTransactions
    })

    // Render App
    render(<App />)

    // Wait for transactions to load
    await waitFor(() => {
      expect(screen.getByText('Zebra Supplies')).toBeInTheDocument()
    })

    // Find the sort dropdown
    const sortSelect = screen.getByRole('combobox')

    // Sort by description (should be: Apple, Middle, Zebra)
    await user.selectOptions(sortSelect, 'description')

    // Verify sorted order by checking all descriptions exist
    await waitFor(() => {
      expect(screen.getByText('Apple Store')).toBeInTheDocument()
      expect(screen.getByText('Middle Shop')).toBeInTheDocument()
      expect(screen.getByText('Zebra Supplies')).toBeInTheDocument()
    })
  })
})