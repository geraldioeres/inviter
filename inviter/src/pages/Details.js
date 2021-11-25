import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import { useParams } from "react-router";

const GET_ACTIVITY = gql`
  query MyQuery($id: Int!) {
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
        id
        full_name
      }
      like
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

function Details() {
  const { id } = useParams();
  const { data } = useQuery(GET_ACTIVITY, { variables: { id: id } });
  const [deleteActivity, { data: deleteData }] = useMutation(DELETE_ACTIVITY, {
    refetchQueries: [GET_ACTIVITY],
  });

  const handleDelete = () => {
    deleteActivity({
      variables: {
        id: id,
      },
    });
  };

  const dataDetails = data?.project_fe_activities_by_pk;

  return (
    <div>
      <h1 className="title-detail">{dataDetails?.title}</h1>
      <div className="host-detail">
        <h5>Hosted By</h5>
        <h4>{dataDetails?.user.full_name}</h4>
      </div>
      <div className="people-detail">
        <p>
          {dataDetails?.current_people} / {dataDetails?.number_of_people}
        </p>
      </div>
      <div className="like-detail">{dataDetails?.like}</div>
      <div className="share-detail">Share</div>
      <div className="category-detail">{dataDetails?.category.name}</div>
      <div className="city-detail">{dataDetails?.city.name}</div>
      <div className="date-detail">{dataDetails?.date}</div>
      <div className="time-detail">{dataDetails?.time.slice(0, 5)}</div>
      <div className="description-detail">{dataDetails?.description}</div>
      <button type="button" className="join-button">
        Join Activity
      </button>
      {/* Temporary Button Delete Later */}
      <button
        type="button"
        style={{ background: "red" }}
        onClick={handleDelete}
      >
        Delete
      </button>
      <a href="/">
        <button type="button" style={{ background: "yellow" }}>
          Home
        </button>
      </a>
      {/* Temporary Button Delete Later */}
    </div>
  );
}

export default Details;
