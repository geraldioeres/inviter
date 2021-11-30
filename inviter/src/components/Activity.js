import React, { useState } from "react";
import "./Activity.css";
import { Container, Row, Col } from "react-bootstrap";
import Img1 from "../assests/images/img1.jpg";
import Profile from "../assests/images/profile2.jpg";
import { AiFillHeart } from "react-icons/ai";
import { BsFillShareFill, BsFillPeopleFill } from "react-icons/bs";
import { HiLocationMarker } from "react-icons/hi";
import { BsFillCalendar2WeekFill } from "react-icons/bs";
import { BiTimeFive } from "react-icons/bi";
import { GrFlag } from "react-icons/gr";
import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

const GET_ACTIVITIES = gql`
  query MyQuery($order_by: [project_fe_activities_order_by!] = {}) {
    project_fe_activities(order_by: $order_by) {
      id
      title
      user_uid
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

function Activity() {
  const [filter, setFilter] = useState({});

  const { data } = useQuery(GET_ACTIVITIES, {
    variables: {
      order_by: filter,
    },
  });

  return (
    <div className="activity">
      <h3 className="activity-header">Hey! They are looking for you now</h3>
      <Row>
        <Col xs={1} style={{ marginLeft: "105px" }}>
          <span className="filter" onClick={() => setFilter({})}>
            All
          </span>
        </Col>
        <Col xs={1}>
          <span
            className="filter"
            onClick={() => setFilter({ created_at: "desc" })}
          >
            Recent
          </span>
        </Col>
        <Col xs={1}>
          <span
            className="filter"
            onClick={() =>
              setFilter({
                likes_aggregate: {
                  count: "desc",
                },
              })
            }
          >
            Popular
          </span>
        </Col>
      </Row>
      <Container style={{ paddingTop: "10px", paddingBottom: "50px" }}>
        <Row>
          {data?.project_fe_activities?.map((val) => (
            <Col xs={5} className="variant1" key={val.id}>
              <div className="card" style={{ borderRadius: "10px" }}>
                <div className="card-title">
                  <h4 className="title">{val.title}</h4>
                </div>
                <div className="card-image">
                  <img
                    className="activity-image"
                    src={val.image_url}
                    alt="activity-img"
                  />
                  <div className="top-left">
                    <HiLocationMarker /> {val.city.name}
                  </div>
                  <div className="bottom-left">
                    <img
                      className="host-image"
                      src={val.user.photo_url}
                      alt="host-img"
                    />
                    <h6 className="host-tag">host</h6>
                    <p className="host-name">{val.user.full_name}</p>
                  </div>
                  <div className="bottom-right">
                    <div className="people">
                      <BsFillPeopleFill /> {val.joiners_aggregate.aggregate.count} /{" "}
                      {val.number_of_people}
                    </div>
                    <Link to={`activity/${val.id}`} className="details-link">
                      <button className="details-button">Details</button>
                    </Link>
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
                        <span>{val.date}</span>
                      </div>
                    </Col>
                    <Col className="stats-col" xs={5}>
                      <div className="centered">
                        <BiTimeFive size={16} className="time-icon" />
                        <span>{val.time.slice(0, 5)}</span>
                      </div>
                    </Col>
                  </Row>
                  <Row style={{ paddingTop: "12px" }}>
                    <Col className="stats-col">
                      <AiFillHeart size={22} color="deeppink" />
                      <p className="stats-text">
                        {val.likes_aggregate.aggregate.count}
                      </p>
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
    </div>
  );
}

export default Activity;
