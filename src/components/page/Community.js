import React, { useEffect, useState } from "react";
import Card from "./Card";
import { useNavigate } from "react-router-dom";
function Community({ articles }) {
  let navigate = useNavigate();
  console.log("articles", articles);
  return (
    <section className="bg-white w-3/4 mx-auto max-w-screen-xl mb-20">
      <div className="h-0.5 w-3/4 bg-gray-100 mx-auto max-w-screen-xl"></div>
      <div className="py-8 px-4 mx-auto text-left lg:py-12 lg:px-4 flex items-center gap-2">
        {/* add a star icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-8 h-8"
        >
          <path
            fillRule="evenodd"
            d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z"
            clipRule="evenodd"
          />
        </svg>
        <h2 className="text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-3xl lg:text-5xl">
          Our Community
        </h2>
      </div>
      <div className="px-4 grid grid-cols-2 gap-4">
        {articles.map((article) => {
          return (
            <>
              <Card info={article} />
            </>
          );
        })}
      </div>
    </section>
  );
}

export default Community;
