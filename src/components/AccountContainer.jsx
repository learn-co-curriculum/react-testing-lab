import React, { useState, useEffect } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";
import Sort from "./Sort";

function AccountContainer() {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("description"); // default

  useEffect(() => {
    fetch("http://localhost:6001/transactions")
      .then((r) => r.json())
      .then((data) => setTransactions(data));
  }, []);

  function postTransaction(newTransaction) {
    fetch("http://localhost:6001/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTransaction),
    })
      .then((r) => r.json())
      .then((data) => setTransactions((prev) => [...prev, data]));
  }

  function onSort(nextSortBy) {
    setSortBy(nextSortBy);
  }

  // Filter using search here and pass new variable down
  const visible = transactions
    .filter((t) => {
      const q = search.trim().toLowerCase();
      if (!q) return true;
      return (
        (t.description || "").toLowerCase().includes(q) ||
        (t.category || "").toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      if (sortBy === "category") {
        return (a.category || "").localeCompare(b.category || "");
      }
      // default description
      return (a.description || "").localeCompare(b.description || "");
    });

  return (
    <div>
      <Search setSearch={setSearch} />
      <AddTransactionForm postTransaction={postTransaction} />
      <Sort onSort={onSort} />
      <TransactionsList transactions={visible} />
    </div>
  );
}

export default AccountContainer;
