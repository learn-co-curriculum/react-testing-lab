import React from "react";

function AddTransactionForm({ onAdd }) {
  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      date: formData.get("date"),
      description: formData.get("description"),
      category: formData.get("category"),
      amount: formData.get("amount"),
    };
    onAdd(data);
    e.target.reset();
  }

  return (
    <form className="ui form" onSubmit={handleSubmit}>
      <div className="inline fields">
        <input type="date" name="date" />
        <input type="text" name="description" placeholder="Description" />
        <input type="text" name="category" placeholder="Category" />
        <input type="number" name="amount" placeholder="Amount" step="0.01" />
      </div>
      <button className="ui button" type="submit">Add Transaction</button>
    </form>
  );
}

export default AddTransactionForm;