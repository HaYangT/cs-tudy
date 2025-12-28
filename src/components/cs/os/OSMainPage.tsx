import { useState } from "react";
import FCFS from "./FCFS";
import SJF from "./SJF";

function OSMainPage() {
  const [currentPage, setCurrentPage] = useState<"FCFS" | "SJF">("SJF");

  return (
    <>
      <div className="section-tabs">
        <button
          className={currentPage === "FCFS" ? "tab active" : "tab"}
          onClick={() => setCurrentPage("FCFS")}
        >
          FCFS
        </button>
        <button
          className={currentPage === "SJF" ? "tab active" : "tab"}
          onClick={() => setCurrentPage("SJF")}
        >
          SJF
        </button>
      </div>

      <section className="page-content">
        {currentPage === "FCFS" && <FCFS />}
        {currentPage === "SJF" && <SJF />}
      </section>
    </>
  );
}

export default OSMainPage;
