import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCurrentWeatherByCoords } from '../../services/weatherService';

export default function LocalWeather() {
  const [locationData, setLocationData] = useState<any>(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocalização não suportada neste navegador.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        fetchCurrentWeatherByCoords(latitude, longitude)
          .then(data => setLocationData(data))
          .catch(() => setError('Erro ao buscar clima da sua localização.'));
      },
      () => setError('Descubra o clima no local que está! Permita o acesso a localização no navegador.')
    );
  }, []);

  if (error) {
    return <div className="alert alert-warning text-center mt-4">{error}</div>;
  }

  if (!locationData) {
    return <div className="text-center mt-4">Detectando sua localização...</div>;
  }

  return (
    <div className="card mt-5 shadow-sm p-3 text-center">
      <h5 className="fw-bold">🌎 Clima no seu local atual ({locationData.name})</h5>
      <p className="mb-2 text-capitalize">{locationData.weather[0].description}</p>
      <img
        src={`https://openweathermap.org/img/wn/${locationData.weather[0].icon}@2x.png`}
        alt="Ícone do clima"
        width={64}
      />
      <p className="mt-2">Temperatura: {locationData.main.temp.toFixed(1)} °C</p>
      <p>Umidade: {locationData.main.humidity}%</p>
      <p>Vento: {locationData.wind.speed} m/s</p>

      <button
        className="btn btn-outline-primary mt-2"
        onClick={() => navigate(`/weather/${locationData.name}`)}
      >
        Ver mais detalhes
      </button>
    </div>
  );
}