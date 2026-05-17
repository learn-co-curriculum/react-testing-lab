

import { useState } from "react";

export default function AddTransaction({ addTransaction }) {
  const [formData, setFormData] = useState({
    date: "",
    description: "",
    category: "",
    amount: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    addTransaction(formData);

    setFormData({
      date: "",
      description: "",
      category: "",
      amount: "",
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />

      <input
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
      />

      <input
        name="amount"
        placeholder="Amount"
        value={formData.amount}
        onChange={handleChange}
      />

      <button type="submit">
        Add Transaction
      </button>
    </form>
  );
}
