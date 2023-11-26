import { useEffect, useState } from "react";
import styles from "./SearchBar.module.css";
import { useCities } from "../../hooks/useCities";

function SearchBar() {
  const [query, setQuery] = useState("");

  const { getCities } = useCities();

  function handleChange(e: React.ChangeEvent) {
    const target = e.target as HTMLInputElement;
    if (target) {
      setQuery(target.value);
    }
  }

  useEffect(() => {
    if (query.length > 2) {
      getCities(query);
    }
  }, [getCities, query]);

  return (
    <form className={styles["search-bar"]} onSubmit={(e) => e.preventDefault()}>
      <label>Search city</label>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search city"
      />
    </form>
  );
}

export default SearchBar;
