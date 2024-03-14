import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Rating } from "@mui/material";
import { Badge } from "../ui/badge";
import { Link } from "react-router-dom";

const Card = ({ item, type }) => {
  const [dateNow, setDateNow] = useState(null);
  useEffect(() => {
    let date_now =
      new Date().getFullYear() +
      "-" +
      new Date().getMonth() +
      "-" +
      new Date().getDate();
    setDateNow(date_now);
  }, []);
  return (
    <div
      id="result-card"
      className=" h-[24rem] w-full md:h-[27rem]   grid grid-rows-10 gap-2 border-2 border-white carousel-card"
      style={{ borderRadius: "10px", overflow: "hidden" }}
    >
      <div className="row-span-5 md:row-span-6 max-h-[100%] w-full p-2">
        <img
          src={
            item?.poster_path || item?.backdrop_path
              ? `https://image.tmdb.org/t/p/original/${
                  item?.poster_path ? item?.poster_path : item?.backdrop_path
                }`
              : "/no-poster.jpg"
          }
          style={{ borderRadius: "10px" }}
          alt={item?.name ? item?.name : item?.title}
          className=" max-h-[100%] w-full "
        />
      </div>
      <div className=" row-span-3 md:row-span-2 flex flex-col details p-2 gap-3">
        <div className="flex gap-1 w-full justify-center">
          {item?.release_date >= dateNow ? (
            <>
              <div
                className=" h-[2rem] w-[6rem] flex justify-center items-center text-orange-400 font-bold "
                style={{ letterSpacing: "2px", textTransform: "uppercase" }}
              >
                Upcoming
              </div>
            </>
          ) : (
            <>
              <Rating
                name="user-rating"
                value={item?.vote_average / 2}
                precision={0.1}
                readOnly
              />
              ({item?.vote_count})
            </>
          )}
        </div>
        <div className="flex w-full items-center justify-center card-title text-sm">
          {item?.name ? item?.name : item?.title}
        </div>
      </div>
      <div className="row-span-2 flex items-center align-center w-full pl-3 pr-3">
        <Link to={`/details/${type}/${item?.id}`} className="w-full">
          <Button variant="default" className="w-full">
            Read More
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
