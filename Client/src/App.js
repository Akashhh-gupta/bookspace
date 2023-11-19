import './App.css';
import Home from './Components/Home';
import About from './Components/About';
import NavBar from './Components/NavBar';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Login from './Components/Login';
import Signup from './Components/Signup';

function App() {
  return (
    <div className="App">
      <NoteState>
        <Router>
          <NavBar />
          <Routes>
            <Route exact path='/' element={<Home />}></Route>
            <Route exact path='/about' element={<About />}></Route>
            <Route exact path='/login' element={<Login />}></Route>
            <Route exact path='/signup' element={<Signup />}></Route>
          </Routes>
        </Router>
      </NoteState>
    </div>
  );
}

export default App;
