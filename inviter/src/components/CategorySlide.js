import React from "react";
import Slider from "react-slick";
import "./CategorySlider.css";
import { gql, useQuery } from "@apollo/client";

const GET_CATEGORIES = gql`
  query MyQuery {
    project_fe_categories {
      id
      name
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
      <h2>Categories</h2>
      <div>
        <Slider {...settings}>
          {data?.project_fe_categories?.map((v) => (
            <div key={v.id}>
              <a href={v.name}>
                <button className="slider-item">{v.name}</button>
              </a>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default CategorySlide;
