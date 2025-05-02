import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCurrentWeather, fetchForecast } from '../../services/weatherService';

export default function LavrasPreview() {
  const [weather, setWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any[]>([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCurrentWeather('Lavras')
      .then(data => setWeather(data))
      .catch(() => setError('Erro ao buscar o clima de Lavras.'));

    fetchForecast('Lavras')
      .then(data => setForecast(data.list))
      .catch(() => setError('Erro ao buscar previsão de Lavras.'));
  }, []);

  if (error) {
    return <div className="alert alert-danger text-center">{error}</div>;
  }

  if (!weather || forecast.length === 0) {
    return <div className="text-center">Carregando clima de Lavras...</div>;
  }

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-12 col-md-5 mb-4">
        <div className="card shadow-sm p-3">
          <h5 className="text-start fw-bold">Clima em {weather.name}</h5>
          <p className="text-start">{weather.weather[0].description}</p>
          <div className="d-flex justify-content-between align-items-center">
            <div className="text-start">
              <p>Temperatura: {weather.main.temp.toFixed(1)} °C</p>
              <p>Umidade: {weather.main.humidity} %</p>
              <p>Vento: {weather.wind.speed} m/s</p>
            </div>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="Ícone do clima"
            />
          </div>
          <button
            className="btn btn-primary w-100 mt-3"
            onClick={() => navigate('/weather/Lavras')}
          >
            Ver previsão
          </button>
        </div>
      </div>

      <div className="col-12 col-md-6 mb-4">
        <div className="card shadow-sm p-3">
          <h5 className="text-start fw-bold">Previsão para Lavras</h5>
          <div className="d-flex justify-content-start flex-wrap gap-3 mt-2">
            {forecast
              .filter((_, index) => index % 8 === 0) // um por dia
              .slice(0, 3)
              .map((item, index) => (
                <div key={index} className="border rounded p-2 text-start">
                  <p className="mb-1 fw-bold">
                    {new Date(item.dt_txt).toLocaleDateString('pt-BR')}
                  </p>
                  <img
                    src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                    alt="Ícone do clima"
                    width={50}
                  />
                  <p className="mb-1">Temp: {item.main.temp.toFixed(1)} °C</p>
                  <p className="mb-0">Umidade: {item.main.humidity}%</p>
                </div>
              ))}
          </div>
          <button
            className="btn btn-outline-secondary mt-3"
            onClick={() => navigate('/forecast/Lavras')}
          >
            Ver detalhes
          </button>
        </div>
      </div>
    </div>
  );
}
