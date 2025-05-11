import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import WeatherDetails from './pages/WeatherDetails/WeatherDetails';
import Forecast from './pages/Forecast/Forecast';
import Sobre from './pages/Sobre/Sobre';
import Contato from './pages/Contato/Contato';
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/weather/:city" element={<WeatherDetails />} />
          <Route path="/forecast/:city" element={<Forecast />} />
        </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
