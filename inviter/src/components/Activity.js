import React from "react";
import "./Activity.css";
import { Col, Container, Row } from "react-bootstrap";
import Img1 from "../assests/images/img1.jpg";
import Profile from "../assests/images/profile2.jpg";
import { AiFillHeart } from "react-icons/ai";
import {
  BsFillShareFill,
  BsFillPeopleFill,
} from "react-icons/bs";
import { HiLocationMarker } from "react-icons/hi";
import { GrFlag } from "react-icons/gr";

function Activity() {
  return (
    <div>
      <h3>Hey! They are looking for you now</h3>
      <Container style={{ paddingTop: "50px", paddingBottom: "50px" }}>
        <Row>
          <Col xs={5} className="variant1">
            <div className="card" style={{ borderRadius: "10px" }}>
              <div className="card-title">
                <h4 className="title">Activity title</h4>
              </div>
              <div className="card-image">
                <img className="activity-image" src={Img1} alt="activity-img" />
                <div class="top-left">
                  <HiLocationMarker /> city
                </div>
                <div class="bottom-left">
                  <img className="host-image" src={Profile} alt="host-img" />
                  <h6 className="host-tag">host</h6>
                  <p className="host-name">username</p>
                </div>
                <div class="bottom-right">
                  <div className="people">
                    <BsFillPeopleFill /> 0 / 6
                  </div>

                  <button className="details-button">Details</button>
                </div>
              </div>
              <div className="card-stats">
                <Row style={{ paddingTop: "50px" }}>
                  <Col className="stats-col">
                    <AiFillHeart />
                    <p className="stats-text">Like</p>
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
          <Col xs={5} className="variant1">
            <div className="card" style={{ borderRadius: "10px" }}>
              <div className="card-image">
                <h3>This will be image</h3>
              </div>
              <div className="card-title">
                <span className="date">4 days ago</span>
                <h2 className="date">Activity title</h2>
              </div>
              <div className="card-stats">
                <Row>
                  <Col className="stats-col">Col1</Col>
                  <Col className="stats-col">Col2</Col>
                  <Col className="stats-col">Col3</Col>
                </Row>
                <Row>
                  <Col className="stats-col">Col1</Col>
                  <Col className="stats-col">Col2</Col>
                  <Col className="stats-col">Col3</Col>
                  <Col className="stats-col">Col4</Col>
                </Row>
              </div>
            </div>
          </Col>
          <Col xs={5} className="variant1">
            <div className="card" style={{ borderRadius: "10px" }}>
              <div className="card-image">
                <h3>This will be image</h3>
              </div>
              <div className="card-title">
                <span className="date">4 days ago</span>
                <h2 className="date">Activity title</h2>
              </div>
              <div className="card-stats">
                <Row>
                  <Col className="stats-col">Col1</Col>
                  <Col className="stats-col">Col2</Col>
                  <Col className="stats-col">Col3</Col>
                </Row>
                <Row>
                  <Col className="stats-col">Col1</Col>
                  <Col className="stats-col">Col2</Col>
                  <Col className="stats-col">Col3</Col>
                  <Col className="stats-col">Col4</Col>
                </Row>
              </div>
            </div>
          </Col>
          <Col xs={5} className="variant1">
            <div className="card" style={{ borderRadius: "10px" }}>
              <div className="card-image">
                <h3>This will be image</h3>
              </div>
              <div className="card-title">
                <span className="date">4 days ago</span>
                <h2 className="date">Activity title</h2>
              </div>
              <div className="card-stats">
                <Row>
                  <Col className="stats-col">Col1</Col>
                  <Col className="stats-col">Col2</Col>
                  <Col className="stats-col">Col3</Col>
                </Row>
                <Row>
                  <Col className="stats-col">Col1</Col>
                  <Col className="stats-col">Col2</Col>
                  <Col className="stats-col">Col3</Col>
                  <Col className="stats-col">Col4</Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Activity;
