import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, Rating, Slider } from "@mui/material";
import { Button } from "../ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Label } from "@/components/ui/label";

import { Switch } from "@/components/ui/switch";
import Card from "../Card/Card";

const SearchPage = () => {
  const location = useLocation();

  const [result, setResult] = useState(null);
  const [filters, setFilters] = useState({
    // keyword: "",
    minRating: 0,
    above18: false,
    pageNo: 1,
  });
  const [key, setKeyWord] = useState("");

  useEffect(() => {
    setTimeout(() => {
      const tempKeyword = new URLSearchParams(location.search).get("keyword");
      setKeyWord(tempKeyword);
      // setFilters({
      //   ...filters,
      //   keyword: tempKeyword,
      // });
    }, 3000);
  }, [new URLSearchParams(location.search).get("keyword")]);
  useEffect(() => {
    if (key) {
      (async function () {
        const options = {
          method: "GET",
          url: "https://api.themoviedb.org/3/search/multi",
          params: {
            query: key,
            include_adult: "true",
            language: "en-US",
            page: filters?.pageNo,
          },
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_Access_Token_Auth}`,
          },
        };
        await axios
          .request(options)
          .then(function (response) {
            setResult(response.data);
          })
          .catch(function (error) {
            console.error(error);
          });
      })();
    }
  }, [key, filters]);

  return (
    <div>
      <div
        id="filters"
        className="filters w-full flex pl-10 pr-10 justify-between  items-center gap-10"
      >
        <div id="kids-mode">
          <div className="flex items-center space-x-2">
            <Switch
              id="kids-mode"
              value={filters?.above18}
              onCheckedChange={(e) => {
                setFilters({
                  ...filters,
                  above18: e,
                });
              }}
            />
            <Label htmlFor="kids-mode">18+ Mode</Label>
          </div>
        </div>
        <div id="rating-range" className="flex gap-2 flex-col">
          <Label htmlFor="rating-min">Min Rating</Label>
          <Box sx={{ width: 300 }}>
            <Slider
              aria-label="rating-min"
              defaultValue={0}
              onChange={(e) => {
                setFilters({
                  ...filters,
                  minRating: e.target.value,
                });
              }}
              valueLabelDisplay="auto"
              step={0.2}
              min={0}
              max={5}
            />
          </Box>
        </div>
      </div>
      <div className="search-results flex flex-col gap-8 w-full p-10">
        <h1 className="w-full text-3xl" id="result-title">
          Search results for : " <em>{key}</em> "
        </h1>
        <div className="result-cards">
          {result &&
            result?.results
              ?.filter((item) => {
                if (
                  item.adult === filters?.above18 &&
                  item?.vote_average / 2 >= filters?.minRating
                ) {
                  return item;
                }
              })
              .map((item, key) => (
                <Card
                  type={item?.media_type === "tv" ? "show" : "movie"}
                  item={item}
                  key={key}
                />
              ))}
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className="cursor-pointer"
                onClick={() => {
                  if (result) {
                    if (filters?.pageNo > 1) {
                      setFilters({
                        ...filters,
                        pageNo: filters?.pageNo - 1,
                      });
                    }
                  }
                }}
              />
            </PaginationItem>

            <PaginationItem>
              <PaginationNext
                className="cursor-pointer"
                onClick={() => {
                  if (result) {
                    if (filters?.pageNo < result?.total_pages) {
                      setFilters({
                        ...filters,
                        pageNo: filters?.pageNo + 1,
                      });
                    }
                  }
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default SearchPage;
