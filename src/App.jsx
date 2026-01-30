import { useState, useEffect } from "react"

function App() {
  const [taskText, setTaskText] = useState("")
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks")
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  function addTask() {
    if (taskText.trim() === "") return
    setTasks([...tasks, { text: taskText, done: false }])
    setTaskText("")
  }

  function toggleTask(index) {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, done: !task.done } : task
      )
    )
  }

  function deleteTask(index) {
    setTasks(tasks.filter((_, i) => i !== index))
  }

  return (
    <div className="container">
      <h1>Tasks</h1>

      <div className="input-box">
        <input
          type="text"
          placeholder="Add a task"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
        />
        <button onClick={addTask}>+</button>
      </div>

      <ul>
        {tasks.map((task, index) => (
          <li key={index} className={task.done ? "done" : ""}>
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => toggleTask(index)}
            />
            <span>{task.text}</span>
            <button onClick={() => deleteTask(index)}>×</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
