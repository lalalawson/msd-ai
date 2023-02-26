import React, { useState } from "react";

function ChatBox({ content, id, updateInsight }) {
  const [answer, setAnswer] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [saved, setSaved] = useState(false);

  const qnaObj = {
    question: null,
    answer: null,
  };

  const [qna, setQna] = useState(qnaObj);

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle form submission here
    console.log(`Submitted question: ${question}`);
    setSaved(false);
    // Reset the question state after submission
    setQna({
      question: question,
      answer: "...",
    });
    await questionAnswer(question);
    setQuestion("");
  };

  const toggleChatBox = () => {
    setIsOpen(!isOpen);
  };

  // Send question to backend
  async function questionAnswer(question) {
    const response = await fetch(
      "https://ntu-hackathon.cognitiveservices.azure.com/language/:query-text?api-version=2021-10-01",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Ocp-Apim-Subscription-Key": "ce91393f4d6e4710a26b710142e60ec6",
        },
        body: JSON.stringify({
          question,
          records: [
            {
              id: "1",
              text: content,
            },
          ],
        }),
      }
    );
    if (!response.ok) {
      alert("Something went wrong");
      console.log(response);
      return;
    }
    const data = await response.json();
    setAnswer(data.answers[0].answer);
    setQna({
      question: question,
      answer: data.answers[0].answer,
    });
    console.log(data);
    console.log(data.answers[0].answer);
  }
  async function addToInsights() {
    const response = await fetch("http://localhost:4500/api/add-insights", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        insight: answer,
        reportId: id,
      }),
    });
    if (!response.ok) {
      alert("Something went wrong");
      return;
    }
    const data = await response.json();
    console.log(data);
    updateInsight(data.message);
    setSaved(true);
  }

  return (
    <div style={{ minWidth: "1px" }}>
      <div className="fixed bottom-0 right-10">
        <div
          className="bg-teal-800 text-white px-4 py-2 text-sm rounded-tl-lg rounded-tr-lg cursor-pointer"
          onClick={toggleChatBox}
        >
          Ask MerckBot
        </div>
        <div
          className={`${
            isOpen ? "h-64" : "h-0"
          } overflow-hidden bg-red-200 transition-all duration-300 z-0`}
        ></div>
      </div>
      <div className="fixed bottom-0 right-10 z-10 w-3/4">
        <div
          className={`${
            isOpen ? "h-64 py-4" : "h-0"
          } overflow-hidden rounded-tl-lg bg-white drop-shadow-[0_0_8px_rgba(0,0,0,0.25)] px-4 w-100 transition-all duration-300`}
        >
          <div>
            {/* Add your chat box here */}
            <div className="mb-4 p-4 overflow-auto h-40">
              {qna.question && (
                <div>
                  <div className="text-sm font-bold text-gray-900">You</div>
                  <div className="mt-1 text-sm text-gray-700">
                    <p>{qna.question}</p>
                  </div>
                </div>
              )}
              {qna.answer && <div className="h-0.5 w-100 bg-gray-100 my-2" />}
              {qna.answer && (
                <div>
                  <div className="text-sm font-bold text-gray-900">
                    MerckBot
                  </div>
                  <div className="mt-1 text-sm text-gray-700">
                    <p>{qna.answer}</p>
                    {!saved && (
                      <div
                        className="rounded-full bg-white drop-shadow-sm w-fit ring-1 ring-teal-600 py-1 px-3 mt-2
                      text-xs text-gray-800
                      hover:bg-teal-700 hover:text-white duration-300 hover:cursor-pointer"
                        onClick={() => {
                          addToInsights();
                        }}
                      >
                        Find this useful? Click here to save to Key Insights!
                      </div>
                    )}
                    {saved && (
                      <div
                        className="rounded-full bg-teal-700 drop-shadow-sm w-fit ring-1 ring-teal-100 py-1 px-3 mt-2
                      text-xs text-white duration-300"
                      >
                        Saved!
                      </div>
                    )}
                  </div>
                </div>
              )}
              {!qna.question && (
                <div className="text-center text-gray-500 mt-5">
                  <div className="flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-10 h-10"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                      />
                    </svg>
                  </div>
                  <div>There is nothing here yet.</div>
                </div>
              )}
            </div>
            <div>
              <form onSubmit={handleSubmit} className="flex items-center">
                <div className="flex-grow">
                  <input
                    type="text"
                    name="question"
                    id="question"
                    value={question}
                    onChange={handleQuestionChange}
                    autoComplete="off"
                    placeholder="Ask a question pertaining to the article"
                    className="shadow-sm focus:ring-teal-700 focus:border-teal-700 block w-full sm:text-sm border-gray-300 rounded-lg"
                  />
                </div>
                <button
                  type="submit"
                  className="ml-2 w-20 bg-teal-800 hover:bg-teal-600 text-white py-2 px-4 rounded-full"
                >
                  Ask
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatBox;
