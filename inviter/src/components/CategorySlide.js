import React from "react";
import Slider from "react-slick";
import "./CategorySlider.css";
import { gql, useQuery } from "@apollo/client";
import BG from "../assests/images/volunteer.jpg";

const GET_CATEGORIES = gql`
  query MyQuery {
    project_fe_categories {
      id
      name
      photo_url
    }
  }
`;

function CategorySlide() {
  const { data } = useQuery(GET_CATEGORIES);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="categories">
      <h2 className="category-title">Categories</h2>
      <div>
        <Slider {...settings}>
          {data?.project_fe_categories?.map((v) => (
            <div key={v.id}>
              <a href={v.name} className="slider-link">
                <div className="slider-item">
                  <div
                    className="slider-container"
                    style={{
                      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)) , url("${v.photo_url}")`,
                    }}
                  >
                    {v.name}
                  </div>
                </div>
              </a>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default CategorySlide;
