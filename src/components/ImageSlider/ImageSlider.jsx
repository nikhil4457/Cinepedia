import React, { useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";

import "./Carousel.css";

const Carousel = ({ images }) => {
  const [slide, setSlide] = useState(0);

  const nextSlide = () => {
    setSlide(
      slide === (images.length - 1 >= 5 ? 4 : images.length - 1) ? 0 : slide + 1
    );
  };

  const prevSlide = () => {
    setSlide(
      slide === 0 ? (images.length - 1 >= 5 ? 4 : images.length - 1) : slide - 1
    );
  };

  return (
    <div className="carousel">
      <BsArrowLeftCircleFill onClick={prevSlide} className="arrow arrow-left" />
      {images
        .slice(0, 5 > images.length ? images?.length : 5)
        .map((item, idx) => {
          return (
            <img
              src={`https://image.tmdb.org/t/p/original/${item?.file_path}`}
              alt={item.alt}
              key={idx}
              className={slide === idx ? "slide" : "slide slide-hidden"}
            />
          );
        })}
      <BsArrowRightCircleFill
        onClick={nextSlide}
        className="arrow arrow-right"
      />
      <span className="indicators">
        {images
          .slice(0, 5 > images.length ? images?.length : 5)
          .map((_, idx) => {
            return (
              <button
                key={idx}
                className={
                  slide === idx ? "indicator" : "indicator indicator-inactive"
                }
                onClick={() => setSlide(idx)}
              ></button>
            );
          })}
      </span>
    </div>
  );
};

//  .filter((item, key) => {
// if (key <= 5) return item;
// })

export default Carousel;
