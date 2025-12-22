import "./App.css";
import FCFS from "./components/cs/os/fcfs";
import SJF from "./components/cs/os/SJF";
import { PageLayout } from "./components/pages/PageLayout";
function App() {
  return (
    <div>
      <PageLayout>
        <SJF />
      </PageLayout>
    </div>
  );
}

export default App;
