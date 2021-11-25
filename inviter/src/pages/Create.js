import React, { useState } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { gql, useMutation, useQuery } from "@apollo/client";

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

// const INSERT_ACTIVITY = gql`
//   mutation MyMutation($objects: [project_fe_activities_insert_input!] = {}) {
//     insert_project_fe_activities(objects: $objects) {
//       returning {
//         id
//       }
//     }
//   }
// `;
const INSERT_ACTIVITY = gql`
  mutation MyMutation($object: project_fe_activities_insert_input = {}) {
    insert_project_fe_activities_one(object: $object) {
      id
    }
  }
`;

function Create() {
  const { data } = useQuery(GET_CATEGORIES);
  const { data: cityData } = useQuery(GET_CITIES);
  const [insertActivity, { data: insertData, loading: insertLoading }] =
    useMutation(INSERT_ACTIVITY);
  const [cat, setCat] = useState();
  const [city, setCity] = useState();
  const [state, setstate] = useState({});

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
  });

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

  let navigate = useNavigate();

  function handleClick() {
    navigate(`/activity/${insertData?.insert_project_fe_activities_one?.id}`);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    insertActivity({
      variables: {
        object: {
          user_id: 2,
          title: state.title,
          description: state.description,
          date: state.date,
          time: state.time,
          number_of_people: state.people,
          category_id: cat,
          city_id: city,
        },
      },
    });
  };

  console.log(insertData?.insert_project_fe_activities_one?.id)
  if (insertData !== undefined) {
    handleClick()
  }

  return (
    <div className="create">
      <h1>Create new activity</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>
            <Select
              options={optionsCat}
              className="input-form"
              name="category"
              id="category"
              placeholder="Choose category..."
              onChange={onChangeCat}
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
              onChange={onChange}
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
              maxLength="255"
              placeholder="Type Description..."
              onChange={onChange}
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
              onChange={onChangeCity}
            />
          </label>
        </div>
        <div className="input-group">
          <label>
            Select Date
            <input type="date" name="date" id="date" onChange={onChange} />
          </label>
        </div>
        <div className="input-group">
          <label>
            Select Time
            <input
              type="time"
              name="time"
              id="time"
              min="04:00"
              max="23:00"
              onChange={onChange}
            />
          </label>
        </div>
        <div className="input-group">
          <label>
            Number of People
            <input
              type="number"
              name="people"
              id="people"
              onChange={onChange}
            />
          </label>
        </div>
        <button onClick={handleSubmit}>Submit</button>
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
