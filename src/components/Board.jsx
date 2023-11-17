import { Fragment, useContext, useEffect } from "react";
import { DataContext } from "../hooks/DataContext";
import Todo from "./Todo";
import TodoList from "./TodoList";

function Board() {
  const { currentBoard } = useContext(DataContext);

  return (
    <div id="board">
      {currentBoard?.columns.map((column, index) => {
        return <TodoList key={index} column={column} index={index} />;
      })}
      {/* <TodoList />
      <TodoList /> */}
      <button id="add-new-column">+ New Column</button>
    </div>
  );
}

export default Board;
