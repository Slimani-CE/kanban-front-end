import React from "react";
import Todo from "./Todo";

function TodoList({ column, index }) {
  return (
    <div className={"todo-list _" + (index + 1)}>
      <h4 className="todo-list-name">
        {column.name} ({column.tasks.length})
      </h4>
      {column.tasks.map((task, index) => (
        <Todo key={index} task={task} />
      ))}
    </div>
  );
}

export default TodoList;
