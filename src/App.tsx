

// packages
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// pages -- authentication
import Home from "./pages/home";

const App = () => {

  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
        </Routes>
    </Router>
  );
};

export default App;
