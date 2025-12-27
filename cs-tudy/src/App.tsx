import "./App.css"
import { useState } from "react";
import { PageLayout } from "./components/pages/PageLayout";
import FCFS from "./components/cs/os/FCFS";
import SJF from "./components/cs/os/SJF";

function App() {
  const [currentPage, setCurrentPage] = useState("SJF");

  return (
    <>
    <div className="button-container">
      <button className="post-it-button" onClick={() => setCurrentPage("FCFS")}>FCFS</button>
      <button className="post-it-button" onClick={() => setCurrentPage("SJF")}>SJF</button>
    </div>
      <PageLayout>
        {currentPage === "SJF" && <SJF />}
        {currentPage === "FCFS" && <FCFS />}
      </PageLayout>
    </>
  );
}

export default App;
