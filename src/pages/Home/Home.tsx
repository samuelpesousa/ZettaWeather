import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div className="text-center mt-5">
      <h1 className="mb-4">Consulta Climática</h1>

      <form onSubmit={handleSubmit} className="d-flex justify-content-center align-items-center flex-wrap gap-2">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Digite o nome da cidade"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
            setError('');
          }}
        />
        <button type="submit" className="btn btn-primary">Buscar</button>
      </form>

      {error && <div className="text-danger mt-2">{error}</div>}

      {history.length > 0 && (
        <div className="mt-4">
          <h5>Últimas buscas:</h5>
          <ul className="list-inline">
            {history.map((item, index) => (
              <li key={index} className="list-inline-item">
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => navigate(`/weather/${item}`)}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
