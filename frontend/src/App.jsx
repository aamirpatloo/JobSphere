import { Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import Layout from "./components/Layout";
import CreateJob from "./pages/CreateJob";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Jobs from "./pages/Jobs";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-job" element={<CreateJob />} />
        <Route path="/jobs" element={<Jobs />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;