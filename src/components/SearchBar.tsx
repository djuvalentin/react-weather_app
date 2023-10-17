import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";
import Form from "./Form";

import styles from "./SearchBar.module.css";

type SearchBarProps = {
  onGetPosition: () => void;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
};

function SearchBar({ onGetPosition, query, setQuery }: SearchBarProps) {
  return (
    <div className={styles["search-bar"]}>
      <button
        className={styles["btn-locate"]}
        aria-label="Get current position"
        onClick={onGetPosition}
      >
        <FontAwesomeIcon icon={faLocationCrosshairs} />
      </button>
      <Form query={query} setQuery={setQuery} />
    </div>
  );
}

export default SearchBar;
