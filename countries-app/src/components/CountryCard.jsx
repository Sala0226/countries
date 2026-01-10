import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";


const CountryCard = ({ country }) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(country.cca3);

  const toggleFavorite = () => {
    favorite
      ? removeFavorite(country.cca3)
      : addFavorite(country);
  };

  return (
    <div className="card h-100">
      <img
        src={country.flags.png}
        className="card-img-top"
        alt={country.name.common}
      />

      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{country.name.common}</h5>
        <p className="card-text">🌍 {country.region}</p>

        <div className="mt-auto d-flex justify-content-between">
          <Link
            to={`/country/${country.name.common}`}
            className="btn btn-sm btn-outline-primary"
          >
            Détails
          </Link>

          <button
            onClick={toggleFavorite}
            className={`btn btn-sm ${
              favorite ? "btn-warning" : "btn-outline-warning"
            }`}
          >
            ⭐
          </button>
        </div>
      </div>
    </div>
  );
};

export default CountryCard;
