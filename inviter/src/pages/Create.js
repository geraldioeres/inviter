import React from "react";
import Select from "react-select";
import { gql, useQuery } from "@apollo/client";

const GET_CATEGORIES = gql`
  query MyQuery {
    project_fe_categories {
      id
      name
    }
  }
`;

const GET_CITIES = gql`
  query MyQuery {
    project_fe_citites {
      id
      name
    }
  }
`;

function Create() {
  const { data } = useQuery(GET_CATEGORIES);
  const { data: cityData } = useQuery(GET_CITIES);

  const optionsCat = data?.project_fe_categories?.map((obj) => {
    let newData = {};
    newData["value"] = obj.id;
    newData["label"] = obj.name;
    return newData;
  });

  const optionsCity = cityData?.project_fe_citites?.map((obj) => {
    let newCity = {};
    newCity["value"] = obj.id;
    newCity["label"] = obj.name;
    return newCity;
  })

  return (
    <div className="create">
      <h1>Create new activity</h1>
      <form>
        <div className="input-group">
          <label>
            <Select
              options={optionsCat}
              className="input-form"
              name="category"
              id="category"
              placeholder="Choose category..."
            />
          </label>
        </div>
        <div className="input-group">
          <label>
            Activity Title
            <input
              type="text"
              className="input-form"
              name="title"
              id="title"
              maxLength="60"
              placeholder="Type Title..."
            />
          </label>
        </div>
        <div className="input-group">
          <label>
            Activity Description
            <textarea
              className="input-form"
              name="description"
              id="description"
              maxLength="5"
              placeholder="Type Description..."
            />
          </label>
        </div>
        <div className="input-group">
          <label>
            <Select
              options={optionsCity}
              className="input-form"
              name="city"
              id="city"
              placeholder="Choose city..."
            />
          </label>
        </div>
        <div className="input-group">
          <label>
            Select Date
            <input type="date" name="date" id="date" />
          </label>
        </div>
        <div className="input-group">
          <label>
            Select Time
            <input type="time" name="time" id="time" min="04:00" max="23:00" />
          </label>
        </div>
        <div className="input-group">
          <label>
            Number of People
            <input type="number" name="people" id="people" />
          </label>
        </div>
        <input type="submit" value="create" />
      </form>
      {/* Button to change page delete later*/}
      <a href="/">
        <button type="button" style={{ background: "yellow" }}>
          Home
        </button>
      </a>
      {/* Button to change page delete later*/}
    </div>
  );
}

export default Create;
