import React from "react";
import "./Activity.css";
import { Col, Container, Row } from "react-bootstrap";
import Img1 from "../assests/images/img1.jpg";
import Profile from "../assests/images/profile2.jpg";
import { AiFillHeart } from "react-icons/ai";
import { BsFillShareFill, BsFillPeopleFill } from "react-icons/bs";
import { HiLocationMarker } from "react-icons/hi";
import { BsFillCalendar2WeekFill } from "react-icons/bs";
import { BiTimeFive } from "react-icons/bi";
import { GrFlag } from "react-icons/gr";
import { gql, useQuery } from "@apollo/client";

const GET_ACTIVITIES = gql`
query MyQuery {
  project_fe_activities {
    id
    title
    user_id
    like
    number_of_people
    description
    date
    current_people
    time
    category_id
    user {
      full_name
    }
    city {
      name
    }
  }
}
`;

function Activity() {
  const { data } = useQuery(GET_ACTIVITIES);
  return (
    <div>
      <h3>Hey! They are looking for you now</h3>
      <Container style={{ paddingTop: "10px", paddingBottom: "50px" }}>
        <Row>
          {data?.project_fe_activities?.map((val) => (
            <Col xs={5} className="variant1">
              <div className="card" style={{ borderRadius: "10px" }}>
                <div className="card-title">
                  <h4 className="title">{val.title}</h4>
                </div>
                <div className="card-image">
                  <img
                    className="activity-image"
                    src={Img1}
                    alt="activity-img"
                  />
                  <div className="top-left">
                    <HiLocationMarker /> {val.city.name}
                  </div>
                  <div className="bottom-left">
                    <img className="host-image" src={Profile} alt="host-img" />
                    <h6 className="host-tag">host</h6>
                    <p className="host-name">{val.user.full_name}</p>
                  </div>
                  <div className="bottom-right">
                    <div className="people">
                      <BsFillPeopleFill /> {val.current_people} /{" "}
                      {val.number_of_people}
                    </div>
                    <button className="details-button">Details</button>
                  </div>
                </div>
                <div className="card-stats">
                <Row style={{ paddingTop: "50px" }}>
                    <Col className="stats-col">
                      <div className="centered">
                        <BsFillCalendar2WeekFill size={16} className="date-icon"/> 
                        <span>{val.date}</span>
                      </div>
                    </Col>
                    <Col className="stats-col" xs={5}>
                      <div className="centered">
                        <BiTimeFive size={16} className="time-icon"/> 
                        <span>{val.time.slice(0,5)}</span>
                      </div>
                    </Col>
                  </Row>
                  <Row style={{ paddingTop: "12px" }}>
                    <Col className="stats-col">
                      <AiFillHeart size={22} color="deeppink"/>
                      <p className="stats-text">{val.like}</p>
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
