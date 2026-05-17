export default function Search({ search, setSearch }) {
  return (
    <div className="ui large fluid icon input">
      <input
        placeholder="Search your Recent Transactions"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}
