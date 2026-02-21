import React from "react";

function TransactionItem({ transaction }) {
  const { date, description, category, amount } = transaction;

  return (
    <tr>
      <td>{date}</td>
      <td>{description}</td>
      <td>{category}</td>
      <td>{amount}</td>
    </tr>
  );
}

export default TransactionItem;