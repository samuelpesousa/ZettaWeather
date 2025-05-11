import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchCurrentWeather } from '../../services/weatherService';
import Loading from '../../components/Loading/Loading';
import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';

interface WeatherData {
  name: string;
  weather: { description: string; icon: string }[];
  main: { temp: number; humidity: number; feels_like: number };
  wind: { speed: number };
  sys?: { sunrise: number; sunset: number };
  dt?: number;
}

export default function WeatherDetails() {
  const { city } = useParams<{ city: string }>();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (city) {
      setLoading(true);
      fetchCurrentWeather(city)
        .then(data => {
          setWeather(data);
          setError('');
        })
        .catch(() => setError('Cidade não encontrada ou erro na API.'))
        .finally(() => setLoading(false));
    }
  }, [city]);

  if (loading) return <Loading />;

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center mt-5 p-4 rounded"
        style={{
          backgroundColor: '#1a1a24',
          maxWidth: '500px',
          margin: '2rem auto',
          border: '1px solid #ff6b6b'
        }}
      >
        <h3 style={{ color: '#ff6b6b' }}>Erro</h3>
        <p style={{ color: '#a0a0a0' }}>{error}</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn mt-3"
          style={{ backgroundColor: '#4e5bff', color: 'white' }}
          onClick={() => navigate('/')}
        >
          Voltar para início
        </motion.button>
      </motion.div>
    );
  }

  if (!weather) return null;


  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className=" text-center py-4"
      style={{
        backgroundColor: '#0d0d12',
        minHeight: '100vh',
        color: '#ffffff'
      }}
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="p-4 rounded mb-4 position-relative"
        style={{
          backgroundColor: '#1a1a24',
          maxWidth: '800px',
          margin: '0 auto',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
        }}
      >

        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(-1)}
          style={{
            position: 'absolute',
            left: '20px',
            top: '20px',
            backgroundColor: 'transparent',
            border: 'none',
            color: '#a0a0a0',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            cursor: 'pointer'
          }}
        >
         <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Voltar
        </motion.button>

        <h2 className="mb-3" style={{ color: '#4e5bff' }}>Clima em {weather.name}</h2>
        
        <motion.div 
          className="d-flex flex-column align-items-center mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
            alt="Ícone do clima"
            style={{ width: '120px', height: '120px' }}
          />
          <p 
            className="lead text-capitalize mt-2 fs-4"
            style={{ color: '#a0a0a0' }}
          >
            {weather.weather[0].description}
          </p>
        </motion.div>

        <div className="row justify-content-center gap-4">
          <div className="col-md-5 text-start p-4 rounded" style={{ backgroundColor: '#2a2a34' }}>
            <h4 style={{ color: '#4e5bff', borderBottom: '1px solid #3a3a44', paddingBottom: '0.5rem' }}>
              Condições Atuais
            </h4>
            <div className="mt-3">
              <p><strong style={{ color: '#ffffff' }}>Temperatura:</strong> <span style={{ color: '#a0a0a0' }}>{weather.main.temp.toFixed(1)} °C</span></p>
              <p><strong style={{ color: '#ffffff' }}>Sensação Térmica:</strong> <span style={{ color: '#a0a0a0' }}>{weather.main.feels_like.toFixed(1)} °C</span></p>
              <p><strong style={{ color: '#ffffff' }}>Umidade:</strong> <span style={{ color: '#a0a0a0' }}>{weather.main.humidity}%</span></p>
              <p><strong style={{ color: '#ffffff' }}>Vento:</strong> <span style={{ color: '#a0a0a0' }}>{(weather.wind.speed * 3.6).toFixed(1)} km/h</span></p>
            </div>
          </div>

          {weather.sys && weather.dt && (
            <div className="col-md-5 text-start p-4 rounded" style={{ backgroundColor: '#2a2a34' }}>
              <h4 style={{ color: '#4e5bff', borderBottom: '1px solid #3a3a44', paddingBottom: '0.5rem' }}>
                Ciclo Solar
              </h4>
              <div className="mt-3">
                <p><strong style={{ color: '#ffffff' }}>Nascer do Sol:</strong> <span style={{ color: '#a0a0a0' }}>{formatTime(weather.sys.sunrise)}</span></p>
                <p><strong style={{ color: '#ffffff' }}>Pôr do Sol:</strong> <span style={{ color: '#a0a0a0' }}>{formatTime(weather.sys.sunset)}</span></p>
                <p><strong style={{ color: '#ffffff' }}>Hora Local:</strong> <span style={{ color: '#a0a0a0' }}>{formatTime(weather.dt)}</span></p>
              </div>
            </div>
          )}
        </div>

        <div className="d-flex justify-content-center gap-3 mt-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link 
              to={`/forecast/${city}`} 
              className="btn"
              style={{ 
                backgroundColor: '#4e5bff', 
                color: 'white',
                border: 'none',
                padding: '0.5rem 1.5rem'
              }}
            >
              Ver previsão completa
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}