// type CitiesListProp = {
//   cities: {
//     id: number;
//     name: string;
//     latitude: number;
//     longitude: number;
//     elevation: number;
//     feature_code: string;
//     country_code: string;
//     admin1_id: number;
//     admin2_id: number;
//     timezone: string;
//     population: number;
//     country_id: number;
//     admin1: string;
//     admin2: string;
//   }[];
// };

// type City = {
//   id: number;
//   name: string;
//   latitude: number;
//   longitude: number;
//   elevation: number;
//   feature_code: string;
//   country_code: string;
//   admin1_id: number;
//   admin2_id: number;
//   timezone: string;
//   population: number;
//   country_id: number;
//   admin1: string;
//   admin2: string;
// };

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
