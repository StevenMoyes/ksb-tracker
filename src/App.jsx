import { useState } from 'react'
import './App.css'
import {ksbs} from './ksbs.js';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const initialTasks = [
  ...ksbs['Knowledge'].map(task => ({...task, status: 'To Do'})),
  ...ksbs['Skills'].map(task => ({...task, status: 'To Do'})),
  ...ksbs['Behaviours'].map(task => ({...task, status: 'To Do'})),
];

const Column = ({ title, status, tasks }) => {
  return (
    <div className='column'>
      <h2>{title}</h2>
      <Droppable droppableId={status}>
        {(provided) => {
          <div ref={provided.innerRef} {...provided.droppableProps} className='task-list'>
            {tasks.filter(task => task.status ===status).map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        }}
      </Droppable>
    </div>
  );
};

const TaskCard = ({ task, index }) => {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div  
          className='card'
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={() => setShowDescription(!showDescription)}
        >
          <p>ID: {task.id}</p>
          {showDescription && <p>Description: {task.description}</p>}
        </div>
      )}
    </Draggable>
  );
};

function App() {
  const [tasks, setTasks] = useState(initialTasks);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if(!destination) return;
    if(destination.droppableId === source.droppableId && destination.index === source.index) return;

    const updatedTasks = Array.from(tasks);
    const movedTask = updatedTasks.find(task => task.id === draggableId);
    movedTask.status = destination.droppableId;

    setTasks(updatedTasks)
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='board'>
        <Column title='To Do' status='To Do' tasks={tasks} />
        <Column title='Partially Met' status='Partially Met' tasks={tasks} />
        <Column title='Done' status='Done' tasks={tasks} />
      </div>
    </DragDropContext>
  );
}

export default App
