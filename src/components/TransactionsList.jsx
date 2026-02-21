import React, { useState } from "react";
import Transaction from "./Transaction";

function TransactionsList({ transactions = [] }) {
  const [query, setQuery] = useState("");

  const filtered = transactions.filter(t => 
    t.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <div className="ui input">
        <input 
          type="text" 
          placeholder="Search..." 
          onChange={(e) => setQuery(e.target.value)} 
        />
      </div>
      <table className="ui table">
        <tbody>
          {filtered.map(t => <Transaction key={t.id} {...t} />)}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionsList;