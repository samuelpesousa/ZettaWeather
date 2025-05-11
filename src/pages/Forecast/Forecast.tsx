import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchForecast } from '../../services/weatherService';
import Loading from '../../components/Loading/Loading';
import WeatherIcon from '../../components/WeatherIcon';
import { motion } from 'framer-motion';

interface ForecastItem {
  dt: number;
  dt_txt: string;
  weather: {
    description: string;
    icon: string;
    main: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
}

export default function Forecast() {
  const { city } = useParams();
  const navigate = useNavigate();
  const [forecast, setForecast] = useState<ForecastItem[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (city) {
      setLoading(true);
      fetchForecast(city)
        .then(data => {
          setForecast(data.list);
          setError('');
        })
        .catch(() => setError('Erro ao buscar previsão. Tente novamente mais tarde.'))
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

  if (!forecast.length) return null;

  const dailyForecast = forecast.reduce((acc: Record<string, ForecastItem[]>, item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString('pt-BR');
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-4"
      style={{
        backgroundColor: '#0d0d12',
        minHeight: '100vh',
        color: '#ffffff'
      }}
    >
      {/* Botão de voltar no topo */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate(-1)}
        style={{
          backgroundColor: 'transparent',
          border: 'none',
          color: '#a0a0a0',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '1rem',
          cursor: 'pointer',
          padding: '0.5rem 0'
        }}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Voltar
      </motion.button>

      <motion.div
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="text-center mb-4"
      >
        <h2 style={{ color: '#4e5bff', fontSize: '1.5rem' }}>Previsão para {city}</h2>
        <p style={{ color: '#a0a0a0', fontSize: '0.9rem' }}>Próximos 6 dias</p>
      </motion.div>

      <div className="row justify-content-center g-3">
        {Object.entries(dailyForecast).slice(0, 6).map(([date, items], index) => {
          const dayData = items[Math.floor(items.length / 2)];
          const minTemp = Math.min(...items.map(item => item.main.temp_min));
          const maxTemp = Math.max(...items.map(item => item.main.temp_max));

          return (
            <motion.div
              key={date}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="col-12 col-sm-6 col-md-4 col-lg-3"
            >
              <div 
                className="p-3 rounded h-100"
                style={{
                  backgroundColor: '#1a1a24',
                  border: '1px solid #2a2a34',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                }}
              >
                <h4 
                  className="mb-2" 
                  style={{ 
                    color: '#ffffff', 
                    fontSize: '1rem',
                    textAlign: 'center'
                  }}
                >
                  {new Date(dayData.dt * 1000).toLocaleDateString('pt-BR', { 
                    weekday: 'short', 
                    day: 'numeric', 
                    month: 'short' 
                  })}
                </h4>

                <div className="d-flex justify-content-center mb-2">
                  <WeatherIcon 
                    condition={dayData.weather[0].main}
                    
                  />
                </div>

                <p 
                  className="text-capitalize mb-2 text-center" 
                  style={{ 
                    color: '#a0a0a0',
                    fontSize: '0.8rem'
                  }}
                >
                  {dayData.weather[0].description}
                </p>

                <div className="d-flex justify-content-between mb-1">
                  <span style={{ color: '#ffffff', fontSize: '0.8rem' }}>Máx:</span>
                  <span style={{ color: '#ff6b6b', fontSize: '0.8rem' }}>{maxTemp.toFixed(1)}°</span>
                </div>

                <div className="d-flex justify-content-between mb-1">
                  <span style={{ color: '#ffffff', fontSize: '0.8rem' }}>Mín:</span>
                  <span style={{ color: '#4e5bff', fontSize: '0.8rem' }}>{minTemp.toFixed(1)}°</span>
                </div>

                <div className="d-flex justify-content-between mb-1">
                  <span style={{ color: '#ffffff', fontSize: '0.8rem' }}>Sensação:</span>
                  <span style={{ color: '#a0a0a0', fontSize: '0.8rem' }}>{dayData.main.feels_like.toFixed(1)}°</span>
                </div>

                <div className="d-flex justify-content-between mb-1">
                  <span style={{ color: '#ffffff', fontSize: '0.8rem' }}>Umidade:</span>
                  <span style={{ color: '#a0a0a0', fontSize: '0.8rem' }}>{dayData.main.humidity}%</span>
                </div>

                <div className="d-flex justify-content-between">
                  <span style={{ color: '#ffffff', fontSize: '0.8rem' }}>Vento:</span>
                  <span style={{ color: '#a0a0a0', fontSize: '0.8rem' }}>{(dayData.wind.speed * 3.6).toFixed(1)}km/h</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}