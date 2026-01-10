const BASE_URL =
  "https://restcountries.com/v3.1/all?fields=name,capital,flags,population,region"


export const getAllCountries = async () => {
  try {
    const res = await fetch(BASE_URL);

    if (!res.ok) {
      throw new Error(`Erreur HTTP ! Status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Erreur API :", error);
    return [];
  }
};

export const getCountryByName = async (name) => {
  const res = await fetch(
    `https://restcountries.com/v3.1/name/${encodeURIComponent(name)}?fullText=true`
  );
  const data = await res.json();
  return data[0];
};

