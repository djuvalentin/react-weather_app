import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";

import styles from "./Header.module.css";
import { usePosition } from "../../hooks/usePosition";
import SearchBar from "./SearchBar";

function Header() {
  const { getPosition } = usePosition();

  function handleGetPosition() {
    getPosition?.();
  }

  return (
    <header className={styles.header}>
      <button
        className={styles["btn-locate"]}
        aria-label="Get current position"
        onClick={handleGetPosition}
      >
        <FontAwesomeIcon icon={faLocationCrosshairs} />
      </button>
      <SearchBar />
    </header>
  );
}

export default Header;
