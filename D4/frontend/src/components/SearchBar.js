// Amadeus Fidos u22526162
import "../styles/searchbar.css";

export default function SearchBar({ placeholder = "Search...", onChange }) {
  return (
    <div className="searchbar">
      <input
        type="text"
        placeholder={placeholder}
        onChange={(e) => onChange && onChange(e.target.value)}
      />
    </div>
  );
}
