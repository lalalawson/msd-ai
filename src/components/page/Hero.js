import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="bg-white mt-6">
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl">
          <span className="text-teal-600">Revolutionizing</span> healthcare
          research,
        </h1>
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl">
          one <span className="text-teal-600">summary</span> at a time.
        </h1>
        <p className="mb-8 text-base font-normal text-gray-500 lg:text-base sm:px-16 xl:px-48">
          Here at MSD.ai, we aim to make the process of reading and summarizing
          scientific articles easier and more efficient. Be it sharing an
          article, or keeping updated with the latest research, we have you
          covered.
        </p>
        <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          <Link
            to="/create"
            className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white bg-teal-700 rounded-lg border hover:bg-teal-600 hover:shadow-xl duration-300 ease-in-out"
          >
            Create a summary
          </Link>
          <Link
            className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-800 rounded-lg bg-primary hover:text-teal-700 hover:ring-2 hover:ring-teal-700 duration-300"
            to="/discover"
          >
            Discover articles
            <svg
              className="ml-2 -mr-1 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
