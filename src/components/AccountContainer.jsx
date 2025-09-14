import React, { useEffect, useMemo, useState } from "react"
import TransactionsList from "./TransactionsList"
import Search from "./Search"
import AddTransactionForm from "./AddTransactionForm"
import Sort from "./Sort"

function AccountContainer() {
  const [transactions, setTransactions] = useState([])
  const [search, setSearch] = useState("")
  const [sortBy, setSortBy] = useState("")

  useEffect(() => {
    fetch("http://localhost:6001/transactions")
      .then((response) => response.json())
      .then((data) => setTransactions(data))
  }, [])

  function postTransaction(newTransaction) {
    fetch("http://localhost:6001/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTransaction),
    })
      .then((response) => response.json())
      .then((data) => {
        setTransactions((prev) => [...prev, data])
      })
  }

  function onSort(value) {
    setSortBy(value)
  }

  const visibleTransactions = useMemo(() => {
    const trimmed = search.trim().toLowerCase()

    let filtered = transactions
    if (trimmed !== "") {
      filtered = transactions.filter((t) =>
        String(t.description || "").toLowerCase().includes(trimmed)
      )
    }

    if (sortBy === "description" || sortBy === "category") {
      const field = sortBy
      filtered = [...filtered].sort((a, b) => {
        const A = String(a[field] || "").toLowerCase()
        const B = String(b[field] || "").toLowerCase()
        if (A < B) return -1
        if (A > B) return 1
        return 0
      })
    }

    return filtered
  }, [transactions, search, sortBy])

  return (
    <div>
      <Search setSearch={setSearch} />
      <AddTransactionForm postTransaction={postTransaction} />
      <Sort onSort={onSort} />
      <TransactionsList transactions={visibleTransactions} />
    </div>
  )
}

export default AccountContainer