import axios from "axios";
import React, { useEffect, useState } from "react";
import CarouselComp from "../Home/Carousel";

const Upcoming = () => {
  const [movies, setMovies] = useState();
  const [shows, setShows] = useState();
  const fetchMovies = async () => {
    try {
      let year = new Date().getFullYear();
      let month = new Date().getMonth() + 1;
      if (month < 10) {
        month = "0" + month.toString();
      }

      let date = new Date().getDate();
      if (date < 10) {
        date = "0" + date.toString();
      }
      let todayDate = `${year}-${month}-${date}`;
      console.log(todayDate);
      const options = {
        method: "GET",
        url: "https://api.themoviedb.org/3/discover/movie",
        // url: "https://api.themoviedb.org/3/movie/latest",
        // url: "https://api.themoviedb.org/3/trending/movie/day",
        params: {
          include_adult: "false",
          include_video: "false",
          language: "en-US",
          page: "1",
          "primary_release_date.gte": todayDate,
          "release_date.gte": todayDate,
          sort_by: "primary_release_date.asc",
        },
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_Access_Token_Auth}`,
        },
      };
      const { data } = await axios.request(options);
      setMovies(data);
    } catch (err) {
      console.log("err : ", err);
    }
  };
  const fetchShows = async () => {
    try {
      let year = new Date().getFullYear();
      let month = new Date().getMonth() + 1;
      if (month < 10) {
        month = "0" + month.toString();
      }

      let date = new Date().getDate();
      if (date < 10) {
        date = "0" + date.toString();
      }
      let todayDate = `${year}-${month}-${date}`;
      const options = {
        method: "GET",
        url: "https://api.themoviedb.org/3/discover/tv",
        params: {
          include_adult: "false",
          include_video: "false",
          language: "en-US",
          page: "1",
          "primary_release_date.gte": todayDate,
          "release_date.gte": todayDate,
          sort_by: "primary_release_date.desc",
          "vote_average.lte": "0",
          "vote_count.lte": "0",
        },
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_Access_Token_Auth}`,
        },
      };
      const { data } = await axios.request(options);
      setShows(data);
    } catch (err) {
      console.log("err : ", err);
    }
  };
  useEffect(() => {
    fetchMovies();
    fetchShows();
  }, []);
  return (
    <div className="flex flex-col gap-5 md:gap-10 mb-8">
      <div className="movies flex flex-col gap-1 md:gap-7 pl-14 pr-14">
        <div className="title text-6xl md:text-7xl ">Movies</div>
        {movies && <CarouselComp type="movie" data={movies?.results} />}
      </div>
      <div className="shows flex flex-col gap-1 md:gap-7 pl-14 pr-14">
        <div className="title text-6xl md:text-7xl ">TV Shows</div>
        {shows && <CarouselComp type="show" data={shows?.results} />}
      </div>
    </div>
  );
};

export default Upcoming;
