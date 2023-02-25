import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Article from "./pages/Article";
import Create from "./pages/Create";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Routes that conform to layout */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="article" element={<Article />} />
            <Route path="create" element={<Create />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
