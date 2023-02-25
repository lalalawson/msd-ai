import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../components/page/Loading";

function Create() {
  let navigate = useNavigate();
  const [selectedType, setSelectedType] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  // const [value, setValue] = useState(null);

  const selectedButtonClassName =
    "rounded-full bg-teal-700 text-xs text-white px-3 py-1 ring-1 ring-teal-700";
  const unselectedButtonClassName =
    "rounded-full bg-white text-xs px-3 py-1 ring-1 ring-gray-300 hover:ring-teal-700 duration-300";
  async function createReport() {
    var summary = "";
    const title = document.getElementById("title").value;
    const rawText = document.getElementById("raw-text").value;
    if (!title || !rawText) {
      alert("Please fill in all the fields");
      return;
    }
    setIsLoading(true);

    const getSummary = await fetch("http://localhost:3000/summarize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        documents: [rawText],
      }),
    });
    if (!getSummary.ok) {
      alert("Something went wrong in getting summary");
      setIsLoading(false);
      return;
    }
    summary = await getSummary.json();
    console.log(summary);

    const response = await fetch("http://localhost:4500/api/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content: rawText,
        summary: summary.summary,
      }),
    });
    if (!response.ok) {
      alert("Something went wrong");
      setIsLoading(false);
      return;
    }
    const data = await response.json();
    setIsLoading(false);
    console.log(data);
    navigate(`/article/${data.message.id}`);
  }

  function handleFileInputChange(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = handleFileLoad;
  }

  async function handleFileLoad(event) {
    const base64String = btoa(event.target.result);

    console.log(base64String); // Do something with the
    const config = {
      headers: {
        "Ocp-Apim-Subscription-Key": "da713630eb414baba83ef591cd5ab441",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    axios
      .post(
        "https://ntu-form-recognizer.cognitiveservices.azure.com/formrecognizer/documentModels/prebuilt-layout:analyze?api-version=2022-08-31",
        { base64Source: base64String },
        config
      )
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
  }

  return (
    <section className="bg-white mt-1">
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-left lg:py-16 lg:px-12">
        <div className="flex items-center gap-4">
          <Link to={"/"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8"
            >
              <path
                fillRule="evenodd"
                d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z"
                clipRule="evenodd"
              />
            </svg>
          </Link>

          <span className="text-2xl font-bold tracking-tight leading-none text-gray-900 md:text-3xl lg:text-3xl">
            Create a new summary
          </span>
        </div>
        <div className="mt-5">
          {/* <form action="#" method="POST"> */}
          <div className="drop-shadow-2xl md:rounded-lg sm:overflow-hidden sm:rounded-md">
            <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-800"
                >
                  Title
                </label>
                <div className="mt-1">
                  <textarea
                    id="title"
                    name="title"
                    rows={2}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-600 focus:ring-teal-800 sm:text-sm"
                    placeholder="Enter the research article's title here... e.g. COVID-19: A new disease caused by a novel coronavirus"
                    defaultValue={""}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Input Format
                </label>
                <div className="mt-2 flex items-center gap-4">
                  <button
                    className={
                      selectedType === 0
                        ? selectedButtonClassName
                        : unselectedButtonClassName
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedType(0);
                    }}
                  >
                    Raw Text
                  </button>
                  <button
                    className={
                      selectedType === 1
                        ? selectedButtonClassName
                        : unselectedButtonClassName
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedType(1);
                    }}
                  >
                    Upload File
                  </button>
                  <button
                    className={
                      selectedType === 2
                        ? selectedButtonClassName
                        : unselectedButtonClassName
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedType(2);
                    }}
                  >
                    Link
                  </button>
                </div>
              </div>

              {selectedType === 0 && (
                <div>
                  <label
                    htmlFor="raw-text"
                    className="block text-sm font-medium text-gray-800"
                  >
                    Raw Text
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="raw-text"
                      name="raw-text"
                      rows={15}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-600 focus:ring-teal-800 sm:text-sm"
                      placeholder="Enter the research article's raw text here..."
                      defaultValue={""}
                    />
                  </div>
                </div>
              )}
              {selectedType === 1 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Upload a file
                  </label>

                  <div>
                    <input
                      type="file"
                      onChange={handleFileInputChange}
                      accept=".pdf"
                    />
                  </div>
                </div>
              )}
              {selectedType === 2 && (
                <div className="col-span-3 sm:col-span-2">
                  <label
                    htmlFor="company-website"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Website
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                      https://
                    </span>
                    <input
                      type="text"
                      name="company-website"
                      id="company-website"
                      className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-teal-600 focus:ring-teal-600 sm:text-sm"
                      placeholder="www.example.com"
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
              <button
                type="button"
                onClick={() => createReport()}
                className="inline-flex justify-center rounded-md border border-transparent bg-teal-800 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2 duration-300"
              >
                Create a summary!
              </button>
            </div>
          </div>
          {/* </form> */}
        </div>
        {isLoading && <Loading />}
      </div>
    </section>
  );
}

export default Create;
