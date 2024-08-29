import { useState } from "react";
import "./filter.scss";
import { useSearchParams } from "react-router-dom";

const Filter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [query, setQuery] = useState({
    city: searchParams.get("city") || "",
    engType: searchParams.get("engType") || "",
    vclType: searchParams.get("vclType") || "",
    brand: searchParams.get("brand") || "",
    minPrice: searchParams.get("minPrice") || 0,
    maxPrice: searchParams.get("maxPrice") || 10000000
  });

  const handleChange = (e) => {
    setQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFilter = () => {
    setSearchParams(query);
  };

  return (
    <div className="filter">
      <h1>Search results for <b>{searchParams.get("city")}</b></h1>
      <div className="top">
        <div className="item">
          <label htmlFor="city">City</label>
          <input type="text" id="city" name="city" placeholder="City" onChange={handleChange} defaultValue={query.city}/>
        </div>
      </div>

      <div className="bottom">
        <div className="item">
          <label htmlFor="engType">Engine Type</label>
          <select name="engType" id="engType" onChange={handleChange} defaultValue={query.engType}>
            <option value="">any</option>
            <option value="petrol">Petrol</option>
            <option value="diesel">Diesel</option>
            <option value="hybrid">Hybrid</option>
            <option value="electric">Electric</option>
            <option value="cng">Cng</option>
          </select>
        </div>

        <div className="item">
          <label htmlFor="vclType">Vehicle Type</label>
          <select name="vclType" id="vclType" onChange={handleChange} defaultValue={query.vclType}>
            <option value="">any</option>
            <option value="car">Car</option>
            <option value="bike">Bike</option>
            <option value="buggy">Buggy/ssv</option>
          </select>
        </div>

        <div className="item">
          <label htmlFor="brand">Brand</label>
          <input type="text" id="brand" name="brand" placeholder="any" onChange={handleChange} defaultValue={query.brand}/>
        </div>

        <div className="item">
          <label htmlFor="model">Model</label>
          <input type="text" id="model" name="model" placeholder="any" onChange={handleChange} defaultValue={query.model}/>
        </div>

        <div className="item">
          <label htmlFor="minPrice">Min Price</label>
          <input type="text" id="minPrice" name="minPrice" placeholder="any" onChange={handleChange} defaultValue={query.minPrice}/>
        </div>

        <div className="item">
          <label htmlFor="maxPrice">Max Price</label>
          <input type="text" id="maxPrice" name="maxPrice" placeholder="any" onChange={handleChange} defaultValue={query.maxPrice}/>
        </div>

        <button onClick={handleFilter}><img src="/search.png" alt="" /></button>
      </div>
    </div>
  )
}

export default Filter