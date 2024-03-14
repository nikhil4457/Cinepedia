import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ImageSlider from "../ImageSlider/ImageSlider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Rating } from "@mui/material";
import { Button } from "@/components/ui/button";
import ReadMoreReact from "read-more-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "../ui/badge";
import CarouselComp from "../Home/Carousel";
const DetailsPage = () => {
  let params = useParams();

  const [result, setResult] = useState({
    info: null,
    credits: null,
    images: null,
    recommendation: null,
    reviews: null,
    video: null,
    providers: null,
  });
  const [query, setQuery] = useState("");
  const fetchData = async () => {
    try {
      const options1 = {
        method: "GET",
        url: `https://api.themoviedb.org/3/${
          params.type === "movie" ? "movie" : "tv"
        }/${params.id}`,
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_Access_Token_Auth}`,
        },
      };

      const options2 = {
        method: "GET",
        url: `https://api.themoviedb.org/3/${
          params.type === "movie" ? "movie" : "tv"
        }/${params.id}/credits`,
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_Access_Token_Auth}`,
        },
      };

      const options3 = {
        method: "GET",
        url: `https://api.themoviedb.org/3/${
          params.type === "movie" ? "movie" : "tv"
        }/${params.id}/images`,
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_Access_Token_Auth}`,
        },
      };

      const options4 = {
        method: "GET",
        url: `https://api.themoviedb.org/3/${
          params.type === "movie" ? "movie" : "tv"
        }/${params.id}/recommendations?page=1`,
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_Access_Token_Auth}`,
        },
      };

      const options5 = {
        method: "GET",
        url: `https://api.themoviedb.org/3/${
          params.type === "movie" ? "movie" : "tv"
        }/${params.id}/reviews?language=en-US&page=1`,
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_Access_Token_Auth}`,
        },
      };
      const options6 = {
        method: "GET",
        url: `https://api.themoviedb.org/3/${
          params.type === "movie" ? "movie" : "tv"
        }/${params.id}/videos?language=en-US`,
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_Access_Token_Auth}`,
        },
      };

      const options7 = {
        method: "GET",
        url: `https://api.themoviedb.org/3/${
          params.type === "movie" ? "movie" : "tv"
        }/${params.id}/watch/providers`,
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_Access_Token_Auth}`,
        },
      };
      const { data: info } = await axios.request(options1);
      const { data: credits } = await axios.request(options2);
      const { data: images } = await axios.request(options3);
      const { data: recommendations } = await axios.request(options4);
      const { data: reviews } = await axios.request(options5);
      const { data: videos } = await axios.request(options6);
      const { data: providers } = await axios.request(options7);

      setResult({
        info,
        credits,
        images,
        recommendation: recommendations.results,
        reviews,
        video: videos.results.length > 0 ? videos.results[0] : null,
        providers: providers.results.IN
          ? providers.results.IN?.buy
            ? providers.results.IN?.buy
            : providers.results.IN?.flatrate
            ? providers.results.IN?.flatrate
            : providers.results.IN?.rent
            ? providers.results.IN?.rent
            : null
          : null,
      });

      // console.log("info : ", info);
      // console.log("credits : ", credits);
      // console.log("images : ", images);
      // console.log("recommendations : ", recommendations);
      // console.log("reviews : ", reviews);
      // console.log("videos : ", videos);
      // console.log("providers : ", providers);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (
      result?.info?.original_name ||
      result?.info?.original_title ||
      result?.info?.title ||
      result?.info?.name
    ) {
      let name = result?.info?.original_name
        ? result?.info?.original_name
        : result?.info?.original_title
        ? result?.info?.original_title
        : result?.info?.title
        ? result?.info?.title
        : result?.info?.name;

      let ans = name.replace(" ", "+");
      ans += "+trailer";
      setQuery(ans);
    }
  }, [result]);
  useEffect(() => {
    fetchData();
  }, [params.id, params.type]);

  return (
    <div className="lg:pl-20 lg:pr-20 pt-10 pb-10 flex flex-col gap-10 ">
      <div className="first-section flex gap-10  ">
        <div className="image-slider">
          {(result?.images &&
            result?.images?.posters &&
            result?.images.posters?.length) ||
          (result?.images &&
            result?.images?.backdrops &&
            result?.images?.backdrops?.length) ? (
            <ImageSlider
              images={
                result?.images &&
                result?.images?.posters &&
                result?.images?.posters?.length > 0
                  ? result?.images?.posters
                  : result?.images?.backdrops
              }
            />
          ) : (
            <div>
              <img
                className="w-[600px] h-[400px]"
                style={{
                  borderRadius: "0.5rem",
                  boxShadow: " 0px 0px 7px #666",
                }}
                src={
                  result?.info?.poster_path || result?.info?.backdrop_path
                    ? `https://image.tmdb.org/t/p/original/${
                        result?.info?.poster_path
                          ? result?.info?.poster_path
                          : result?.info?.backdrop_path
                      } `
                    : "/no-poster.jpg"
                }
                alt=""
              />
            </div>
          )}
        </div>
        <div className="details flex flex-col gap-3">
          <h1 className="text-4xl font-bold">
            {result?.info?.original_name
              ? result?.info?.original_name
              : result?.info?.original_title
              ? result?.info?.original_title
              : result?.info?.title
              ? result?.info?.title
              : result?.info?.name}
          </h1>

          <em>{result?.info?.overview}</em>
          {result?.info?.vote_average > 0 && result?.info?.vote_count > 0 && (
            <div className="flex items-center gap-2">
              <b className="text-nowrap">Rating : </b>
              <div className="flex items-center gap-2">
                <Rating
                  name="user-rating"
                  value={result?.info?.vote_average / 2}
                  precision={0.1}
                  readOnly
                />
                <>({result?.info?.vote_count})</>
              </div>
            </div>
          )}
          {result?.video && (
            <div className="flex items-center gap-2">
              <b className="text-nowrap">Watch Trailer on : </b>
              <div className="flex items-center gap-2">
                {result?.video?.site.toLowerCase() === "youtube" ? (
                  <Link
                    to={`https://www.youtube.com/results?search_query=${query}`}
                  >
                    <Badge>{result?.video?.site}</Badge>
                  </Link>
                ) : (
                  <Badge>{result?.video?.site}</Badge>
                )}
              </div>
            </div>
          )}
          {result?.providers && result?.providers && (
            <div className="flex flex-wrap items-center gap-2">
              <b className="text-nowrap">Available on : </b>
              <div className="flex flex-wrap items-center gap-2">
                {result?.providers?.map((item) => {
                  return <Badge>{item.provider_name}</Badge>;
                })}
              </div>
            </div>
          )}
          {result?.info?.created_by && (
            <div className="flex items-center gap-2">
              <b className="text-nowrap">Created by : </b>
              <div className="flex flex-wrap items-center gap-2">
                {result?.info?.created_by?.map((ele) => (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <img
                          className="h-10 w-10 object-cover"
                          style={{
                            borderRadius: "100%",
                            boxShadow: "0 0 5px 1px grey",
                          }}
                          src={
                            ele?.profile_path
                              ? `https://image.tmdb.org/t/p/original/${ele?.profile_path}`
                              : "/profile-pic.jpg"
                          }
                          alt=""
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{ele?.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            </div>
          )}
          {result?.info?.spoken_languages && (
            <div className="flex items-center gap-2">
              <b className="text-nowrap">Languages : </b>
              <div className="flex flex-wrap items-center gap-2">
                {result?.info?.spoken_languages?.map((ele) => (
                  <Badge>{ele?.name}</Badge>
                ))}
              </div>
            </div>
          )}
          {result?.info?.production_companies &&
            result?.info?.production_companies?.length > 0 && (
              <div className="flex items-center gap-2">
                <b className="text-nowrap">Production Companies : </b>
                <div className="flex items-center gap-2 flex-wrap">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">View</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader className="flex flex-col gap-4">
                        <DialogTitle>Production Companies</DialogTitle>
                        <DialogDescription>
                          <ScrollArea className="h-[300px] rounded-md border p-4">
                            <div className="w-full flex items-center gap-2 flex-wrap">
                              {result?.info?.production_companies?.map(
                                (ele) => (
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger>
                                        <img
                                          className="h-14 w-14 sm:h-16 sm:w-16 lg:h-24 lg:w-24 bg-[rgba(0,0,0,0.2)] dark:bg-white object-contain"
                                          style={{
                                            borderRadius: "100%",
                                            boxShadow: "0 0 5px 1px grey",
                                          }}
                                          src={
                                            ele?.logo_path
                                              ? `https://image.tmdb.org/t/p/original/${ele?.logo_path}`
                                              : "/no-poster.jpg"
                                          }
                                          alt=""
                                        />
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>{ele?.name}</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                )
                              )}
                            </div>
                          </ScrollArea>
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            )}
          {result?.info?.seasons && (
            <div className="flex items-center gap-2">
              <b className="text-nowrap">No. of Seasons : </b>
              <div className="flex items-center gap-2">
                {result?.info?.seasons?.length} (
                {result?.info?.number_of_episodes} episodes)
              </div>
            </div>
          )}
          {result?.info?.genres && (
            <div className="flex  items-center gap-2">
              <b className="text-nowrap">Genres : </b>
              <div className="flex flex-wrap items-center gap-2">
                {result?.info?.genres?.map((ele) => {
                  return <Badge>{ele?.name}</Badge>;
                })}
              </div>
            </div>
          )}
          {result?.info?.networks && (
            <div className="flex items-center gap-2">
              <b className="text-nowrap">Networks : </b>
              <div className="flex flex-wrap items-center gap-2">
                {result?.info?.networks?.map((ele) => {
                  return <Badge>{ele?.name}</Badge>;
                })}
              </div>
            </div>
          )}
          {result?.credits &&
            result?.credits?.cast &&
            result?.credits?.cast?.length > 0 && (
              <div className="flex   items-center gap-2">
                <b className="text-nowrap">Cast :</b>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">View Casting Members</Button>
                  </DialogTrigger>
                  <DialogContent
                    style={{ boxShadow: "0 0 20px 0px rgba(0,0,0,0.9)" }}
                  >
                    <DialogHeader className="flex flex-col gap-4">
                      <DialogTitle>Cast</DialogTitle>
                      <DialogDescription>
                        <ScrollArea className="h-[300px] rounded-md border p-4">
                          <div className="flex items-center gap-2 flex-wrap w-full">
                            {result?.credits?.cast?.map((ele) => {
                              return (
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <img
                                        className="h-14 w-14 sm:h-16 sm:w-16 lg:h-24 lg:w-24"
                                        style={{
                                          borderRadius: "100%",
                                          boxShadow: "0 0 5px 1px grey",
                                        }}
                                        src={
                                          ele?.profile_path
                                            ? `https://image.tmdb.org/t/p/original/${ele?.profile_path}`
                                            : "/profile-pic.jpg"
                                        }
                                        alt=""
                                      />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>{ele?.name}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              );
                            })}
                          </div>
                        </ScrollArea>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
                {/* <div className="flex items-center gap-2 flex-wrap w-full">
                  {result?.credits?.cast?.map((ele) => {
                    return (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <img
                              className="h-10 w-10 object-cover"
                              style={{
                                borderRadius: "100%",
                                boxShadow: "0 0 5px 1px grey",
                              }}
                              src={
                                ele?.profile_path
                                  ? `https://image.tmdb.org/t/p/original/${ele?.profile_path}`
                                  : "/profile-pic.jpg"
                              }
                              alt=""
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{ele?.name}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    );
                  })}
                </div> */}
              </div>
            )}
          {result?.credits &&
            result?.credits?.crew &&
            result?.credits?.crew?.length > 0 && (
              <div className="flex items-center gap-2">
                <b className="text-nowrap">Crew :</b>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">View Crew Members</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader className="flex flex-col gap-4">
                      <DialogTitle>Crew</DialogTitle>
                      <DialogDescription>
                        <ScrollArea className="h-[300px] rounded-md border p-4">
                          <div className="w-full flex items-center gap-2 flex-wrap">
                            {result?.credits?.crew?.map((ele) => {
                              return (
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <img
                                        className="h-14 w-14 sm:h-16 sm:w-16 lg:h-24 lg:w-24"
                                        style={{
                                          borderRadius: "100%",
                                          boxShadow: "0 0 5px 1px grey",
                                        }}
                                        src={
                                          ele?.profile_path
                                            ? `https://image.tmdb.org/t/p/original/${ele?.profile_path}`
                                            : "/profile-pic.jpg"
                                        }
                                        alt=""
                                      />
                                    </TooltipTrigger>
                                    <TooltipContent className="dark:bg-white dark:text-black ">
                                      <p>{ele?.name}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              );
                            })}
                          </div>
                        </ScrollArea>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
            )}
        </div>
      </div>
      {result?.recommendation && result?.recommendation?.length > 0 && (
        <div className="second-section flex flex-col gap-3 w-[100%]">
          <h1 className="text-4xl font-bold">Related</h1>
          <div id="recommendation-carousel">
            <CarouselComp data={result?.recommendation} type={params.type} />
          </div>
        </div>
      )}
      <div className="third-section reviews flex flex-col gap-3">
        <h1 className="text-4xl font-bold">Reviews</h1>
        <div className="reviews-cont flex flex-col gap-3">
          {result?.reviews?.results && result?.reviews?.results.length > 0 ? (
            <>
              {result?.reviews?.results?.map((item) => {
                return (
                  <div
                    style={{ borderRadius: "10px" }}
                    className=" flex flex-col  gap-3  bg-[#020817] dark:bg-white p-4 "
                  >
                    <div className="flex items-center gap-3 ">
                      <img
                        className="w-10 h-10 object-cover"
                        style={{
                          borderRadius: "100%",
                          boxShadow: "0 0 5px 1px grey",
                        }}
                        src={
                          item?.author_details &&
                          item?.author_details?.avatar_path
                            ? `https://image.tmdb.org/t/p/original/${item?.author_details?.avatar_path}`
                            : "/profile-pic.jpg"
                        }
                        alt=""
                      />
                      <h3 className="text-white dark:text-[#020817] font-bold">
                        {item?.author_details?.name}
                      </h3>
                    </div>
                    {item?.author_details?.rating && (
                      <Rating
                        name="user-rating"
                        value={item?.author_details?.rating / 2}
                        precision={0.1}
                        readOnly
                      />
                    )}
                    <em className="text-white dark:text-[#020817]">
                      <ReadMoreReact
                        text={item?.content}
                        min={700}
                        ideal={750}
                        max={800}
                        readMoreText={
                          <>
                            <Button className="mt-2" variant="secondary">
                              Read More
                            </Button>
                          </>
                        }
                      />
                    </em>
                  </div>
                );
              })}
            </>
          ) : (
            <em className="text-gray-500  font-bold text-xl">No Reviews yet</em>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
