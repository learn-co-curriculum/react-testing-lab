


import Transaction from "./Transaction";

export default function TransactionsList({ transactions }) {
  return (
    <table className="ui celled striped padded table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Description</th>
          <th>Category</th>
          <th>Amount</th>
        </tr>
      </thead>

      <tbody>
        {transactions.map((transaction) => (
          <Transaction
            key={transaction.id}
            transaction={transaction}
          />
        ))}
      </tbody>
    </table>
  );
}