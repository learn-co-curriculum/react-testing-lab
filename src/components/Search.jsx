import React from "react"

function Search({ setSearch }) {
  return (
    <div className="ui large fluid icon input">
      <input
        type="text"
        placeholder="Search your Recent Transactions"
        onChange={(event) => setSearch(event.target.value)}
      />
      <i className="circular search link icon" />
    </div>
  )
}

export default Search