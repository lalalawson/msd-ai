import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Article from "./pages/Article";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Routes that conform to layout */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="article" element={<Article />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
