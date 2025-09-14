function Sort({ onSort }) {
  return (
    <select onChange={(event) => onSort(event.target.value)}>
      <option value="description">Description</option>
      <option value="category">Category</option>
    </select>
  )
}

export default Sort