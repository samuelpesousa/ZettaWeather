import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/main.scss';
import { 
  fetchCurrentWeatherByCoords, 
  fetchForecastByCoords 
} from '../../services/weatherService';

interface WeatherData {
  name: string;
  weather: {
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
}

interface ForecastItem {
  dt_txt: string;
  weather: {
    icon: string;
    description: string;
  }[];
  main: {
    temp: number;
    humidity: number;
  };
}

export default function LocalWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastItem[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        if (!navigator.geolocation) {
          throw new Error('Geolocalização não suportada');
        }

        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { latitude, longitude } = position.coords;
        
        const [currentWeather, forecastData] = await Promise.all([
          fetchCurrentWeatherByCoords(latitude, longitude),
          fetchForecastByCoords(latitude, longitude)
        ]);

        setWeather(currentWeather);
        setForecast(forecastData.list);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar dados');
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  if (loading) {
    return <div className="text-center mt-4">Detectando sua localização...</div>;
  }

  if (error) {
    return <div className="alert alert-warning text-center mt-4">{error}</div>;
  }

  if (!weather) {
    return <div className="text-center mt-4">Não foi possível obter dados meteorológicos</div>;
  }

  return (
    <div className="row justify-content-center mt-5">
    <div className="col-12 col-md-5 mb-4 d-flex">
  <div
    className="p-4 w-100 shadow-sm"
    style={{
      backgroundColor: '#1e1e2f',
      borderRadius: '12px',
      color: '#f5f5f5',
    }}
  >
    <h5 className="text-start fw-bold">
      Clima na cidade atual ({weather.name})
    </h5>
    <p className="text-start text-capitalize">
      {weather.weather[0].description}
    </p>
    <div className="d-flex justify-content-between align-items-center">
      <div className="text-start">
        <p>Temperatura: {weather.main.temp.toFixed(1)} °C</p>
        <p>Umidade: {weather.main.humidity} %</p>
        <p>Vento: {weather.wind.speed} m/s</p>
      </div>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt="Ícone do clima"
        width={80}
        className="img-fluid"
      />
    </div>
    <div className="mt-auto">
      <button
        className="btn w-100 mt-3"
        style={{
          backgroundColor: '#3b82f6',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
        }}
        onClick={() => navigate(`/weather/${weather.name}`)}
      >
        Ver previsão
      </button>
    </div>
  </div>
</div>


{forecast.length > 0 && (
  <div className="col-12 col-md-6 mb-4 d-flex">
    <div
      className="p-4 w-100 shadow-sm"
      style={{
        backgroundColor: '#1e1e2f',
        borderRadius: '12px',
        color: '#f5f5f5',
      }}
    >
      <h5 className="text-start fw-bold">
        Previsão para {weather.name}
      </h5>
      <div className="d-flex flex-wrap gap-3 mt-3">
        {forecast
          .filter((_, index) => index % 8 === 0)
          .slice(0, 3)
          .map((item, index) => (
            <div
              key={index}
              className="p-3 text-center flex-grow-1"
              style={{
                backgroundColor: '#2b2b3c',
                borderRadius: '10px',
                border: '1px solid #444',
                flexBasis: '30%',
              }}
            >
              <p className="fw-bold mb-2" style={{ color: '#f5f5f5' }}>
                {new Date(item.dt_txt).toLocaleDateString('pt-BR')}
              </p>
              <img
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                alt="Ícone do clima"
                width={50}
                className="img-fluid"
              />
              <p className="mb-1" style={{ color: '#f5f5f5' }}>
                Temp: {item.main.temp.toFixed(1)} °C
              </p>
              <p className="mb-0" style={{ color: '#f5f5f5' }}>
                Umidade: {item.main.humidity}%
              </p>
            </div>
          ))}
      </div>
      <div className="mt-auto">
        <button
          className="btn w-100 mt-3"
          style={{
            backgroundColor: '#3b82f6',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
          }}
          onClick={() => navigate(`/forecast/${weather.name}`)}
        >
          Ver detalhes
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}