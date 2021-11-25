import React from "react";
import "./Hero.css";

function Hero() {
  return (
    <div className="hero">
      <form className="search-form">
        <div className="input-group">
          <label className="search-label">What are you looking for?</label>
          <div className="search-input">
            <input
              type="text"
              className="search-input-form"
              placeholder="Search by activity"
            />
          </div>
        </div>
        <div className="input-group">
          <label className="search-label">Where the activity held?</label>
          <div className="search-input">
            <input
              type="text"
              className="search-input-form"
              placeholder="Search by city"
            />
          </div>
        </div>
        <div className="input-group">
          <label className="search-label">When you are available?</label>
          <div className="search-input">
            <input
              type="date"
              className="search-input-form"
              placeholder="Search by date"
            />
          </div>
        </div>
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      {/* Button to change page delete later*/}
      <a href="/create">
        <button type="button" style={{background:"yellow"}}>Create</button>
      </a>
      {/* Button to change page delete later*/}
    </div>
  );
}

export default Hero;
