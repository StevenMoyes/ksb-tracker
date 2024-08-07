// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import "./App.css";
import { ksbs } from "./ksbs.js";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column.jsx";

function App() {
  // eslint-disable-next-line no-unused-vars
  const [taskStates] = useState(["todo", "partiallyMet", "done"]);

  const loadTasksFromLocalStorage = () => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      return JSON.parse(savedTasks);
    }

    return [
      ...ksbs["Knowledge"].map((task) => ({ ...task, status: "todo" })),
      ...ksbs["Skills"].map((task) => ({ ...task, status: "partiallyMet" })),
      ...ksbs["Behaviours"].map((task) => ({ ...task, status: "done" })),
    ];
  };

  const [tasks, setTasks] = useState(loadTasksFromLocalStorage);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const updatedTasks = Array.from(tasks);
    const movedTask = updatedTasks.find((task) => task.id === draggableId);
    movedTask.status = destination.droppableId;

    setTasks(updatedTasks);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='board'>
        <Column title='To Do' status='todo' tasks={tasks} />
        <Column title='Partially Met' status='partiallyMet' tasks={tasks} />
        <Column title='Done' status='done' tasks={tasks} />
      </div>
    </DragDropContext>
  );
}

export default App;
