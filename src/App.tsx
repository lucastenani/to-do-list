import "./global.css";
import styles from "./App.module.css";
import { Header } from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <main className={styles.main}></main>
    </>
  );
}

export default App;
