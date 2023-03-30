import TaskOne from "./TaskOne";
const Task = ({ tasks, onDelete,onToggle }) => {
  return (
    <>
      {tasks.map((task) => (
        <TaskOne key={task.id} task={task} onDelete={onDelete} onToggle={onToggle} />
      ))}
    </>
  );
};

export default Task;
