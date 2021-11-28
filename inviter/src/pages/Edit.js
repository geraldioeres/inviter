import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { gql, useMutation, useQuery } from "@apollo/client";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../firebase/firebase-config";

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

const EDIT_DATA = gql`
  mutation MyMutation($id: Int!, $_set: project_fe_activities_set_input = {}) {
    update_project_fe_activities_by_pk(pk_columns: { id: $id }, _set: $_set) {
      id
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
  const [updateData, { data: editData, loading: loadingEdit }] = useMutation(
    EDIT_DATA,
    { notifyOnNetworkStatusChange: true }
  );

  const [state, setstate] = useState();
  const [cat, setCat] = useState();
  const [city, setCity] = useState();
  const [image, setImage] = useState();
  const [uploading, setUploading] = useState(false);

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

  const handleUpdate = (e) => {
    e.preventDefault();
    if (image === undefined) {
      updateData({
        variables: {
          id: id,
          _set: {
            category_id: cat,
            title: state.title,
            description: state.description,
            city_id: city,
            date: state.date,
            time: state.time,
            number_of_people: state.number_of_people,
          },
        },
      });
    } else {
      const storageRef = ref(storage, `/images/${image?.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);
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
            updateData({
              variables: {
                id: id,
                _set: {
                  category_id: cat,
                  image_url: downloadURL,
                  title: state.title,
                  description: state.description,
                  city_id: city,
                  date: state.date,
                  time: state.time,
                  number_of_people: state.number_of_people,
                },
              },
            });
          });
        }
      );
    }
  };

  // const handleUpdate = (e) => {
  //   e.preventDefault();
  //   updateData({
  //     variables: {
  //       id: id,
  //       _set: {
  //         category_id: cat,
  //         title: state.title,
  //         description: state.description,
  //         city_id: city,
  //         date: state.date,
  //         time: state.time,
  //         number_of_people: state.number_of_people,
  //       },
  //     },
  //   });
  // };

  let navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <h1>Edit page</h1>
      {loading ? (
        <h1>Loading data...</h1>
      ) : state && catData && cityData ? (
        <form onSubmit={handleUpdate}>
          <div className="edit-group">
            <label>
              <Select
                // defaultValue={{label: state?.category.id, value: state?.category.name}}
                defaultValue={optionsCat[state?.category_id - 1]}
                options={optionsCat}
                className="edit-form"
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
                name="number_of_people"
                id="number_of_people"
                value={state?.number_of_people || ""}
                onChange={onChange}
              />
            </label>
          </div>
          <button onClick={handleUpdate}>Submit</button>
        </form>
      ) : (
        <h1>Loading data...</h1>
      )}
      <a href="/">
        <button type="button" style={{ background: "yellow" }}>
          Home
        </button>
      </a>
      <button
        type="button"
        onClick={goBack}
        style={{ background: "blue", color: "white" }}
      >
        Back
      </button>
      {loadingEdit || uploading === true ? (
        <h1>Updating activity data</h1>
      ) : editData !== undefined ? (
        <h1>Successfully update activity</h1>
      ) : (
        ""
      )}
    </div>
  );
}

export default Edit;
