import "./Featured.scss";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import search from "/img/icons/search.png";
import featured from "/img/Featured.png";

const Featured = () => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!input.trim()) {
      setError("Please enter a genre or an artist.");
    } else {
      setError("");
      navigate(`/gigs?search=${input}`);
    }
  };

  return (
    <div className="featured">
      <div className="container">
        <div className="left">
          <h1>
            Find the <span style={{ color: "#bc11b0" }}>Perfect Voice</span> for
            your special event
          </h1>
          <div className="search">
            <div className="searchInput">
              <img src={search} alt="" />
              <input
                type="text"
                placeholder=" Try 'Disco'"
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            <button onClick={handleSubmit}>Search</button>
          </div>
          {error && <div className="error">{error}</div>}{" "}
          <div className="popular">
            <span>Popular:</span>
            <button onClick={() => setInput("Jazz")}>Jazz</button>
            <button onClick={() => setInput("Classical")}>Classical</button>
            <button onClick={() => setInput("Lupii lui Calancea")}>
              Lupii lui Calancea
            </button>
          </div>
        </div>
        <div className="right">
          <img src={featured} alt="featured artist" />
        </div>
      </div>
    </div>
  );
};

export default Featured;
