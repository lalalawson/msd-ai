import React from "react";
import Card from "../components/page/Card";
import Pagination from "../components/page/Pagination";

function Discover() {
  const articles = [
    {
      title:
        "Geographical Disparities in Esophageal Cancer Incidence and Mortality in the United States",
      author: "Yeshwanth Vedire, Navpreet Rana, Adrienne Groman",
      generator: "MDPI",
      date: "today",
      tags: [
        "Esophageal Cancer",
        "Geographical Disparities",
        "Mortality",
        "United States",
      ],
    },
    {
      title:
        "Artificial Intelligence Systems Assisting in the Assessment of the Course and Retention of Orthodontic Treatment",
      author: "Martin Srtunga, Renata Urbanová, Jana Štěpánková",
      generator: "MDPI",
      date: "today",
      tags: ["Artificial Intelligence", "Orthodontic"],
    },
    {
      title:
        "Automatic electronic reporting improved the completeness of AMI and stroke incident surveillance in Tianjin, China",
      author: "Hong Xiao, Fang Liu, Yuxin Wang, et al.",
      generator: "BMC Public Health",
      date: "1 day ago",
      tags: ["AMI", "Stroke", "DisMod II", "Electronic Reporting", "China"],
    },
  ];
  return (
    <div className="w-3/4 mx-auto max-w-screen-xl">
      <form className="py-4 mt-2">
        <label
          for="default-search"
          class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              class="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-teal-700 focus:border-teal-700"
            placeholder="Search key phrases, titles..."
            required
          />
          <button
            type="submit"
            class="text-white absolute right-2.5 bottom-2.5 bg-teal-800 hover:bg-teal-600 focus:ring-4 focus:outline-none focus:ring-teal-600 font-medium rounded-lg text-sm px-4 py-2 duration-300"
          >
            Search
          </button>
        </div>
      </form>
      {articles.map((article) => {
        return (
          <div className="mt-4">
            <Card info={article} />
          </div>
        );
      })}
      <Pagination />
    </div>
  );
}

export default Discover;
