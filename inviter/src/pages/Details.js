import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import "./Details.css";

// const GET_ACTIVITY = gql`
//   query MyQuery($id: Int!, $_eq: String!) {
//     project_fe_activities_by_pk(id: $id) {
//       id
//       title
//       description
//       category {
//         id
//         name
//       }
//       city {
//         id
//         name
//       }
//       date
//       time
//       current_people
//       number_of_people
//       user {
//         uid
//         full_name
//       }
//       image_url
//       joiners(where: { user_uid: { _eq: $_eq } }) {
//         id
//       }
//     }
//   }
// `;
const GET_ACTIVITY = gql`
  query MyQuery($id: Int!, $_eq: String!, $_eq1: String = "") {
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

  console.log(dataDetails);

  return (
    <div>
      {loadingDelete ? (
        <h1>Deleting data...</h1>
      ) : dataDelete ? (
        <h1>Data Not Found or Has Been Deleted</h1>
      ) : loading ? (
        <h1>Loading data...</h1>
      ) : (
        <>
          <h1 className="title-detail">{dataDetails?.title}</h1>
          <img
            src={dataDetails?.image_url}
            alt="activity"
            className="image-detail"
          />
          <div className="host-detail">
            <h5>Hosted By</h5>
            <h4>{dataDetails?.user.full_name}</h4>
          </div>
          <div className="people-detail">
            <p>
              {dataDetails?.current_people} / {dataDetails?.number_of_people}
            </p>
          </div>
          <div className="like-detail">
            likes: {dataDetails?.likes_aggregate.aggregate.count}{" "}
            <button
              onClick={
                dataDetails?.likes[0]?.user_uid ? handleCancelLike : handleLike
              }
            >
              Likes
            </button>
          </div>
          <div className="share-detail">Share</div>
          <div className="category-detail">{dataDetails?.category.name}</div>
          <div className="city-detail">{dataDetails?.city.name}</div>
          <div className="date-detail">{dataDetails?.date}</div>
          <div className="time-detail">{dataDetails?.time.slice(0, 5)}</div>
          <div className="description-detail">{dataDetails?.description}</div>
          {user?.uid == dataDetails?.user.uid ? (
            <>
              <Link to={"edit"} className="details-link">
                <button
                  type="button"
                  style={{ background: "purple", color: "white" }}
                >
                  Edit
                </button>
              </Link>
              <button
                type="button"
                style={{ background: "red", color: "white" }}
                onClick={handleDelete}
              >
                Delete
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className="join-button"
                onClick={handleJoin}
              >
                Join Activity
              </button>
              <button
                type="button"
                className="join-button"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </>
          )}
          <a href="/">
            <button type="button" style={{ background: "yellow" }}>
              Home
            </button>
          </a>
          {loadingJoin ? (
            <h1>Joining activity...</h1>
          ) : loadingCancel ? (
            <h1>Cancel join activity...</h1>
          ) : (
            ""
          )}
          {dataDetails?.joiners[0]?.user_uid ? (
            <h1>Joined</h1>
          ) : (
            <h1>Not yet joined</h1>
          )}
        </>
      )}
    </div>
  );
}

export default Details;
