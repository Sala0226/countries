const SearchFilter = ({ search, setSearch, region, setRegion }) => {
  return (
    <div className="row mb-4 align-items-center">
      {/* Search */}
      <div className="col-md-4 mb-3 mb-md-0">
        <input
          type="text"
          className="form-control shadow-sm"
          placeholder="Search for a country..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Filter */}
      <div className="col-md-3 ms-md-auto">
        <select
          className="form-select shadow-sm"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        >
          <option value="">Filter by Region</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>
    </div>
  );
};

export default SearchFilter;
