import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/NavBar";
import { Route, Routes } from "react-router";
import Home from "./components/Home/Home";
import SearchPage from "./components/SearchPage/SearchPage";
import Movies from "./components/Movies/Movies";
import Shows from "./components/Shows/Shows";
import DetailsPage from "./components/DetailsPage/DetailsPage";
import Latest from "./components/Latest/Latest";
import Upcoming from "./components/Upcoming/Upcoming";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <div className="mt-[9rem]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/shows" element={<Shows />} />
          <Route path="/details/:type/:id" element={<DetailsPage />} />
          <Route path="/latest-shows-and-movies" element={<Latest />} />
          <Route path="/upcoming-shows-and-movies" element={<Upcoming />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
