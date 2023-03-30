import { FaTimes } from "react-icons/fa";
const TaskOne = ({ task, onDelete, onToggle }) => {
  return (
    //using ontoggle to whole div
    <div className={`task ${task.reminder ? 'reminder': ''}`} onDoubleClick={() => onToggle(task.id)}>
      <h3>
        {task.text}
        <FaTimes
          style={{ color: " brown ", cursor: "pointer" }}
          onClick={() => onDelete(task.id)}
        />
      </h3>
      <p>{task.day}</p>
    </div>
  );
};

export default TaskOne;
