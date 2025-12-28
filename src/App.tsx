import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css"
import Home from "./components/pages/Home";
import AlgoMainPage from "./components/cs/algo/AlgoMainPage";
import CAMainPage from "./components/cs/ca/CAMainPage";
import DBMainPage from "./components/cs/db/DBMainPage";
import DSMainPage from "./components/cs/ds/DSMainPage";
import OSMainPage from "./components/cs/os/OSMainPage";
import NetworkMainPage from "./components/cs/network/NetworkMainPage";
import Layout from "./components/pages/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/os" element={<OSMainPage />} />
        <Route path="/algo" element={<AlgoMainPage />} />
        <Route path="/ca" element={<CAMainPage />} />
        <Route path="/db" element={<DBMainPage />} />
        <Route path="/ds" element={<DSMainPage />} />
        <Route path="/network" element={<NetworkMainPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
