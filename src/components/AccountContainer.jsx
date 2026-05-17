
import React, { useState, useEffect } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";
import Sort from "./Sort";

function AccountContainer() {
  // Stores all transactions fetched from backend API
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/transactions")
      .then((r) => r.json())
      .then((data) => setTransactions(data));
  }, []);

  // Sends a new transaction to backend and updates UI state
  function postTransaction(newTransaction) {
    fetch("http://localhost:6001/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTransaction),
    })
      .then((r) => r.json())
      .then((data) => setTransactions([...transactions, data]));
  }

  function onSort(value) {
    setSortBy(value);
  }

  // ✅ SEARCH FILTER
  // Filters transactions based on search input (case-insensitive)
  const filteredTransactions = transactions.filter((t) => {
    return (
      t.description.toLowerCase().includes(search.toLowerCase()) ||
      t.category.toLowerCase().includes(search.toLowerCase())
    );
  });

  // ✅ SORT LOGIC
  // Sorts filtered transactions based on selected option
  const displayedTransactions = [...filteredTransactions].sort((a, b) => {
    if (!sortBy) return 0;
    return a[sortBy].localeCompare(b[sortBy]);
  });

  return (
    <div>
      <Search setSearch={setSearch} />
      <AddTransactionForm postTransaction={postTransaction} />
      <Sort onSort={onSort} />
      <TransactionsList transactions={displayedTransactions} />
    </div>
  );
}

export default AccountContainer;
