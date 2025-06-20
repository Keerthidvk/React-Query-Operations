import { BrowserRouter, NavLink, Route , Routes } from "react-router-dom";
import "./App.css";
import RegularFetch from "./components/RegularFetch";
import Home from "./components/home";
import ReactQueryFetch from "./components/ReactQueryFetch";
import ReactQueryById from "./components/ReactQueryById";
import ReactQueryFetchByClick from "./components/ReactQueryFetchByClick";
import PaginatedQueries from "./components/PaginatedQueries";
import Infinitequeries from "./components/Infinitequeries";
import QueryScroll from "./components/QueryScroll";
import UseQueriesDemo from "./components/UseQueriesDemo";

function App() {
  

  return (
    <>
   
    <BrowserRouter>
    
    <nav className="navbar">
     
      <NavLink to="/" >Home</NavLink>
      <NavLink to="/regular" >Regular Fetch</NavLink>
      <NavLink to="/react-query" >React Query Fetch</NavLink>
      <NavLink to="/react-paginated" >Pagination</NavLink>
      <NavLink to="/react-click" >Load Data By Click</NavLink>
      <NavLink to="/react-infinite" >Infinite Scroll </NavLink>
      <NavLink to="/react-scroll" > Scrolling </NavLink>
      <NavLink to="/react-usequery" > UseQuery </NavLink>
    </nav>
    
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/regular" element={<RegularFetch />} />
      <Route path="/react-query" element={<ReactQueryFetch />} />
      <Route path="/react-query/:postId" element={<ReactQueryById />} />
      <Route path="/react-click" element={<ReactQueryFetchByClick />} />
      <Route path="/react-Paginated" element={<PaginatedQueries />} />
      <Route path="/react-infinite" element={<Infinitequeries/>} />
      <Route path="/react-scroll" element={<QueryScroll/>} />
      <Route path="/react-usequery" element={<UseQueriesDemo/>} />
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App