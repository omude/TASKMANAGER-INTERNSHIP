import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import MyTasks from "./pages/MyTasks";
import NewTask from "./pages/NewTask";
import EditTask from "./pages/EditTask";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mytask" element={<MyTasks />} />
        <Route path="/newtask" element={<NewTask />} />
        <Route path="/edittask" element={<EditTask />} />
      </Routes>
    </>
  );
}

export default App;
