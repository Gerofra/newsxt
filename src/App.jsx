import { useState } from "react";
import { client } from "@gradio/client";
import "./App.css";

const run = async (inputText, setResult) => {
  const app = await client("https://pharmaia-pharmawise.hf.space/");
  const result = await app.predict("/predict", [inputText]);
  setResult(result?.data);
};

function App() {
  const [result, setResult] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const inputText = event.target.elements.inputText.value;
    await run(inputText, setResult);
  };

  return (
    <>
      <h1>Test</h1>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <input className="input" type="text" name="inputText" />
          <button type="submit">Enviar</button>
        </form>
        {result && (
          <div>
            Respuesta: <div className="input">{result}</div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
