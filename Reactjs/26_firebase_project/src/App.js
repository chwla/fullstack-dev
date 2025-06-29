import { getFirestore, collection, addDoc} from "firebase/firestore";
import { app } from "./firebase";
import './App.css';

const firestore = getFirestore(app);

function App() {

  const writeData = async()=>{
    const result = await addDoc(collection(firestore, "cities"),{
      name: "Delhi",
      pinCode: 1234,
      lat: 123,
      long: 456,
    });
  };

  return (
    <div className="App">
      <h1>Firebase Firestore</h1>
      <button onClick={writeData}>Put Data</button>
    </div>
  );
}

export default App;
