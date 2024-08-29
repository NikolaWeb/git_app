import { useState } from "react";
import "./searchBar.scss";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState({
    vclType: "car",
    city: "",
    brand: "",
    minPrice: 0,
    maxPrice: 0
  });

  const vclTypes = ["car", "bike", "buggy"];

  const switchType = (val) => {
    setQuery((prev) => ({ ...prev, vclType: val }))
  };

  const handleChange = (e) => {
    setQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="searchBar">
      <div className="type">
        {vclTypes.map((vclType) => (
          <button key={vclType} onClick={() => switchType(vclType)} className={query.vclType === vclType ? "active" : ""}>
            {vclType}
          </button>
        ))}
      </div>

      <form>
        <div className="inputContainer">
          <input type="text" name="city" placeholder="City" onChange={handleChange} />
          <input type="text" name="brand" placeholder="Brand Name" onChange={handleChange} />
          <input type="number" name="minPrice" min={0} max={10000000} placeholder="Min Price" onChange={handleChange} />
          <input type="number" name="maxPrice" min={0} max={10000000} placeholder="Max Price" onChange={handleChange} />
        </div>
        <Link to={`/list?vclType=${query.vclType}&city=${query.city}&brand=${query.brand}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`}>
          <button>
            <img src="/search.png" alt="" />
          </button>
        </Link>
      </form>
    </div>
  )
}

export default SearchBar