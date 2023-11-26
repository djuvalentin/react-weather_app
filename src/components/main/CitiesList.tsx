type CitiesListProp = {
  cities: {
    id: number;
    name: string;
  }[];
};

type City = {
  id: number;
  name: string;
};

function CitiesList({ cities }: CitiesListProp) {
  return (
    <ul>
      {cities.map((c: City) => (
        <li key={c.id}>{c.name}</li>
      ))}
    </ul>
  );
}

export default CitiesList;
