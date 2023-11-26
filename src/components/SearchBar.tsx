import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";
import Form from "./Form";

import styles from "./SearchBar.module.css";
import { usePosition } from "../hooks/usePosition";

function SearchBar() {
  const { getPosition } = usePosition();

  function handleGetPosition() {
    getPosition?.();
  }

  return (
    <div className={styles["search-bar"]}>
      <button
        className={styles["btn-locate"]}
        aria-label="Get current position"
        onClick={handleGetPosition}
      >
        <FontAwesomeIcon icon={faLocationCrosshairs} />
      </button>
      <Form />
    </div>
  );
}

export default SearchBar;
