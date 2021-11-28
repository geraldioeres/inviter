import React, { useState } from "react";
import Select from "react-select";
import { Navigate } from "react-router-dom";
import { gql, useMutation, useQuery } from "@apollo/client";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../firebase/firebase-config";

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
    useMutation(INSERT_ACTIVITY, { notifyOnNetworkStatusChange: true });
  const [cat, setCat] = useState();
  const [city, setCity] = useState();
  const [state, setstate] = useState({});
  const [image, setImage] = useState();
  const [url, setUrl] = useState();
  const [uploading, setUploading] = useState(false);

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

  const handleSubmit = (e) => {
    if (image === undefined) return;
    const storageRef = ref(storage, `/images/${image?.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
    e.preventDefault();
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            setUploading(true);
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setUploading(false);
          setUrl(downloadURL);
          insertActivity({
            variables: {
              object: {
                user_id: 2,
                image_url: downloadURL,
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
        });
      }
    );
    console.log(url);
  };

  console.log(insertData);

  if (insertData !== undefined) {
    return (
      <Navigate
        to={`/activity/${insertData?.insert_project_fe_activities_one?.id}`}
      />
    );
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
          <input
            type="file"
            className="input-form"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          />
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
      {insertLoading || uploading === true ? <h1>Uploading data...</h1> : ""}
    </div>
  );
}

export default Create;
