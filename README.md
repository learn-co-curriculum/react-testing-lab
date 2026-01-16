# Banking Transactions Testing Lab

A React-based banking application with a comprehensive Vitest testing suite. This project demonstrates test-driven development (TDD) practices by implementing transaction management features with full test coverage.

## Features

- **Display Transactions**: View all transactions on page load
- **Add Transactions**: Submit new transactions via form with real-time updates
- **Search Functionality**: Filter transactions by description
- **Sort Transactions**: Sort by description or category
- **Full Test Coverage**: Comprehensive Vitest test suite

## Technologies Used

- **React** - Frontend library
- **Vitest** - Testing framework
- **React Testing Library** - Component testing utilities
- **JSON Server** - Mock REST API backend
- **Vite** - Build tool and dev server

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Shobinn24/react-testing-lab
cd react-testing-lab
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

### Development Mode

Start the React development server:
```bash
npm run dev
```

Start the JSON Server backend (in a separate terminal):
```bash
npm run server
```

The app will be available at `http://localhost:5173` (or the port shown in terminal).

## Running Tests

Run the test suite:
```bash
npm test
```

Run tests in watch mode:
```bash
npm test -- --watch
```

## Test Coverage

The project includes comprehensive test suites for:

### 1. Display Transactions
- Fetches and displays transactions on initial page load
- Renders transaction data correctly

### 2. Add Transactions
- Adds new transactions to the frontend
- Makes POST requests with correct data structure
- Updates UI with newly added transactions

### 3. Search and Sort
- Filters transactions based on search input
- Updates displayed transactions dynamically
- Sorts transactions by description or category

## Project Structure
```
react-testing-lab/
├── src/
│   ├── components/
│   │   ├── AccountContainer.jsx    # Main container with state management
│   │   ├── AddTransactionForm.jsx  # Form for adding transactions
│   │   ├── App.jsx                 # Root component
│   │   ├── Search.jsx              # Search input component
│   │   ├── Sort.jsx                # Sort dropdown component
│   │   ├── Transaction.jsx         # Individual transaction row
│   │   └── TransactionsList.jsx    # Transactions table
│   ├── __tests__/
│   │   └── test_suites/
│   │       ├── AddTransactions.test.jsx
│   │       ├── DisplayTransactions.test.jsx
│   │       └── SearchSort.test.jsx
│   └── main.jsx
├── db.json                         # Mock database
├── package.json
└── README.md
```

## Implementation Details

### Search Functionality
The search feature filters transactions by description (case-insensitive):
```javascript
const filteredTransactions = transactions.filter((transaction) => {
  return transaction.description.toLowerCase().includes(search.toLowerCase())
})
```

### Sort Functionality
Transactions can be sorted alphabetically by description or category:
```javascript
function onSort(sortBy){
  const sortedTransactions = [...transactions].sort((a, b) => {
    if (a[sortBy] < b[sortBy]) return -1
    if (a[sortBy] > b[sortBy]) return 1
    return 0
  })
  setTransactions(sortedTransactions)
}
```

## Development Approach

This project followed **Test-Driven Development (TDD)** principles:
1. Write failing tests first
2. Implement minimum code to pass tests
3. Refactor while keeping tests green

## Author

Shobinn Clark - [shobinn24](https://github.com/shobinn24)

## License

This project is part of the Flatiron School curriculum.