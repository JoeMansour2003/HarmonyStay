import './App.css';
import './HotelsList';
import HotelsList from './HotelsList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
       <p>
        <h1> Welcome to Innfinity!</h1>
       </p>
       <HotelsList></HotelsList>
      </header>
    </div>
  );
}

export default App;
