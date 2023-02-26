import React from "react";
import Community from "../components/page/Community";
import Hero from "../components/page/Hero";
import { useEffect, useState } from "react";
import axios from "axios";
function Home() {
  const [articles, setArticles] = useState([]);
  // Get the articles from the database on initial render

  async function getArticles() {
    axios.get("http://localhost:4500/api/get-all").then((resp) => {
      console.log(resp.data.message);
      setArticles(resp.data.message);
    });
  }

  useEffect(() => {
    getArticles();
  }, []);
  return (
    <div>
      <Hero />
      {articles.length !== 0 && <Community articles={articles} />}
    </div>
  );
}

export default Home;
