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
    <form>
      <label>SHOW WEATHER FOR</label>
      <input type="text" value={query} onChange={handleChange} />
    </form>
  );
}

export default Form;
