import React, { useState } from "react";
import { client } from "@gradio/client";
import "./App.css";

const predictA = async (inputText, setResult) => {
  const app = await client("https://pharmaia-pharmawise.hf.space/");
  const result = await app.predict("/predict", [inputText]);
  setResult(result?.data);
};

const loadA = async (file, setResult) => {
  const app = await client("https://pharmaia-pharmawise.hf.space/");

  const fileReader = new FileReader();

  fileReader.onload = async (event) => {
    const jsonData = JSON.parse(event.target.result);
    const result = await app.predict("/load_example", [jsonData]);
    console.log(result?.data);
    setResult(result?.data);
  };

  fileReader.readAsText(file);
};

function App() {
  const [inputText, setInputText] = useState(null);
  const [result, setResult] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
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

  const handleLoad = async (event) => {
    event.preventDefault();
    setLoading(true);
    const file = event.target.elements.fileInput.files[0]; // Obtener el archivo seleccionado desde el nuevo campo de entrada
    await loadA(file, setResult); // Pasar el archivo como primer argumento en loadA
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

        <span className="spacer"></span>
        <form onSubmit={handleLoad}>
          <input
            className="input"
            type="file"
            name="fileInput"
            onChange={(event) => setSelectedFile(event.target.files[0])}
          />
          <span className="spacer"></span>
          <button type="submit">Cargar</button>
        </form>
      </div>
    </>
  );
}

export default App;
