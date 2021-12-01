import { useMutation, useQuery } from "@apollo/client";
import { Row, Col, Spinner } from "react-bootstrap";
import gql from "graphql-tag";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import Navbar from "../components/Navbar";
import "./Details.css";
import { BiChevronRight } from "react-icons/bi";
import { FaRunning, FaRegClock, FaRegSadTear } from "react-icons/fa";
import { MdDateRange, MdLocationCity } from "react-icons/md";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsFillShareFill } from "react-icons/bs";
import { GrFlag } from "react-icons/gr";
import { GiPartyPopper } from "react-icons/gi";
import { BsFillPeopleFill } from "react-icons/bs";

const GET_ACTIVITY = gql`
  query MyQuery($id: Int!, $_eq: String = "", $_eq1: String = "") {
    project_fe_activities_by_pk(id: $id) {
      id
      title
      description
      category {
        id
        name
      }
      city {
        id
        name
      }
      date
      time
      current_people
      number_of_people
      user {
        uid
        full_name
        photo_url
      }
      image_url
      joiners(where: { user_uid: { _eq: $_eq } }) {
        user_uid
      }
      likes(where: { user_uid: { _eq: $_eq1 } }) {
        user_uid
      }
      likes_aggregate {
        aggregate {
          count
        }
      }
      joiners_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`;

const DELETE_ACTIVITY = gql`
  mutation MyMutation($id: Int!) {
    delete_project_fe_activities_by_pk(id: $id) {
      id
    }
  }
`;

const JOIN_ACTIVITY = gql`
  mutation MyMutation($object: project_fe_joined_insert_input = {}) {
    insert_project_fe_joined_one(object: $object) {
      id
    }
  }
`;

const CANCEL_JOINED_ACTIVITY = gql`
  mutation MyMutation($_eq: Int!, $_eq1: String!) {
    delete_project_fe_joined(
      where: { _and: { activity_id: { _eq: $_eq }, user_uid: { _eq: $_eq1 } } }
    ) {
      affected_rows
    }
  }
`;
const LIKE_ACTIVITY = gql`
  mutation MyMutation($object: project_fe_likes_insert_input = {}) {
    insert_project_fe_likes_one(object: $object) {
      id
    }
  }
`;

const CANCEL_LIKE = gql`
  mutation MyMutation($_eq: Int!, $_eq1: String!) {
    delete_project_fe_likes(
      where: { _and: { activity_id: { _eq: $_eq }, user_uid: { _eq: $_eq1 } } }
    ) {
      affected_rows
    }
  }
`;
function Details() {
  const auth = getAuth();
  const user = auth.currentUser;

  const { id } = useParams();
  const { data, loading } = useQuery(GET_ACTIVITY, {
    variables: { id: id, _eq: user?.uid, _eq1: user?.uid },
  });
  const [deleteActivity, { data: dataDelete, loading: loadingDelete }] =
    useMutation(DELETE_ACTIVITY, {
      refetchQueries: [GET_ACTIVITY],
      notifyOnNetworkStatusChange: true,
    });

  const [joinActivity, { loading: loadingJoin }] = useMutation(JOIN_ACTIVITY, {
    refetchQueries: [GET_ACTIVITY],
    notifyOnNetworkStatusChange: true,
  });

  const [cancelJoin, { loading: loadingCancel }] = useMutation(
    CANCEL_JOINED_ACTIVITY,
    {
      refetchQueries: [GET_ACTIVITY],
      notifyOnNetworkStatusChange: true,
    }
  );

  const [likeActivity, { loading: loadingLike }] = useMutation(LIKE_ACTIVITY, {
    refetchQueries: [GET_ACTIVITY],
  });

  const [cancelLike, { loading: loadingCancelLike }] = useMutation(
    CANCEL_LIKE,
    {
      refetchQueries: [GET_ACTIVITY],
    }
  );

  const handleDelete = () => {
    deleteActivity({
      variables: {
        id: id,
      },
    });
  };

  const dataDetails = data?.project_fe_activities_by_pk;

  const handleJoin = () => {
    joinActivity({
      variables: {
        object: {
          activity_id: dataDetails?.id,
          user_uid: user?.uid,
        },
      },
    });
  };

  const handleCancel = () => {
    cancelJoin({
      variables: {
        _eq: dataDetails?.id,
        _eq1: user?.uid,
      },
    });
  };

  const handleLike = () => {
    likeActivity({
      variables: {
        object: {
          activity_id: dataDetails?.id,
          user_uid: user?.uid,
        },
      },
    });
  };

  const handleCancelLike = () => {
    cancelLike({
      variables: {
        _eq: dataDetails?.id,
        _eq1: user?.uid,
      },
    });
  };

  let navigate = useNavigate();

  const [state, setState] = useState(false);

  useEffect(() => {
    let authToken = sessionStorage.getItem("Auth Token");
    if (authToken) {
      setState(true);
    }
  }, []);

  console.log(loadingJoin);
  console.log(loadingCancel);
  console.log(dataDetails);

  return (
    <div className="details-page">
      <Navbar />
      {loadingDelete ? (
        <div className="loading-detail">
          <Spinner animation="border" variant="danger" />
        </div>
      ) : dataDelete || dataDetails === null ? (
        <div className="loading-detail loading-not-found">
          <span className="loading-not-found">Data Not Found or Has Been Deleted</span>
          <FaRegSadTear style={{paddingTop: "-1px"}} />
        </div>
      ) : loading ? (
        <div className="loading-detail">
          <Spinner animation="border" variant="dark" />
        </div>
      ) : (
        <>
          <div className="detail">
            <div
              className="container"
              style={{
                maxWidth: "1100px",
                padding: "0 20px",
                margin: "50px auto",
              }}
            >
              <div className="detail-wrapper">
                <Row>
                  <Col sm={7} className="detail-col">
                    <img
                      src={dataDetails?.image_url}
                      alt="activity"
                      className="image-detail"
                    />
                    <div className="cat-city-detail">
                      {dataDetails?.city.name}
                      <BiChevronRight className="right-icon" />
                      {dataDetails?.category.name}
                      <BiChevronRight className="right-icon" />
                    </div>
                    <h1 className="title-detail">{dataDetails?.title}</h1>
                    <div className="host-detail">
                      <img
                        src={dataDetails?.user.photo_url}
                        alt="user-profile"
                        className="host-photo-detail"
                      />
                      <h6 className="host-tag-detail">Hosted By</h6>
                      <h5 className="host-name-detail">
                        {dataDetails?.user.full_name}
                      </h5>
                    </div>
                    <div className="nutshell-detail">
                      <h4 className="nutshell-title">
                        The activity in a nutshell
                      </h4>
                      <Row className="nutshell-row">
                        <Col>
                          <div className="nutshell-tag">Type of activity</div>
                          <div className="nutshell-data">
                            <FaRunning
                              size={21}
                              color="#964362"
                              className="nutshell-icons"
                            />
                            {dataDetails?.category.name}
                          </div>
                        </Col>
                        <Col>
                          <div className="nutshell-tag">City of activity</div>
                          <div className="nutshell-data">
                            <MdLocationCity
                              size={21}
                              color="#964362"
                              className="nutshell-icons"
                            />
                            {dataDetails?.city.name}
                          </div>
                        </Col>
                      </Row>
                      <Row className="nutshell-row">
                        <Col>
                          <div className="nutshell-tag">Date of activity</div>
                          <div className="nutshell-data">
                            <MdDateRange
                              size={21}
                              color="#964362"
                              className="nutshell-icons"
                            />
                            {dataDetails?.date}, {dataDetails?.time.slice(0, 5)}
                          </div>
                        </Col>
                        <Col>
                          <div className="nutshell-tag">Time of activity</div>
                          <div className="nutshell-data">
                            <FaRegClock
                              size={21}
                              color="#964362"
                              className="nutshell-icons"
                            />
                            {dataDetails?.time.slice(0, 5)}
                          </div>
                        </Col>
                      </Row>
                    </div>
                    <div className="about-detail">
                      <h4 className="about-title">About the activity</h4>
                      <p className="about-description">
                        {dataDetails?.description}
                      </p>
                    </div>
                  </Col>
                  <Col sm={5} className="detail-col">
                    <div className="container-detail">
                      {state ? (
                        user?.uid === dataDetails?.user.uid ? (
                          <>
                            <div className="top-right-detail">
                              <Row className="top-right-row-1">
                                <Col>
                                  <div className="like-people-detail">
                                    <AiFillHeart
                                      size={25}
                                      color="deeppink"
                                      style={{
                                        marginRight: "10px",
                                        marginTop: "-3px",
                                      }}
                                    />
                                    {
                                      dataDetails?.likes_aggregate.aggregate
                                        .count
                                    }
                                  </div>
                                </Col>
                                <Col>
                                  <div className="like-people-detail">
                                    <BsFillPeopleFill
                                      size={23}
                                      color="purple"
                                      style={{
                                        marginRight: "10px",
                                        marginTop: "-3px",
                                      }}
                                    />
                                    {
                                      dataDetails?.joiners_aggregate.aggregate
                                        .count
                                    }{" "}
                                    / {dataDetails?.number_of_people}
                                  </div>
                                </Col>
                              </Row>
                              <Row className="top-right-row">
                                <Col>
                                  <div
                                    className="top-right-element"
                                    onClick={
                                      dataDetails?.likes[0]?.user_uid
                                        ? handleCancelLike
                                        : handleLike
                                    }
                                  >
                                    {dataDetails?.likes[0]?.user_uid ? (
                                      <AiFillHeart size={23} color="deeppink" />
                                    ) : (
                                      <AiOutlineHeart size={23} />
                                    )}
                                  </div>
                                </Col>
                                <Col>
                                  <div className="top-right-element">
                                    <BsFillShareFill size={17} />
                                  </div>
                                </Col>
                                <Col>
                                  <div className="top-right-element">
                                    <GrFlag size={16} />
                                  </div>
                                </Col>
                              </Row>
                              <div className="edit-detail-button">
                                <Link to={"edit"} className="details-link">
                                  <button
                                    type="button"
                                    style={{
                                      color: "white",
                                    }}
                                    className="d-edit-button"
                                  >
                                    Edit
                                  </button>
                                </Link>
                              </div>
                              <div className="delete-detail-button">
                                <button
                                  type="button"
                                  style={{ color: "white" }}
                                  onClick={handleDelete}
                                  className="delete-button"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="top-right-detail">
                              {dataDetails?.joiners[0]?.user_uid ? (
                                <div className="status-detail">
                                  You have joined this activity
                                  <GiPartyPopper />
                                </div>
                              ) : (
                                <div className="status-detail">
                                  You haven't joined this activity
                                </div>
                              )}
                              <hr className="border-line" align="center" />
                              <Row className="top-right-row-1">
                                <Col>
                                  <div className="like-people-detail">
                                    <AiFillHeart
                                      size={25}
                                      color="deeppink"
                                      style={{
                                        marginRight: "10px",
                                        marginTop: "-3px",
                                      }}
                                    />
                                    {
                                      dataDetails?.likes_aggregate.aggregate
                                        .count
                                    }
                                  </div>
                                </Col>
                                <Col>
                                  <div className="like-people-detail">
                                    <BsFillPeopleFill
                                      size={23}
                                      color="purple"
                                      style={{
                                        marginRight: "10px",
                                        marginTop: "-3px",
                                      }}
                                    />
                                    {
                                      dataDetails?.joiners_aggregate.aggregate
                                        .count
                                    }{" "}
                                    / {dataDetails?.number_of_people}
                                  </div>
                                </Col>
                              </Row>
                              <Row className="top-right-row">
                                <Col>
                                  <div
                                    className="top-right-element"
                                    onClick={
                                      dataDetails?.likes[0]?.user_uid
                                        ? handleCancelLike
                                        : handleLike
                                    }
                                  >
                                    {dataDetails?.likes[0]?.user_uid ? (
                                      <AiFillHeart size={23} color="deeppink" />
                                    ) : (
                                      <AiOutlineHeart size={23} />
                                    )}
                                  </div>
                                </Col>
                                <Col>
                                  <div className="top-right-element">
                                    <BsFillShareFill size={17} />
                                  </div>
                                </Col>
                                <Col>
                                  <div className="top-right-element">
                                    <GrFlag size={16} />
                                  </div>
                                </Col>
                              </Row>
                              <div className="join-detail-button">
                                <div className="details-link">
                                  {dataDetails?.joiners[0]?.user_uid ? (
                                    loadingCancel ? (
                                      <div className="loading-right">
                                        <Spinner
                                          animation="border"
                                          variant="danger"
                                        />
                                      </div>
                                    ) : (
                                      <button
                                        type="button"
                                        style={{
                                          color: "white",
                                        }}
                                        className="cancel-button"
                                        onClick={handleCancel}
                                      >
                                        Cancel Join?
                                      </button>
                                    )
                                  ) : loadingJoin ? (
                                    <div className="loading-right">
                                      <Spinner
                                        animation="border"
                                        variant="primary"
                                      />
                                    </div>
                                  ) : (
                                    <button
                                      type="button"
                                      style={{
                                        color: "white",
                                      }}
                                      className="join-button"
                                      onClick={handleJoin}
                                    >
                                      Join Activity!
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </>
                        )
                      ) : (
                        <>
                          <div className="top-right-detail">
                            <div className="login-detail">
                              Login To Join Activity
                            </div>
                            <div className="login-detail-button">
                              <button
                                type="button"
                                style={{
                                  color: "white",
                                }}
                                className="d-login-button"
                                onClick={() => navigate("/login")}
                              >
                                Login
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Details;
