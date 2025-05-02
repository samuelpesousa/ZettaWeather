import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchForecast } from '../../services/weatherService';
import Loading from '../../components/Loading/Loading';

export default function Forecast() {
  const { city } = useParams();
  const navigate = useNavigate();
  const [forecast, setForecast] = useState<any[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (city) {
      fetchForecast(city)
        .then(data => setForecast(data.list))
        .catch(() => setError('Erro ao buscar previsão.'));
    }
  }, [city]);

  if (error) return <div className="alert alert-danger text-center mt-5">{error}</div>;
  if (!forecast.length) return <Loading />;

  return (
    <div className="container text-center">
      <h2 className="mb-4">Previsão para {city}</h2>

      <div className="row justify-content-center">
        {forecast
          .filter((_, index) => index % 8 === 0)
          .map((item, index) => (
            <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
              <div className="card shadow-sm p-3">
                <h5>{new Date(item.dt_txt).toLocaleDateString('pt-BR')}</h5>
                <img
                  src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                  alt="Ícone do clima"
                />
                <p className="mb-1">{item.weather[0].description}</p>
                <p className="mb-1"><strong>Temp:</strong> {item.main.temp.toFixed(1)} °C</p>
                <p className="mb-0"><strong>Umidade:</strong> {item.main.humidity}%</p>
              </div>
            </div>
          ))}
      </div>

      <button className="btn btn-outline-secondary mt-3" onClick={() => navigate(-1)}>
        Voltar
      </button>
    </div>
  );
}
