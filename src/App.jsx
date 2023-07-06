import React, { useState } from "react";
import { client } from "@gradio/client";
import "./App.css";

const run = async (inputText, setResult) => {
  const app = await client("https://pharmaia-pharmawise.hf.space/");
  const result = await app.predict("/predict", [inputText]);
  setResult(result?.data);
};

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const inputText = event.target.elements.inputText.value;
    await run(inputText, setResult);
    setLoading(false);
  };

  return (
    <>
      <h1>Test test</h1>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <span className="spacer"></span>
          <input
            className="input"
            type="text"
            name="inputText"
            placeholder="Escribe tu pregunta aquí..."
          />
          <span className="spacer"></span>
          <button type="submit">Enviar</button>
        </form>

        {loading && (
          <div>
            <span className="spacer"></span>
            ...
          </div>
        )}
        {result && (
          <div>
            <span className="spacer"></span>
            Respuesta:
            <span className="spacer"></span>
            <div className="input">{result}</div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
