import { ChangeEvent, FormEvent, useState } from "react";
import { PlusCircle } from "@phosphor-icons/react";
import { v4 as uuidv4 } from "uuid";
import { Header } from "./components/Header";
import { NoTasksMessage } from "./components/NoTasksMessage";
import { Task } from "./components/Task";
import "./global.css";
import styles from "./App.module.css";

export interface TasksProps {
  id: string;
  description: string;
  isComplete: boolean;
}

function App() {
  const [tasks, setTasks] = useState<TasksProps[]>([]);
  const [newTaskText, setNewTaskText] = useState("");

  const tasksCompletedLength = tasks.filter((task) => {
    return task.isComplete === true;
  }).length;

  const handleCreateNewTask = (event: FormEvent) => {
    event.preventDefault();

    const newTask: TasksProps = {
      id: uuidv4(),
      description: newTaskText,
      isComplete: false,
    };

    setTasks([newTask, ...tasks]);
    setNewTaskText("");
  };

  const handleNewTaskChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTaskText(event.target.value);
  };

  const updateTaskStatus = (taskId: string) => {
    const tasksWithUpdatedOne: TasksProps[] = tasks.map((task) => {
      return task.id === taskId
        ? { ...task, isComplete: !task.isComplete }
        : task;
    });

    setTasks(tasksWithUpdatedOne);
  };

  const deleteTask = (taskId: string) => {
    const tasksWithoutDeletedOne: TasksProps[] = tasks.filter((task) => {
      return task.id !== taskId;
    });

    setTasks(tasksWithoutDeletedOne);
  };

  return (
    <>
      <Header />
      <main className={styles.main}>
        <form onSubmit={handleCreateNewTask} className={styles.taskForm}>
          <input
            onChange={handleNewTaskChange}
            value={newTaskText}
            placeholder="Add a new task"
            name="task"
            required
          />
          <button className={styles.createTaskButton} type="submit">
            <p>Create</p>
            <PlusCircle size={16} color="#F2F2F2" />
          </button>
        </form>

        <section>
          <header className={styles.tasksHeader}>
            <article className={styles.tasksCreated}>
              <p className={styles.tasksCreatedText}>Created tasks</p>
              <p className={styles.tasksAmount}>{tasks.length}</p>
            </article>
            <article className={styles.tasksCompleted}>
              <p className={styles.tasksCompletedText}>Completed</p>
              <p className={styles.tasksAmount}>
                {tasks.length > 0
                  ? `${tasksCompletedLength} of ${tasks.length}`
                  : "0"}
              </p>
            </article>
          </header>

          {tasks.length > 0 ? (
            <main className={styles.tasksList}>
              {tasks.map((task) => {
                return (
                  <Task
                    key={task.id}
                    id={task.id}
                    description={task.description}
                    isComplete={task.isComplete}
                    onUpdateTaskStatus={updateTaskStatus}
                    onDeleteTask={deleteTask}
                  />
                );
              })}
            </main>
          ) : (
            <NoTasksMessage />
          )}
        </section>
      </main>
    </>
  );
}

export default App;
