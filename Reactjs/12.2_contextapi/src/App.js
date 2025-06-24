import logo from './logo.svg';
import './App.css';
import Item from './components/Item';
import Cart from './components/Cart';

function App() {
  return (
    <div className="App">
      <Item name="MacBook" price="1000"/>
      <Item name="PS5" price="500"/>
      <Item name="GTS6" price="50"/>
      <Cart />
    </div>
  );
}

export default App;
