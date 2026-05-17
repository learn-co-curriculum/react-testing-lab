export default function Sort({ sortBy, setSortBy }) {
  return (
    <select
      value={sortBy}
      onChange={(e) => setSortBy(e.target.value)}
    >
      <option value="all">All</option>
      <option value="category">Category</option>
      <option value="amount">Amount</option>
    </select>
  );
}