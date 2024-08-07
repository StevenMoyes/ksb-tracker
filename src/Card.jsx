import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";

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
          <p>{task.id}</p>
          {showDescription && <p>Description: {task.description}</p>}
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
