import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useParams } from "react-router";
import { gql, useQuery } from "@apollo/client";

const GET_CURRENT_ACTIVITY = gql`
  query MyQuery($id: Int!) {
    project_fe_activities_by_pk(id: $id) {
      title
      description
      date
      time
      number_of_people
      city_id
      category_id
    }
  }
`;

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

function Edit() {
  const { id } = useParams();
  const { data, loading } = useQuery(GET_CURRENT_ACTIVITY, {
    variables: { id: id },
  });
  const { data: catData } = useQuery(GET_CATEGORIES);
  const { data: cityData } = useQuery(GET_CITIES);

  const [state, setstate] = useState();
  const [cat, setCat] = useState();
  const [city, setCity] = useState();

  //Start Options Area
  const optionsCat = catData?.project_fe_categories?.map((obj) => {
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
  });
  //End Options Area

  useEffect(() => {
    if (data?.project_fe_activities_by_pk) {
      setstate(data?.project_fe_activities_by_pk);
      setCat(data?.project_fe_activities_by_pk?.category_id);
      setCity(data?.project_fe_activities_by_pk?.city_id);
    }
  }, [data?.project_fe_activities_by_pk]);

  console.log(state);
  console.log(cat, city);

  const onChange = (e) => {
    setstate({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeCat = (e) => {
    setCat(e.value);
  };

  const onChangeCity = (e) => {
    setCity(e.value);
  };

  return (
    <div>
      <h1>Edit page</h1>
      {loading ? (
        <h1>Loading data...</h1>
      ) : state && catData && cityData ? (
        <>
          <div className="edit-group">
            <label>
              <Select
                // defaultValue={{label: state?.category.id, value: state?.category.name}}
                defaultValue={optionsCat[state?.category_id]}
                options={optionsCat}
                className="edit-form"
                name="category"
                id="category"
                placeholder="Choose category..."
                onChange={onChangeCat}
              />
            </label>
          </div>
          <div className="edit-group">
            <label>
              Activity Title
              <input
                type="text"
                className="edit-form"
                name="title"
                id="title"
                maxLength="60"
                placeholder="Type Title..."
                value={state?.title || ""}
                onChange={onChange}
              />
            </label>
          </div>
          <div className="edit-group">
            <label>
              Activity Description
              <textarea
                className="edit-form"
                name="description"
                id="description"
                maxLength="255"
                placeholder="Type Description..."
                value={state?.description || ""}
                onChange={onChange}
              />
            </label>
          </div>
          <div className="edit-group">
            <label>
              <Select
                defaultValue={optionsCity[state?.city_id]}
                options={optionsCity}
                className="edit-form"
                name="city"
                id="city"
                placeholder="Choose city..."
                onChange={onChangeCity}
              />
            </label>
          </div>
          <div className="edit-group">
            <label>
              Select Date
              <input
                type="date"
                name="date"
                id="date"
                value={state?.date || ""}
                onChange={onChange}
              />
            </label>
          </div>
          <div className="edit-group">
            <label>
              Select Time
              <input
                type="time"
                name="time"
                id="time"
                min="04:00"
                max="23:00"
                value={state?.time.slice(0, 5) || ""}
                onChange={onChange}
              />
            </label>
          </div>
          <div className="edit-group">
            <label>
              Number of People
              <input
                type="number"
                name="people"
                id="people"
                value={state?.number_of_people || ""}
                onChange={onChange}
              />
            </label>
          </div>
        </>
      ) : (
        <h1>Loading data...</h1>
      )}
      <a href="/">
        <button type="button" style={{ background: "yellow" }}>
          Home
        </button>
      </a>
    </div>
  );
}

export default Edit;
