import { useFavorites } from "../context/FavoritesContext";
import { Link } from "react-router-dom";
import { useState } from "react";

const Favorites = () => {
  const { favorites } = useFavorites();
  const [region, setRegion] = useState("All");

  const regions = ["All", "Africa", "Americas", "Asia", "Europe", "Oceania"];

  const filteredFavorites =
    region === "All"
      ? favorites
      : favorites.filter((c) => c.region === region);

  return (
    <div className="container py-5">
      <h3 className="text-center mb-4">🌍 Pays Favoris</h3>

      {/* Filtre continent */}
      <div className="text-center mb-4">
        <select
          className="form-select w-50 mx-auto"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        >
          {regions.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      {filteredFavorites.length === 0 ? (
        <p className="text-center text-muted">Aucun pays favori</p>
      ) : (
        <div className="row g-4">
          {filteredFavorites.map((country) => (
            <div className="col-md-3" key={country.cca3}>
              <Link
                to={`/country/${country.name.common}`}
                className="text-decoration-none text-dark"
              >
                <div className="card shadow-sm h-100">
                  <img
                    src={country.flags.png}
                    className="card-img-top"
                    alt={country.name.common}
                    style={{ height: "140px", objectFit: "cover" }}
                  />
                  <div className="card-body text-center">
                    <strong>{country.name.common}</strong>
                    <p className="mb-0 text-muted">{country.region}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
