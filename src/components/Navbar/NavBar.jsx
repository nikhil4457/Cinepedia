import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "../mode-toggle";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import toast from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const searchHandler = async () => {
    if (searchText === "") {
      toast.error("Please enter a keyword to search for.");
      return;
    }
    setSearchText("");
    navigate(`/search?keyword=${searchText}`);
  };
  return (
    <div
      id="navbar-cont"
      className="p-4 fixed  top-0 left-0 right-0 flex justify-between h-[7rem] w-[full] z-50 bg-white  dark:bg-[#020817] items-center "
    >
      <Link to="/" className="flex gap-7 items-center">
        <img src="/logo3.png" alt="Logo" className="h-[5rem] w-[5rem]" />
        <p className="text-2xl" id="heading">
          Cinepedia
        </p>
      </Link>
      <div className="lg:flex gap-3 hidden">
        <div className="nav-menu flex gap-2">
          <Link to="/">
            <Button variant="secondary">Home</Button>
          </Link>
          <Link to="/latest-shows-and-movies">
            <Button variant="secondary">Latest</Button>
          </Link>
          <Link to="/upcoming-shows-and-movies">
            <Button variant="secondary">Upcoming</Button>
          </Link>
          <Link to="/movies">
            <Button variant="secondary">Movies</Button>
          </Link>
          <Link to="/shows">
            <Button variant="secondary">TV Shows</Button>
          </Link>
        </div>

        <div className="searchBar flex gap-2">
          <Input
            placeholder="Enter movie/show name "
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <Button onClick={searchHandler}>Search</Button>
        </div>
        <ModeToggle />
      </div>
      <div className="flex lg:!hidden">
        <Sheet>
          <SheetTrigger>
            <Button variant="secondary" className="h-[3rem] w-[3rem]">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col pt-8 gap-3">
              <div className="flex gap-4">
                <Input
                  id="filter"
                  placeholder="Enter movie/show name"
                  value={searchText}
                  onChange={(e) => {
                    setSearchText(e.target.value);
                  }}
                />
                <Button onClick={searchHandler}>Search</Button>
              </div>
              <div className="flex flex-col gap-2">
                <Link
                  to="/"
                  className="w-full flex justify-center align-center border-b"
                >
                  <Button variant="link">Home</Button>
                </Link>
                <Link
                  to="/latest-shows-and-movies"
                  className="w-full flex justify-center align-center border-b"
                >
                  <Button variant="link">Latest</Button>
                </Link>
                <Link
                  to="/upcoming-shows-and-movies"
                  className="w-full flex justify-center align-center border-b"
                >
                  <Button variant="link">Upcoming</Button>
                </Link>
                <Link
                  to="/movies"
                  className="w-full flex justify-center align-center border-b"
                >
                  <Button variant="link">Movies</Button>
                </Link>
                <Link
                  to="/shows"
                  className="w-full flex justify-center align-center border-b"
                >
                  <Button variant="link">Shows</Button>
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Navbar;
