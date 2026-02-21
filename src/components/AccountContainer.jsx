import React, { useState, useEffect } from "react";
import TransactionsList from "./TransactionsList";
import AddTransactionForm from "./AddTransactionForm";

function AccountContainer() {
  const [transactions, setTransactions] = useState([]);

  // Fetch data on load
  useEffect(() => {
    fetch("http://localhost:6001/transactions")
      .then((r) => r.json())
      .then((data) => setTransactions(data));
  }, []);

  // Handle adding new transaction
  function handleAddTransaction(newTransaction) {
    // Post to server (Optional depending on lab requirements)
    setTransactions([...transactions, { ...newTransaction, id: transactions.length + 1 }]);
  }

  return (
    <div>
      <AddTransactionForm onAdd={handleAddTransaction} />
      <TransactionsList transactions={transactions} />
    </div>
  );
}

export default AccountContainer;