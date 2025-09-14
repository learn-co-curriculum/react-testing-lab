import React from "react"

function AddTransactionForm({ postTransaction }) {
  function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    const fd = new FormData(form)

    const amountRaw = fd.get("amount")
    const amount =
      amountRaw !== null && amountRaw !== ""
        ? Number(amountRaw).toFixed(2)
        : amountRaw

    const newTransaction = {
      date: fd.get("date"),
      description: fd.get("description"),
      category: fd.get("category"),
      amount,
    }

    postTransaction(newTransaction)
  }

  return (
    <div className="ui segment">
      <form className="ui form" onSubmit={handleSubmit}>
        <div className="inline fields">
          <input type="date" name="date" />
          <input type="text" name="description" placeholder="Description" />
          <input type="text" name="category" placeholder="Category" />
          <input type="number" name="amount" placeholder="Amount" step="0.01" />
        </div>
        <button className="ui button" type="submit">
          Add Transaction
        </button>
      </form>
    </div>
  )
}

export default AddTransactionForm