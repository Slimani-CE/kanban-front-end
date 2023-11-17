import React from "react";
import { DataContext } from "../hooks/DataContext";
import Board from "./Board";

function PlaygroundContent() {
  const { currentBoard } = React.useContext(DataContext);

  return (
    <div id="playground-content">
      {currentBoard?.columns.length === 0 ? (
        <div className="empty-board">
          <p>This board is empty. Create a new column to get started.</p>
          <button className="add-btn">+ Add New Column</button>
        </div>
      ) : (
        <Board />
      )}
    </div>
  );
}

export default PlaygroundContent;
