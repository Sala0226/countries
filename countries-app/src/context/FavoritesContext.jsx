import { createContext, useContext, useEffect, useState } from "react";

const FavoritesContext = createContext();

const STORAGE_KEY = "favorite_countries";

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (country) => {
    setFavorites((prev) =>
      prev.find((c) => c.cca3 === country.cca3) ? prev : [...prev, country]
    );
  };

  const removeFavorite = (cca3) => {
    setFavorites((prev) => prev.filter((c) => c.cca3 !== cca3));
  };

  const isFavorite = (cca3) => {
    return favorites.some((c) => c.cca3 === cca3);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
