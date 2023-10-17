import styles from "./Form.module.css";

type FormProps = {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
};

function Form({ query, setQuery }: FormProps) {
  function handleChange(e: React.ChangeEvent) {
    const target = e.target as HTMLInputElement;
    if (target) {
      setQuery(target.value);
    }
  }

  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
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

export default Form;
