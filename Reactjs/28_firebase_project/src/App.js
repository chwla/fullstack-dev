import {Routes, Route} from "react-router-dom";

//CSS
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

//PAGES
import RegisterPage from './pages/Register';
import LoginPage from "./pages/Login";

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<h1>Home</h1>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
