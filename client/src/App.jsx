import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from './pages/Home';
import Success from "./pages/success";
import NotFound from './pages/NotFound';
import CommentsPage from './pages/Comments';
import AdminReservations from "./pages/AdminReservations";

const App = () => {
  return (
  <Router>
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/success" element={<Success/>}/>
        <Route path="*" element={<NotFound/>}/>
        <Route path="/comments" element={<CommentsPage/>}/>
        <Route path="/panel" element={<AdminReservations />} />
    </Routes>
    <Toaster/>
  </Router>
  );
};

export default App;
