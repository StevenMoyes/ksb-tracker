import { Droppable } from "react-beautiful-dnd";
import TaskCard from "./Card";

const Column = ({ title, status, tasks }) => {
  return (
    <div className='column'>
      <h2>{title}</h2>
      <Droppable droppableId={status}>
        {(provided) => {
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className='task-list'
          >
            {tasks
              .filter((task) => task.status === status)
              .map((task, index) => (
                <TaskCard key={task.id} task={task} index={index} />
              ))}
            {provided.placeholder}
          </div>;
        }}
      </Droppable>
    </div>
  );
};

export default Column;
