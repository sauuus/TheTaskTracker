import { useState, useEffect } from "react";
import Header from "./component/Header";
import Task from "./component/Task";
import AddTask from "./component/AddTask";
import Footer from "./component/Footer";
import About from "./component/About";
import { BrowserRouter as Router, Route} from "react-router-dom";
import "./App.css";

import "./index.css";

function App() {
  //toggle addtask
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };
    getTasks(); //helpsto fetch data from jsonsever
  }, []);
  //fetch tasks
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();

    return data;
  };
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks${id}`);
    const data = await res.json();

    return data;
  };
  //Add task
  //math.floor gives randowm number
  const addTask = async (task) => {
    const res = await fetch(`http://localhost:5000/tasks`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });

    const data = await res.json();
    setTasks([...tasks, data]);

    //  const id = Math.floor(Math.random()* 10000)+1
    //  const newTask ={ id, ...task}
    //  setTasks([...tasks, newTask])
  };
  //delete task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    });
    setTasks(tasks.filter((task) => task.id !== id));
  };
  //Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const upTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(upTask),
    });
    const data = await res.json();

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    ); //...object properties and values, reminder change
  };
  return (
    <Router>
    <div className="container">
    
      <Header
        onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={!showAddTask}
      />
   
      <Route path='/' 
      exact render={(props) =>(
        <>
        {showAddTask && <AddTask onAdd={addTask} />}
        {tasks.length > 0 ? (
          <Task tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
        ) : (
          "No tasks to show"
        )}
        </>
      )}/>
      
      <Route path='/about' component={About}/>
      
      <Footer />
    </div>
    </Router>
  );
}

export default App;
