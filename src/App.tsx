import { useState } from "react";
import "./App.css";
import { createGrid } from "./utils/helper";

const grid = createGrid(10, 10, 10);
console.log(grid);

function App() {
  const setRender = useState(false)[1];

  return (
    <div className="board">
      {grid.map((row, colIndex) => {
        return (
          <div key={colIndex} className="row">
            {row.map((field, rowIndex) => {
              return (
                <button
                  onClick={() => field.reveal(setRender, grid)}
                  key={rowIndex}
                  className={`field ${field.revealed && "field-revealed"}`}
                >
                  <div className="field-text">
                    {field.revealed ? field.text : ""}
                  </div>
                </button>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default App;
