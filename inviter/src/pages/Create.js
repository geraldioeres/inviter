import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import Select from "react-select";
import { Navigate, useNavigate } from "react-router-dom";
import { gql, useMutation, useQuery } from "@apollo/client";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/firebase-config";
import { getAuth } from "firebase/auth";
import "./Create.css";
import { ImCircleLeft } from "react-icons/im";

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
  let navigate = useNavigate();
  useEffect(() => {
    let authToken = sessionStorage.getItem("Auth Token");
    if (!authToken) {
      navigate("/login");
    }
  }, []);

  const auth = getAuth();
  const user = auth.currentUser;

  const { data } = useQuery(GET_CATEGORIES);
  const { data: cityData } = useQuery(GET_CITIES);
  const [insertActivity, { data: insertData, loading: insertLoading }] =
    useMutation(INSERT_ACTIVITY, { notifyOnNetworkStatusChange: true });
  const [cat, setCat] = useState();
  const [city, setCity] = useState();
  const [state, setstate] = useState({});
  const [image, setImage] = useState();
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
          insertActivity({
            variables: {
              object: {
                user_uid: user?.uid,
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
  };

  if (insertData !== undefined) {
    return (
      <Navigate
        to={`/activity/${insertData?.insert_project_fe_activities_one?.id}`}
      />
    );
  }

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="create">
      <div
        className="container"
        style={{ maxWidth: "600px", padding: "0 20px", margin: "50px auto" }}
      >
        <div className="create-wrapper">
          <h1 className="create-title">Create new activity</h1>
          <div onClick={goBack} className="new-top-left">
            <ImCircleLeft size={28} color="black" />
          </div>
          <form onSubmit={handleSubmit} className="create-form">
            <div className="category-group">
              <Select
                options={optionsCat}
                className="input-form category-input"
                name="category"
                id="category"
                placeholder="Choose category..."
                onChange={onChangeCat}
              />
            </div>
            <div className="create-input-group">
              <label className="create-label">Activity Cover</label>
              <input
                type="file"
                className="input-form"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
              />
            </div>
            <div className="create-input-group">
              <label className="create-label">Activity Title</label>
              <input
                type="text"
                className="input-form text-input"
                name="title"
                id="title"
                maxLength="53"
                placeholder="Type Title..."
                onChange={onChange}
              />
            </div>
            <div className="create-input-group">
              <label className="create-label">Activity Description</label>
              <textarea
                className="input-form textarea-input"
                name="description"
                id="description"
                maxLength="255"
                rows="3"
                placeholder="Type Description..."
                onChange={onChange}
              />
            </div>
            <div className="create-input-group city-group">
              <label className="create-label">Add City</label>
              <Select
                options={optionsCity}
                className="input-form"
                name="city"
                id="city"
                placeholder="Choose city..."
                onChange={onChangeCity}
              />
            </div>
            <div className="side-container">
              <div className="side-by-side">
                <label className="create-label-side">Select Date</label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  className="sbs-input"
                  onChange={onChange}
                />
              </div>
              <div className="side-by-side">
                <label className="create-label-side">Select Time</label>
                <input
                  type="time"
                  name="time"
                  id="time"
                  className="sbs-input"
                  min="04:00"
                  max="23:00"
                  onChange={onChange}
                />
              </div>
              <div className="side-by-side">
                <label className="create-label-side">Number of People</label>
                <input
                  type="number"
                  name="people"
                  id="people"
                  className="sbs-input"
                  onChange={onChange}
                />
              </div>
            </div>
            <button onClick={handleSubmit} className="create-button-2">
              Submit
            </button>
          </form>
          {insertLoading || uploading === true ? (
            <div className="loading-container">
              <span className="create-loading">Uploading data</span>
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default Create;
