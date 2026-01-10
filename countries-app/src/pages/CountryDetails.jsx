import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFavorites } from "../context/FavoritesContext";
import { getCountryByName } from "../api/countriesApi";

const CountryDetails = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [borderCountries, setBorderCountries] = useState([]);
  const [isFullscreenFlag, setIsFullscreenFlag] = useState(null);
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
  const fetchCountry = async () => {
    const data = await getCountryByName(name);
    setCountry(data);
    localStorage.setItem("lastVisitedCountry", data.name.common);
  };

  fetchCountry();
}, [name]);

  useEffect(() => {
    if (!country?.borders || country.borders.length === 0) {
      return;
    }

    fetch(`https://restcountries.com/v3.1/alpha?codes=${country.borders.join(",")}`)
      .then(res => res.json())
      .then(data => {
        setBorderCountries(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        setBorderCountries([]);
      });
  }, [country?.borders]);

  if (!country) return null;

  return (
    <>
      <button onClick={() => navigate(-1)} className="btn btn-light shadow-sm mb-5">
        ← Back
      </button>

      <div className="row align-items-center">
        <div className="col-md-6 mb-4">
          <img
            src={country.flags.png}
            className="img-fluid shadow-sm main-flag"
            alt={country.name.common}
            style={{ width: "90%", maxHeight: "80%", objectFit: "contain", cursor: "zoom-in" }}
            onClick={() => {
              setIsFullscreenFlag(country);
            }}
          />
        </div>

        <div className="col-md-6">
          <h2 className="fw-bold mb-4">{country.name.common}</h2>

          <button
            onClick={() => {
              if (isFavorite(country.cca3)) {
                removeFavorite(country.cca3);
              } else {
                addFavorite(country);
              }
            }}
            className={`btn ${isFavorite(country.cca3) ? "btn-warning" : "btn-outline-warning"} mb-4`}
          >
            {isFavorite(country.cca3) ? "⭐ Remove from Favorites" : "☆ Add to Favorites"}
          </button>

          <div className="row">
            <div className="col-md-6 ">
              <p><strong>Native Name:</strong> {Object.values(country.name.nativeName || {})[0]?.common}</p>
              <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
              <p><strong>Region:</strong> {country.region}</p>
              <p><strong>Sub Region:</strong> {country.subregion}</p>
              <p><strong>Capital:</strong> {country.capital?.[0]}</p>
            </div>

            <div className="col-md-6">
              <p><strong>Top Level Domain:</strong> {country.tld?.[0]}</p>
              <p><strong>Currencies:</strong> {Object.values(country.currencies || {})[0]?.name}</p>
              <p><strong>Languages:</strong> {Object.values(country.languages || {}).join(", ")}</p>
            </div>
          </div>

          <div className="mt-4 d-flex align-items-center gap-2">
            <p><strong>Point At Map:</strong></p>
            <a
              href={country.maps.googleMaps}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-secondary mb-2"
            >
              📍 Google Maps
            </a>
          </div>

          <div className="mt-4 d-flex align-items-center flex-wrap gap-2">
            <p><strong>Border Countries:</strong></p>
            {borderCountries && borderCountries.length > 0 ? (
              borderCountries.map(bc => (
                <Link
                  key={bc.cca3}
                  to={`/country/${encodeURIComponent(bc.name.common)}`}
                  className="text-decoration-none"
                >
                  <span className="badge bg-light text-dark me-2 mb-3 shadow-sm">
                    {bc.name.common}
                  </span>
                </Link>
              ))
            ) : (
              <p className="">No border countries</p>
            )}
          </div>
        </div>
      </div>

      {isFullscreenFlag && (
        <div
          className="flag-overlay"
          role="dialog"
          aria-label={`${isFullscreenFlag.name.common} flag full screen`}
          onClick={() => {
            setIsFullscreenFlag(null);
          }}
        >
          <img src={isFullscreenFlag.flags.png} alt={isFullscreenFlag.name.common} className="flag-full" />
        </div>
      )}
    </>
  );
};

export default CountryDetails;