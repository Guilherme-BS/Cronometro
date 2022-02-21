import React, { useEffect, useState, useRef } from "react";
import "./App.css";

// Não é recomendado pelo React (global) (useRef)
// let idInterval = null;

export default function App() {
  const [contador, setContador] = useState(0);
  const [start, setStart] = useState(false);
  const interval = useRef(null);

  const handleClick = () => {
    setStart((s) => !s);
  };

  const handleReset = () => {
    setStart(false);
    setContador(0);
  };

  console.log("render", start, interval.current);

  // useEffect(() => {
  //   console.log("effect", start, idInterval);

  //   const cleanup = () => {
  //     // limpar intervalo atual
  //     console.log("cleanup", start, idInterval);

  //     if (idInterval != null) {
  //       console.log("if:true", start, idInterval);
  //       clearInterval(idInterval);
  //       setIdInterval(null)
  //     }
  //   };

  //   if (start) {
  //     // não existe um intervalo sendo executado
  //     if (idInterval == null) {
  //       // criar um interval
  //       const id = setInterval(() => setContador((c) => c + 0.1), 100)
  //       setIdInterval(id)
  //     }
  //   } else {
  //     cleanup();
  //   }

  //   // cleanup | teardown (limpa quando o componente sair da tela)
  //   return cleanup;
  // }, [start, idInterval]);

  useEffect(() => {
    console.log("effect", start, interval.current);

    const cleanup = () => {
      // limpar intervalo atual
      console.log("clear", interval.current);
      if (interval.current != null) {
        console.log("clear: true", interval.current);
        clearInterval(interval.current);
        interval.current = null;
      }
    };

    if (start) {
      // não existe um intervalo sendo executado
      if (interval.current == null) {
        // criar um interval
        interval.current = setInterval(() => setContador((c) => c + 0.1), 100);
      }
    } else {
      cleanup();
    }

    // cleanup | teardown (limpa quando o componente sair da tela)
    return cleanup;
  }, [start]);

  return (
    <div className="container">
      <div className="imgCronometro">
        <img src={require("./img/Cronometro.png")} className="img"></img>
        <a className="timer"> {contador.toFixed(1)} </a>
      </div>
      <div className="buttons">
        <button className="btn" onClick={handleClick}>
          {start ? "stop" : "start"}
        </button>
        <button className="btn" onClick={handleReset}>
          Clear
        </button>
      </div>
    </div>
  );
}
