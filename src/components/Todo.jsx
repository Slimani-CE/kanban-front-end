import React from "react";
import TaskViewModal from "./TaskViewModal";

function Todo({ task }) {
  const [isTaskViewModalOpen, setIsTaskViewModalOpen] = React.useState(false);

  let completedSubtasks = task.subtasks?.filter(
    (subtask) => subtask.isCompleted
  ).length;
  let totalSubtasks = task.subtasks?.length;

  return (
    <>
      <div className="todo" onClick={() => setIsTaskViewModalOpen(true)}>
        <h3>{task.title}</h3>
        {totalSubtasks !== 0 ? (
          <p>
            {completedSubtasks} of {totalSubtasks} substasks
          </p>
        ) : null}
      </div>
      <TaskViewModal
        open={isTaskViewModalOpen}
        setOpen={setIsTaskViewModalOpen}
        task={task}
      />
    </>
  );
}

export default Todo;
