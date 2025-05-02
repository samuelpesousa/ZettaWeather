import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchCurrentWeather } from '../../services/weatherService';
import Loading from '../../components/Loading/Loading';


export default function WeatherDetails() {
  const { city } = useParams();
  const [weather, setWeather] = useState<any>(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (city) {
      fetchCurrentWeather(city)
        .then(data => setWeather(data))
        .catch(err => setError('Cidade não encontrada ou erro na API.'));
    }
  }, [city]);

  if (error) return <div className="alert alert-danger text-center mt-5">{error}</div>;
  if (!weather) return <Loading />;

  return (
    <div className="text-center">
      <h2 className="mb-3">Clima em {weather.name}</h2>
      <p className="lead">{weather.weather[0].description}</p>

      <div className="d-flex justify-content-center align-items-center my-4">
        <div className="me-4 text-start">
          <p><strong>Temperatura:</strong> {weather.main.temp.toFixed(1)} °C</p>
          <p><strong>Umidade:</strong> {weather.main.humidity} %</p>
          <p><strong>Vento:</strong> {weather.wind.speed} m/s</p>
        </div>

        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt="Ícone do clima"
        />
      </div>

      <div className="d-flex justify-content-center gap-3 mt-4">
        <Link to={`/forecast/${city}`} className="btn btn-primary">Ver previsão</Link>
        <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>Voltar</button>
      </div>
    </div>
  );
}
