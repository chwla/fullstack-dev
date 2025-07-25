import {Routes, Route} from "react-router-dom";

//COMPONENTS
import MyNavbar from "./components/Navbar";

//CSS
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

//PAGES
import RegisterPage from './pages/Register';
import LoginPage from "./pages/Login";
import ListingPage from "./pages/List";

function App() {
  return (
    <div>
      <MyNavbar/>
      <Routes>
        <Route path="/" element={<h1>Home</h1>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/book/list" element={<ListingPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
