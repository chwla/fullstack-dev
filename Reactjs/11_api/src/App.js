import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { getPosts, getRandomuser } from './api/index';
import PostCard from './components/PostCard';
import UserCard from './components/UserCard';

function App() {
  const [data, setData] = useState([]);
  const [UserData, setUserData] = useState(null);

  useEffect(() => {
    getPosts().then((posts) => setData(posts));
  }, []);

  useEffect(() => {
    getRandomuser().then((user) => setUserData(user.results[0]));
  }, []);

  const refresh = () => {
    getRandomuser().then((user) => setUserData(user.results[0]));
  };

  return (
    <div className="App">
      {UserData && <UserCard data={UserData} />}
      <button onClick={refresh}>Refresh User</button>
      {data.length > 0 ? (
        data.map((e) => <PostCard key={e.id} title={e.title} body={e.body} />)
      ) : (
        <p>No data</p>
      )}
    </div>
  );
}

export default App;
