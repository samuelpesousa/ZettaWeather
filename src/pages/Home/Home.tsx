import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LocalWeather from '../../components/LocalWeather/LocalWeather';
import '../../styles/main.scss';
import logoCombined from '../../assets/logo-zetta.png';

export default function Home() {
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState('');
  const navigate = useNavigate();

  const [history, setHistory] = useState<string[]>(() => {
    return JSON.parse(localStorage.getItem('city-history') || '[]');
  });

  
  useEffect(() => {
    const cities = ['Lavras', 'São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Divinópolis'];
    let i = 0;
    let charIndex = 0;
    let isDeleting = false;
    let currentText = '';

    const type = () => {
      const fullText = `Ex: ${cities[i]}`;
      
      if (isDeleting) {
        currentText = fullText.substring(0, currentText.length - 1);
      } else {
        currentText = fullText.substring(0, currentText.length + 1);
      }

      setPlaceholder(currentText);

      if (!isDeleting && currentText === fullText) {
        setTimeout(() => isDeleting = true, 2000);
      } else if (isDeleting && currentText === '') {
        isDeleting = false;
        i = (i + 1) % cities.length;
        setTimeout(type, 500);
        return;
      }

      const speed = isDeleting ? 75 : 150;
      setTimeout(type, speed);
    };

    type();
  }, []);


  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 5) return 'Boa madrugada';
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim() === '') {
      setError('Por favor, digite o nome da cidade.');
      return;
    }

    setIsLoading(true);
    
    try {
      const updatedHistory = [city, ...history.filter(c => c.toLowerCase() !== city.toLowerCase())].slice(0, 5);
      localStorage.setItem('city-history', JSON.stringify(updatedHistory));
      setHistory(updatedHistory);
      navigate(`/weather/${city}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="home-container">
      <video autoPlay loop muted playsInline className="background-video">
        <source src={require('../../assets/backgrounds/weather_video.mp4')} type="video/mp4" />
      </video>
      <div className="video-overlay"></div>

      <div className="content-wrapper text-center" style={{ backgroundColor: 'rgba(13, 13, 18, 0.8)', minHeight: '100vh', padding: '2rem', color: '#ffffff' }}>

       
        <div className="d-flex justify-content-center mb-3">
          <img 
            src={logoCombined} 
            alt="ZettaWeather Logo" 
            style={{ 
              width: '300px',
              height: 'auto',
              maxWidth: '100%',
              filter: 'drop-shadow(0 0 10px rgba(78, 91, 255, 0.7))'
            }} 
          />
        </div>

        
        <p className="mb-3" style={{ color: '#a0a0a0', fontSize: '1.1rem' }}>
          {getGreeting()},<br/>
          Consulte o clima atual de qualquer lugar:
        </p>

        
        <form onSubmit={handleSubmit} className="d-flex justify-content-center mb-4">
          <div style={{ position: 'relative', width: '100%', maxWidth: '500px' }}>
            <input
              type="text"
              className="form-control form-control-lg"
              style={{ 
                backgroundColor: '#2a2a34',
                color: '#ffffff',
                border: '1px solid #3a3a44',
                borderRadius: '25px',
                width: '100%',
                caretColor: '#ffffff',
                paddingRight: '50px' 
              }}
              placeholder={placeholder}
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
                setError('');
              }}
            />
            <button 
              type="submit" 
              className="btn"
              style={{ 
                position: 'absolute',
                right: '4px',
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: '#4e5bff',
                color: 'white',
                borderRadius: '50%',
                width: '42px',
                height: '42px',
                padding: '0',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'background-color 0.3s'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#3c47cc'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4e5bff'}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              ) : (
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
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              )}
            </button>
          </div>
        </form>

        {error && <div className="text-danger mb-3" style={{ color: '#ff6b6b' }}>{error}</div>}

        {history.length > 0 && (
          <div className="mb-4">
            <p style={{ color: '#a0a0a0', marginBottom: '0.5rem' }}>Seu histórico:</p>
            <div className="d-flex flex-wrap justify-content-center gap-2">
              {history.map((item, index) => (
                <button
                  key={index}
                  className="btn btn-sm"
                  style={{
                    backgroundColor: '#1a1a24',
                    color: '#a0a0a0',
                    border: 'none',
                    borderRadius: '20px',
                    padding: '0.3rem 0.8rem',
                    transition: 'background-color 0.3s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2a2a34'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#1a1a24'}
                  onClick={() => navigate(`/weather/${item}`)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}

        <LocalWeather />
      </div>
    </div>
  );
}