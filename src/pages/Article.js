import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ChatBox from "../components/page/Chatbox";

function Article() {
  const artObj = {
    title:
      "Research Article 1 - The Effect of COVID19 on the Economy and Society in the United States",
    author: "Krishna K.",
    summary:
      "This is the summary of article 1 and it is supposed to be relatively long. " +
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
      "Vestibulum velit metus, cursus ut metus eu, porttitor iaculis magna. " +
      "Proin ut sagittis velit. In venenatis ipsum in justo ultrices, in pretium turpis placerat. " +
      "Vivamus auctor interdum nunc ac molestie. Sed porttitor tristique maximus. Vivamus blandit congue auctor. " +
      "Donec bibendum diam mattis arcu sodales aliquam. Quisque a dapibus enim, at blandit orci. " +
      "Nam eros sapien, rutrum a ultrices eget, facilisis quis libero. Nullam molestie mauris eu massa gravida porta. " +
      "Cras suscipit vestibulum dolor. Donec blandit ultrices nisl nec rhoncus. Proin posuere ultricies tempus. " +
      "Ut ac enim consequat, lacinia tortor quis, sodales orci.",
    generator: "Lawson T.",
    dateCreated: "2021-01-01",
  };

  const insightsList = [
    {
      question: "What is the effect of COVID19 on the economy?",
      answer: "The economy has been negatively impacted by COVID19",
    },
    {
      question: "What is the effect of COVID19 on society?",
      answer: "Society has been negatively impacted by COVID19",
    },
  ];

  const tagsList = [
    { name: "COVID19" },
    { name: "Economy" },
    { name: "Society" },
    { name: "United States" },
    { name: "Pandemic" },
  ];

  const wikiLinks = [
    {
      title: "COVID19",
      link: "https://en.wikipedia.org/wiki/COVID-19",
    },
    {
      title: "Economy",
      link: "https://en.wikipedia.org/wiki/Economy",
    },
    {
      title: "Society",
      link: "https://en.wikipedia.org/wiki/Society",
    },
  ];

  const { id } = useParams();
  const [ai, setAI] = useState("");
  const [article, setArticle] = useState("");

  async function getArticle() {
    const response = await fetch("http://localhost:4500/api/get-report", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: parseInt(id),
      }),
    });
    if (!response.ok) {
      alert("Something went wrong");
      return;
    }
    const data = await response.json();
    setArticle(data);
    console.log(data);
  }

  useEffect(() => {
    getArticle();
    console.log("----test", article);
  }, []);

  const insightCard = (question, answer) => {
    return (
      <div className="rounded-md w-100 bg-white drop-shadow-md py-3 px-3">
        <div className="font-bold text-gray-800">{question}</div>
        <div className="text-gray-600">{answer}</div>
      </div>
    );
  };
  const tag = (name) => {
    return (
      <div className="rounded-full bg-white drop-shadow-sm ring-1 ring-teal-600 py-1 px-3">
        <div className="text-xs text-gray-800">{name}</div>
      </div>
    );
  };

  if (article.message) {
    console.log(article.message.summary);
    return (
      <>
        <div className="w-4/5 bg-white mx-auto max-w-screen-xl mt-8 grid grid-cols-3 gap-8">
          {/* article col */}
          <div className="col-span-3 md:col-span-2 pr-4">
            <div className="mb-8">
              <h1 className="mb-3 text-2xl font-extrabold tracking-tight leading-none text-gray-900 md:text-2xl lg:text-4xl">
                {article.message.title}
              </h1>
              <div className="h-1.5 w-1/2 rounded-md bg-teal-700" />
            </div>
            <div className="mb-8">
              <div className="flex flex-wrap gap-3">
                {article.message.tags.slice(0, 8).map((entity, i) => {
                  return tag(entity.tag);
                })}
              </div>
            </div>
            <p className="mb-8">{article.message.summary}</p>
            <div className="">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M19.902 4.098a3.75 3.75 0 00-5.304 0l-4.5 4.5a3.75 3.75 0 001.035 6.037.75.75 0 01-.646 1.353 5.25 5.25 0 01-1.449-8.45l4.5-4.5a5.25 5.25 0 117.424 7.424l-1.757 1.757a.75.75 0 11-1.06-1.06l1.757-1.757a3.75 3.75 0 000-5.304zm-7.389 4.267a.75.75 0 011-.353 5.25 5.25 0 011.449 8.45l-4.5 4.5a5.25 5.25 0 11-7.424-7.424l1.757-1.757a.75.75 0 111.06 1.06l-1.757 1.757a3.75 3.75 0 105.304 5.304l4.5-4.5a3.75 3.75 0 00-1.035-6.037.75.75 0 01-.354-1z"
                    clipRule="evenodd"
                  />
                </svg>

                <h3 className="text-xl font-extrabold tracking-tight leading-none text-gray-800 md:text-xl lg:text-2xl">
                  Wiki Glossary
                </h3>
              </div>
              <div className="mt-3 mb-8 rounded-md w-100 bg-stone-100 drop-shadow-md py-3 px-3 flex flex-wrap gap-2 ring-1 ring-teal-600">
                {article.message.WikiLinks.map((wikiLink, index) => {
                  return (
                    <>
                      <a
                        href={wikiLink.link}
                        target="_blank"
                        className="hover:text-teal-800 hover:underline duration-300"
                      >
                        {wikiLink.name}
                        {index !== wikiLinks.length - 1 && ","}
                      </a>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
          {/* insights col */}
          <div className="col-span-3 md:col-span-1 md:border-l-1 border-gray-100 px-3">
            <div className="mb-4">
              <h1 className="mb-1 text-xl font-extrabold tracking-tight leading-none text-gray-800 md:text-xl lg:text-2xl">
                Article Information
              </h1>
              <div className="rounded-md w-100 bg-white drop-shadow-md py-3 px-3">
                <div>
                  <div className="font-bold text-gray-800">Authored By</div>
                  <span className="text-gray-500">{artObj.author}</span>
                </div>
                <div>
                  <div className="font-bold text-gray-800">Generated By</div>
                  <span className="text-gray-500">{artObj.generator}</span>
                </div>
                <div>
                  <div className="font-bold text-gray-800">Generated On</div>
                  <span className="text-gray-500">{artObj.dateCreated}</span>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h1 className="mb-4 text-xl font-extrabold tracking-tight leading-none text-gray-800 md:text-xl lg:text-2xl">
                Key Insights
              </h1>
              <div className="grid grid-cols-1 gap-4">
                {insightsList.map((insight) => {
                  return insightCard(insight.question, insight.answer);
                })}
              </div>
            </div>
          </div>
        </div>

        <div>
          <ChatBox content={article.message.content} id={article.message.id} />
        </div>
      </>
    );
  } else {
    <div>Loadind...</div>;
  }
}

export default Article;
