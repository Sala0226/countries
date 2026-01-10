import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllCountries } from "../api/countriesApi";
import CountryCard from "../components/CountryCard";
import SearchFilter from "../components/SearchFilter";


const Home = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllCountries()
      .then((data) => {
        setCountries(data);
        setFilteredCountries(data);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let result = countries;

    if (search) {
      result = result.filter((country) =>
        country.name.common.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (region) {
      result = result.filter(
        (country) => country.region === region
      );
    }

    setFilteredCountries(result);
  }, [search, region, countries]);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <SearchFilter
        search={search}
        setSearch={setSearch}
        region={region}
        setRegion={setRegion}
      />

      <div className="row g-4">
        {filteredCountries.map((country) => (
          <div className="col-md-3" key={country.cca3}>
            <CountryCard country={country} />
          </div>
        ))}
      </div>

      <Link to="/favorites" className="btn btn-outline-dark">
        ⭐ Voir les pays favoris
      </Link>

    </>
  );
};

export default Home;
