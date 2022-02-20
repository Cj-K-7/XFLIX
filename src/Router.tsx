import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./Routes/Home";
import Movie from "./Routes/Movie";
import Search from "./Routes/Search";
import TV from "./Routes/TV";

function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/movie" element={<Movie />} />
        <Route path="/tv" element={<TV />} />
        <Route path="/search" element={<Search />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
