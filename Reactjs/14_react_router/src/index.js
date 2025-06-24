import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route, Outlet, useParams} from "react-router-dom";

const Home = () => <h1>Home Page</h1>;
const About = () => <h1>About Page</h1>;
const Profile = () => <h1>Profile Page</h1>;

const AccountLayout = () => (
  <div>
    <h1>Account Section</h1>
    <Outlet />
  </div>
);

const SayUser = () => {
  const { userId } = useParams();

  return (
    <div>
      <h1>Your name is {userId}</h1>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/user/:userId" element={<SayUser />} />
        <Route path="/account" element={<AccountLayout />}>
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
