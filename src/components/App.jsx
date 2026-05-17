
import { useEffect, useState } from "react";
import TransactionsList from "./TransactionsList";
import AddTransaction from "./AddTransactionForm";
import Search from "./Search";
import Sort from "./Sort";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("all");

  useEffect(() => {
    fetch("http://localhost:6001/transactions")
      .then((res) => res.json())
      .then((data) => {
        setTransactions(data || []);
      })
      .catch(() => setTransactions([]));
  }, []);
  // Adds a new transaction to backend and updates UI state
  function addTransaction(newTransaction) {
    fetch("http://localhost:6001/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTransaction),
    })
      .then((res) => res.json())
      .then((data) => {
        // Add newly created transaction to existing list
        setTransactions((prev) => [...prev, data]);
      });
  }

  // SEARCH
  // Filter transactions based on search input (case-insensitive)
  const filteredTransactions = transactions.filter((t) =>
    t.description.toLowerCase().includes(search.toLowerCase())
  );

  // SORT
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortBy === "category") {
      return a.category.localeCompare(b.category);
    }
    if (sortBy === "amount") {
      return b.amount - a.amount;
    }
    return 0;
  });

  return (
    <div className="ui raised segment">
      <Search search={search} setSearch={setSearch} />

      <Sort sortBy={sortBy} setSortBy={setSortBy} />

      <AddTransaction addTransaction={addTransaction} />

      <TransactionsList transactions={sortedTransactions} />
    </div>
  );
}

export default App;