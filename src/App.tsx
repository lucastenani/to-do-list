import "./global.css";
import { Header } from "./components/Header";
// import { NoTasksMessage } from "./components/NoTasksMessage";
import { Task } from "./components/Task";
import { PlusCircle } from "@phosphor-icons/react";
import styles from "./App.module.css";

export interface TasksProps {
  id: number;
  description: string;
  isComplete: boolean;
}

const tasks: TasksProps[] = [
  {
    id: 1,
    description: "Train Jiu-Jitsu",
    isComplete: false,
  },
  {
    id: 2,
    description: "Train Muay Thai",
    isComplete: true,
  },
];

function App() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <form className={styles.taskForm}>
          <input placeholder="Add a new task" name="task" required />
          <button className={styles.createTaskButton} type="submit">
            <p>Create</p>
            <PlusCircle size={16} color="#F2F2F2" />
          </button>
        </form>

        <section>
          <header className={styles.tasksHeader}>
            <article className={styles.tasksCreated}>
              <p className={styles.tasksCreatedText}>Created tasks</p>
              <p className={styles.tasksAmount}>0</p>
            </article>
            <article className={styles.tasksCompleted}>
              <p className={styles.tasksCompletedText}>Completed</p>
              <p className={styles.tasksAmount}>0</p>
            </article>
          </header>

          {/* <NoTasksMessage /> */}
          <main className={styles.tasksList}>
            {tasks.map((task: TasksProps) => {
              return (
                <Task
                  key={task.id}
                  id={task.id}
                  description={task.description}
                  isComplete={task.isComplete}
                />
              );
            })}
          </main>
        </section>
      </main>
    </>
  );
}

export default App;
