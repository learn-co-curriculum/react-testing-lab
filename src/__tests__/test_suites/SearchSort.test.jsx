import { render, screen, fireEvent } from "@testing-library/react";
import Search from "./Search";
import Sort from "./Sort";
import { expect } from "vitest";

// search component 
describe("Search Component", () => {
    it("calls setSearch with the correct value when the user types", () =>{
        // mock function 
        const mockSetSearch = jest.fn(); 

        // render with mock prop
        render(<Search setSearch={mockSetSearch} />); 

        const input = screen.getAllByPlaceholderText(/Search your Recent Transactions/i);

        // simulate typing 
        fireEvent.change(input, { target: { value: "Rent" } });

        // assertion 
        expect(mockSetSearch).toHaveBeenCalledTimes(1); 
        expect(mockSetSearch).toHaveBeenCalledWith("Rent"); 
    });
}); 

// Sort component 
describe("Sort Component", () => {
  it("calls onSort with the correct value when a new option is selected", () => {
    // mock function
    const mockOnSort = jest.fn();

    // render
    render(<Sort onSort={mockOnSort} />);

    const select = screen.getByRole("combobox");

    // simulate changing  dropdown to "Category"
    fireEvent.change(select, { target: { value: "category" } });

    // assertions
    expect(mockOnSort).toHaveBeenCalledTimes(1);
    expect(mockOnSort).toHaveBeenCalledWith("category");
    
    // verify: select value changed in DOM
    expect(select.value).toBe("category");
  });
});