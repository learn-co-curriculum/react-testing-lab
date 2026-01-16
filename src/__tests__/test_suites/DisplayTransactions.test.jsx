import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import App from '../../components/App'

describe('Display Transactions', () => {
  
  beforeEach(() => {
    // Mock fetch or any API calls here
    global.fetch = vi.fn()
  })

  it('should display transactions on page load', async () => {
    // 1. Mock the fetch response with sample transaction data
    const mockTransactions = [
        {
            id: 1,
            date: '2024-01-15',
            description: "Grocery Store",
            category: "Food",
            amount: 50.25
        },
        {
            id: 2,
            date: '2024-01-16',
            description: "Gas Station",
            category: "Transportation",
            amount: 35.00
        }
    ]
    global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockTransactions
    })
        
    // 2. Render the component
    render(<App />)
    // 3. Wait for transactions to appear
    await waitFor(() => {
        expect(screen.getByText("Grocery Store")).toBeInTheDocument()
    })
    // 4. Assert that transaction data is in the document
    expect(screen.getByText("Grocery Store")).toBeInTheDocument()
    expect(screen.getByText("Gas Station")).toBeInTheDocument()
    expect(screen.getByText("Food")).toBeInTheDocument()
    expect(screen.getByText("Transportation")).toBeInTheDocument()
  })
})