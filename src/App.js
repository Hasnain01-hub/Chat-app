import { Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Home from "./components/layout/Home";
import CraeteGroup from "./components/group/CraeteGroup";
import JoinGroup from "./components/group/JoinGroup";
import GroupChat from "./components/group/GroupChat";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/creategroup" element={<CraeteGroup />} />
        <Route path="/joingroup" element={<JoinGroup />} />
        <Route path="/groupchat" element={<GroupChat />} />
      </Routes>
    </div>
  );
}

export default App;
