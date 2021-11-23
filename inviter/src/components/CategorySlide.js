import React from "react";
import Slider from "react-slick";
import "./CategorySlider.css";

function CategorySlide() {
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
          <div>
            <a href="/1">
              <button className="slider-item">1</button>
            </a>
          </div>
          <div>
            <a href="/2">
              <button className="slider-item">2</button>
            </a>
          </div>
          <div>
            <a href="/3">
              <button className="slider-item">3</button>
            </a>
          </div>
          <div>
            <a href="/4">
              <button className="slider-item">4</button>
            </a>
          </div>
          <div>
            <a href="/5">
              <button className="slider-item">5</button>
            </a>
          </div>
          <div>
            <a href="/6">
              <button className="slider-item">6</button>
            </a>
          </div>
          <div>
            <a href="/7">
              <button className="slider-item">7</button>
            </a>
          </div>
          <div>
            <a href="/8">
              <button className="slider-item">8</button>
            </a>
          </div>
        </Slider>
      </div>
    </div>
  );
}

export default CategorySlide;
