import React, { useState } from "react";

function ChatBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");

  const qnaObj = {
    question: "What is the difference between a virus and a bacterium?",
    answer:
      "A virus is a non-cellular infectious agent that replicates only inside the living cells of an organism. A bacterium is a single-celled microorganism that has cell walls with peptidoglycan." +
      "A virus is a non-cellular infectious agent that replicates only inside the living cells of an organism. A bacterium is a single-celled microorganism that has cell walls with peptidoglycan.",
  };

  const [qna, setQna] = useState(qnaObj);

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
    console.log(`Submitted question: ${question}`);
    // Reset the question state after submission
    setQuestion("");
  };

  const toggleChatBox = () => {
    setIsOpen(!isOpen);
  };

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
              <div>
                <div className="text-sm font-bold text-gray-900">You</div>
                <div className="mt-1 text-sm text-gray-700">
                  <p>{qna.question}</p>
                </div>
              </div>
              <div className="h-0.5 w-100 bg-gray-100 my-2" />
              <div>
                <div className="text-sm font-bold text-gray-900">MerckBot</div>
                <div className="mt-1 text-sm text-gray-700">
                  <p>{qna.answer}</p>
                  <div
                    className="rounded-full bg-white drop-shadow-sm w-fit ring-1 ring-teal-600 py-1 px-3 mt-2
                    text-xs text-gray-800
                   hover:bg-teal-700 hover:text-white duration-300 hover:cursor-pointer"
                    onClick={() => {}}
                  >
                    Find this useful? Click here to save to Key Insights!
                  </div>
                </div>
              </div>
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
