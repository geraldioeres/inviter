import React, { useState } from "react";
import { useParams } from "react-router";
import { gql, useQuery, useMutation } from "@apollo/client";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/firebase-config";
import { AiFillHeart } from "react-icons/ai";
import { BsFillShareFill, BsFillPeopleFill } from "react-icons/bs";
import { HiLocationMarker } from "react-icons/hi";
import { BsFillCalendar2WeekFill } from "react-icons/bs";
import { BiTimeFive } from "react-icons/bi";
import { GrFlag } from "react-icons/gr";
import { NavLink } from "react-router-dom";
import "./Profile.css";

const GET_USER_DATA = gql`
  query MyQuery($uid: String!, $_eq: String!) {
    project_fe_users_by_pk(uid: $uid) {
      full_name
      uid
      email
      created_at
      photo_url
    }
    project_fe_joined(where: { user_uid: { _eq: $_eq } }) {
      activity {
        id
        title
        user_uid
        like
        number_of_people
        description
        date
        current_people
        time
        category_id
        user {
          full_name
          photo_url
        }
        city {
          name
        }
        image_url
      }
    }
  }
`;

const UPLOAD_PHOTO = gql`
  mutation MyMutation($uid: String!, $photo_url: String!) {
    update_project_fe_users_by_pk(
      pk_columns: { uid: $uid }
      _set: { photo_url: $photo_url }
    ) {
      id
    }
  }
`;

function Profile() {
  const { uid } = useParams();
  const [image, setImage] = useState();
  const [uploading, setUploading] = useState(false);

  const { data, loading } = useQuery(GET_USER_DATA, {
    variables: { uid: uid, _eq: uid },
  });
  const [uploadPhoto, { loading: loadingUpload }] = useMutation(UPLOAD_PHOTO, {
    refetchQueries: [GET_USER_DATA],
  });

  const handleUploadPhoto = () => {
    if (image === undefined) return;
    const storageRef = ref(storage, `/profiles/${image?.name}`);
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
          uploadPhoto({
            variables: {
              uid: uid,
              photo_url: downloadURL,
            },
          });
        });
      }
    );
  };

  return (
    <div>
      {loading ? (
        <div className="loading-profile">
          {" "}
          <Spinner animation="border" variant="dark" />
        </div>
      ) : (
        <>
          <div className="profile">
            <div className="profile-wrapper">
              <Row>
                <Col xs={3}>
                  <img
                    src={data?.project_fe_users_by_pk?.photo_url}
                    alt="profile"
                    className="profile-photo"
                  />
                </Col>
                <Col>
                  <h1 className="profile-name">
                    {data?.project_fe_users_by_pk?.full_name}
                  </h1>
                  <h2 className="profile-email">
                    {data?.project_fe_users_by_pk?.email}
                  </h2>
                  <input
                    type="file"
                    onChange={(e) => {
                      setImage(e.target.files[0]);
                    }}
                  />
                </Col>
                <Col>
                <div className="upload-profile">
                  <button onClick={handleUploadPhoto} style={{ width: "6rem" }} className="upload-button">
                    Upload
                  </button>
                  </div>
                  {loadingUpload || uploading === true ? (
                    <h4>Uploading image</h4>
                  ) : (
                    ""
                  )}
                </Col>
              </Row>
            </div>
          </div>
          <h1 className="joined-activity">Joined Activity</h1>
          <div className="profile-border">
            <hr className="profile-line" align="center" />
          </div>
          <Container style={{ paddingTop: "10px", paddingBottom: "50px" }}>
            <Row>
              {data?.project_fe_joined?.map((val) => (
                <Col xs={5} className="variant1" key={val.activity.id}>
                  <div className="card" style={{ borderRadius: "10px" }}>
                    <div className="card-title">
                      <h4 className="title">{val.activity.title}</h4>
                    </div>
                    <div className="card-image">
                      <img
                        className="activity-image"
                        src={val.activity.image_url}
                        alt="activity-img"
                      />
                      <div className="top-left">
                        <HiLocationMarker /> {val.activity.city.name}
                      </div>
                      <div className="bottom-left">
                        <img
                          className="host-image"
                          src={val.activity.user.photo_url}
                          alt="host-img"
                        />
                        <h6 className="host-tag">host</h6>
                        <p className="host-name">
                          {val.activity.user.full_name}
                        </p>
                      </div>
                      <div className="bottom-right">
                        <div className="people">
                          <BsFillPeopleFill /> {val.activity.current_people} /{" "}
                          {val.activity.number_of_people}
                        </div>
                        <NavLink
                          to={`/activity/${val.activity.id}`}
                          className="details-link"
                          replace
                        >
                          <button className="details-button">Details</button>
                        </NavLink>
                      </div>
                    </div>
                    <div className="card-stats">
                      <Row style={{ paddingTop: "50px" }}>
                        <Col className="stats-col">
                          <div className="centered">
                            <BsFillCalendar2WeekFill
                              size={16}
                              className="date-icon"
                            />
                            <span>{val.activity.date}</span>
                          </div>
                        </Col>
                        <Col className="stats-col" xs={5}>
                          <div className="centered">
                            <BiTimeFive size={16} className="time-icon" />
                            <span>{val.activity.time.slice(0, 5)}</span>
                          </div>
                        </Col>
                      </Row>
                      <Row style={{ paddingTop: "12px" }}>
                        <Col className="stats-col">
                          <AiFillHeart size={22} color="deeppink" />
                          <p className="stats-text">{val.activity.like}</p>
                        </Col>
                        <Col className="stats-col">
                          <BsFillShareFill />
                          <p className="stats-text">share</p>
                        </Col>
                        <Col className="stats-col">
                          <GrFlag />
                          <p className="stats-text">Report</p>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </>
      )}
    </div>
  );
}

export default Profile;
