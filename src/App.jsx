import React, { useState } from "react";
import { client } from "@gradio/client";
import "./App.css";

// Import HfInferenceEndpoint from @huggingface/inference
import { HfInferenceEndpoint } from '@huggingface/inference';

function App() {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  // Define the streaming function
  const streamTextGeneration = async () => {
    // Create an instance of HfInferenceEndpoint with your endpoint URL and token
    const hf = new HfInferenceEndpoint('https://pharma-ia-pharmawise-prospecto-megalabs-v2-9.hf.space/');

    // Define the prompt
    const prompt = 'What can you do in Nuremberg, Germany? Give me 3 Tips';

    // Start streaming text generation
    const stream = hf.textGenerationStream({ inputs: prompt });

    for await (const r of stream) {
      // Update the result with the generated text
      setResult((prevResult) => prevResult + r.token.text);
    }
  };

  const predictA = async (inputText) => {
    const app = await client("https://pharma-ia-pharmawise-prospecto-megalabs-v2-9.hf.space/");
    const result = await app.predict("/predict", [inputText]);
    setResult(result?.data);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setInputText(event.target.elements.inputText.value);
    
    // Call predictA function to get initial result
    await predictA(inputText);

    // Start streaming text generation
    await streamTextGeneration();

    setLoading(false);
  };

  const handleExample = (event) => {
    const exampleText = event.target.innerText; 
    setInputText(exampleText);
  };

  return (
    <>
      <h1>Api test</h1>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <span className="spacer"></span>
          <input
            className="input"
            type="text"
            name="inputText"
            placeholder={inputText ? inputText : "Escribe tu pregunta aquí..."}
          />

          <span className="examples" onClick={handleExample}>
            ¿Cómo se toma el medicamento?
          </span>
          <span className="examples" onClick={handleExample}>
            ¿Cuáles son los efectos secundarios?
          </span>
          <span className="examples" onClick={handleExample}>
            ¿Cuándo no debo tomar este medicamento?
          </span>
          <span className="examples" onClick={handleExample}>
            ¿Qué hago si olvido una dosis?
          </span>

          <span className="spacer"></span>
          <button type="submit">Enviar</button>
        </form>

        {loading && (
          <div>
            <span className="spacer"></span>
            Cargando...
          </div>
        )}
        {result && (
          <div>
            <span className="spacer"></span>
            <span className="examples ">Respuesta:</span>
            <span className="examples example__container">{result}</span>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
