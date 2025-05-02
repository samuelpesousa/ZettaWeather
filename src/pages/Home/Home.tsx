import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LavrasPreview from '../../components/LavrasPreview/LavrasPreview';
import LocalWeather from '../../components/LocalWeather/LocalWeather';

export default function Home() {
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [history, setHistory] = useState<string[]>(() => {
    return JSON.parse(localStorage.getItem('city-history') || '[]');
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim() === '') {
      setError('Por favor, digite o nome da cidade.');
      return;
    }

    const updatedHistory = [city, ...history.filter(c => c.toLowerCase() !== city.toLowerCase())].slice(0, 5);
    localStorage.setItem('city-history', JSON.stringify(updatedHistory));
    setHistory(updatedHistory);
    navigate(`/weather/${city}`);
  };

  return (
    <div className="container text-center mt-5">

      {/* Cabeçalho */}
      <h1 className="mb-4 display-4 text-primary fw-bold">GeoWeather</h1>
      <p className="lead mb-4">Consulte o clima atual de qualquer cidade</p>

      {/* Formulário de busca */}
      <form onSubmit={handleSubmit} className="row justify-content-center align-items-center mb-3">
        <div className="col-10 col-sm-8 col-md-5 col-lg-4 mb-2 mb-sm-0">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Digite o nome da cidade"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              setError('');
            }}
          />
        </div>
        <div className="col-auto">
          <button type="submit" className="btn btn-primary btn-lg">Buscar</button>
        </div>
      </form>

      {/* Erro */}
      {error && <div className="text-danger mb-3">{error}</div>}

      {/* Histórico */}
      {history.length > 0 && (
        <div className="mt-3">
          <div className="d-flex flex-wrap justify-content-center gap-2">
            {history.map((item, index) => (
              <button
                key={index}
                className="btn btn-outline-secondary btn-sm"
                onClick={() => navigate(`/weather/${item}`)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Clima em Lavras */}
      <LavrasPreview />

      {/* Clima no local do usuário */}
      <LocalWeather />

      {/* Seção: Compartilhe e Aprenda */}
      <div className="container mt-5">
        <h2 className="text-center mb-4 text-primary fw-bold">🌤️ Compartilhe e aprenda sobre o clima</h2>
        <div className="row justify-content-center">

          {/* Compartilhe */}
          <div className="col-12 col-sm-10 col-md-5 mb-4">
            <div className="card h-100 shadow-sm p-4 text-center">
              <h5 className="mb-3 fw-bold">📤 Compartilhe o clima na sua cidade</h5>
              <p className="mb-3">Conte para nós como está o clima onde você está e ajude outras pessoas!</p>
              <button className="btn btn-outline-primary" onClick={() => navigate('/contato')}>
                Enviar relato
              </button>
            </div>
          </div>

          {/* Aprenda */}
          <div className="col-12 col-sm-10 col-md-5 mb-4">
            <div className="card h-100 shadow-sm p-4 text-center">
              <h5 className="mb-3 fw-bold">📚 Aprenda mais sobre o clima</h5>
              <p className="mb-3">Acesse nosso blog e descubra como o clima funciona, previsões e curiosidades.</p>
              <button className="btn btn-primary" onClick={() => navigate('/blog')}>
                Acessar blog
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
