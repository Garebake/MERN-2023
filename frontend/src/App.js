import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import Teams from './Pages/Teams';
import Players from './Pages/Players';

function App() {
  return (
    <div className="font-mono">
      <BrowserRouter>
        <Navbar />
        <div>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/teams' element={<Teams />} />
            <Route path='/players' element={<Players /> } />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
