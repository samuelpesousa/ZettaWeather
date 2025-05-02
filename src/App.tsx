import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import WeatherDetails from './pages/WeatherDetails/WeatherDetails';
import Forecast from './pages/Forecast/Forecast';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/weather/:city" element={<WeatherDetails />} />
          <Route path="/forecast/:city" element={<Forecast />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
