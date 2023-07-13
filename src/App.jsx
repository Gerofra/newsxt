import React, { useState } from "react";
import { client } from "@gradio/client";
import "./App.css";

const predictA = async (inputText, setResult) => {
  const app = await client("https://pharma-ia-pharmawise-prospecto-megalabs.hf.space/");
  const result = await app.predict("/predict", [inputText]);
  setResult(result?.data);
};


function App() {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setInputText(event.target.elements.inputText.value);
    await predictA(inputText, setResult);
    setLoading(false);
  };

  const handleExample = (event) => {
    const exampleText = event.target.innerText; // Obtener el contenido de la etiqueta <span>
    setInputText(exampleText); // Establecer el contenido en el estado inputText
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
            Respuesta:
            <span className="spacer"></span>
            {result}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
