import { Drawer } from "@mui/joy";
import { Fragment, useEffect, useRef, useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Motivational from "./assets/Motivational";
import Playground from "./components/Playground";
import EyeIcon from "./svg/EyeIcon";
import { DataContext } from "./hooks/DataContext";

document.title =
  "Kanban : " +
  Motivational[Math.floor(Math.random() * Motivational.length)].phrase;

function App() {
  function toggleSideBar() {
    setOpen(!isSideBarOpen);
  }

  const [isSideBarOpen, setOpen] = useState(true);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const abortControllerRef = useRef(null);
  const [data, setData] = useState();
  const [currentBoard, setCurrentBoard] = useState();

  const values = {
    data,
    isLoading,
    isSideBarOpen,
    toggleSideBar,
    currentBoard,
    setCurrentBoard,
  };

  useEffect(() => {
    if (data) setCurrentBoard(data[0]);
  }, [data]);

  useEffect(() => {
    const fetchData = async () => {
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();

      setIsLoading(true);

      try {
        const response = await fetch("http://localhost:8089/boards", {
          signal: abortControllerRef.current?.signal,
        });
        const data = await response.json();
        setData(data);
      } catch (e) {
        console.error(e);
        if (e.name === "AbortError") return;
        setError(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (error) return <div id="loading-container">ERROR</div>;
  if (isLoading) return <div id="loading-container">LOADING...</div>;

  return (
    <DataContext.Provider value={values}>
      <div className="app">
        {isSideBarOpen && <Sidebar />}
        <Playground isSideBarOpen={isSideBarOpen} />

        {!isSideBarOpen && (
          <div className="show-side-bar-btn" onClick={toggleSideBar}>
            <EyeIcon />
          </div>
        )}
      </div>
    </DataContext.Provider>
  );
}

export default App;
