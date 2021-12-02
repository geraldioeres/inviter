import React from "react";
import { AiFillHeart, AiFillHome } from "react-icons/ai";
import { BsFillShareFill, BsFillPeopleFill } from "react-icons/bs";
import { HiLocationMarker } from "react-icons/hi";
import { BsFillCalendar2WeekFill } from "react-icons/bs";
import { BiTimeFive } from "react-icons/bi";
import { GrFlag } from "react-icons/gr";
import { NavLink } from "react-router-dom";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router";
import Navbar from "../components/Navbar";

const GET_BY_CAT = gql`
  query MyQuery($_eq: Int = 10) {
    project_fe_activities(where: { category_id: { _eq: $_eq } }) {
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

function Category() {
  const { catId } = useParams();
  const { data } = useQuery(GET_BY_CAT, { variables: { _eq: catId } });

  return (
    <div>
      <Navbar />
      <h1 style={{textAlign: "center", paddingTop: "20px"}}>Activities By Category</h1>
      <hr className="cat-border" align="center" />
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
                      <BsFillPeopleFill /> {val.current_people} /{" "}
                      {val.number_of_people}
                    </div>
                    <NavLink
                      to={`/activity/${val.id}`}
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
                  <Row style={{ paddingTop: "12px", textAlign: "center" }}>
                    <Col className="stats-col">
                      <AiFillHeart size={22} color="deeppink" />
                      <p className="stats-text">{val.likes_aggregate.aggregate.count}</p>
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

export default Category;
