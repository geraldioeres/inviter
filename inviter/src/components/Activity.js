import React from "react";
import "./Activity.css";
import { Card, Button, Col, Container, Row } from "react-bootstrap";
import Img1 from "../assests/images/img1.jpg";
import { AiFillHeart } from "react-icons/ai";
import {
  BsFillShareFill,
  BsFillPeopleFill,
  BsPersonSquare,
} from "react-icons/bs";
import { HiLocationMarker } from "react-icons/hi";

function Activity() {
  return (
    <div>
      <h2>Hey! They are looking for you now</h2>
      {/* <Container style={{paddingTop: "40px"}}>
        <Row>
          <Col>
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some summary
                </Card.Text>
                <Button variant="primary">Details</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some summary
                </Card.Text>
                <Button variant="primary">Details</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some summary
                </Card.Text>
                <Button variant="primary">Details</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container> */}
      <Container style={{ paddingTop: "50px", paddingBottom: "50px" }}>
        <Row>
          <Col>
            <div className="card" style={{ borderRadius: "10px" }}>
              <div className="card-image">
                <img className="activity-image" src={Img1} alt="activity-img" />
                <div class="bottom-left">
                  <HiLocationMarker /> location
                </div>
                <div class="bottom-right">
                  <BsFillPeopleFill /> 0 / 6
                </div>
              </div>
              <div className="card-title">
                <h2 className="title">Activity title</h2>
              </div>
              <div className="card-stats">
                <Row style={{ paddingBottom: "10px" }}>
                  <Col className="stats-col host-data">
                    <BsPersonSquare size={30} className="profile" />
                    <h6 className="host">host</h6>
                    <p className="username">username</p>
                  </Col>
                  <Col className="stats-col">
                    <AiFillHeart />
                    <p className="stats-text">Like</p>
                  </Col>
                </Row>
                <Row>
                  <Col className="stats-col">
                    <BsFillShareFill />
                    <p className="stats-text">share</p>
                  </Col>
                  <Col className="stats-col">
                      <button className="details-button">
                          Details
                      </button>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
          <Col>
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
          <Col>
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
          <Col>
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
