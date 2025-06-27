import { getDatabase, ref, set } from 'firebase/database';
import { app } from './firebase';
import './App.css';

const db = getDatabase(app);

function App() {

  const putData = ()=>{
    set(ref(db, "users/soham"), {
      id: 1,
      name: "Soham",
      age: 20,
    });
  };

  return (
    <div className="App">
      <h1>Setting up React with Firebase</h1>
      <button onClick={putData}>Put Data</button>
    </div>
  );
}

export default App;
