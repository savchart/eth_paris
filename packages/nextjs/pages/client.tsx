import type { NextPage } from "next";
import { useState } from "react";


const Client: NextPage = () => {

  const [input, setInput] = useState("A cat in French is ");
  const [result, setResult] = useState("");

  const runModel = () => {
      fetch("http://localhost:5000/run_model", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({input, max_new_tokens: 3}),
      })
          .then(response => response.json())
          .then(data => setResult(data.result.result)) // Access the inner `result` property of the object
          .catch(error => console.error("Error:", error));
  }
  return (
    <>
      <div className="flex flex-row gap-2 w-full max-w-7xl pb-1 px-6 lg:px-10 flex-wrap">
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        className="p-2 border border-base-50 rounded text-black"
        placeholder={"A cat in French is "}
      />
      <button
        onClick={runModel}
        className="p-2 btn-lg font-thin bg-base-100 text-black"
      >
        Run Model
      </button>
        <div className="p-2 border border-base-100 rounded bg-base-100">
          <p>{result || "Enter a prompt and run the model to see results here."}</p>
        </div>
    </div>
    </>
  );
};

export default Client;
