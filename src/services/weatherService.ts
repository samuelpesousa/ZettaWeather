const API_KEY = 'f416820ae41fc3c8005a66f5ecbeeea6'; 
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export async function fetchCurrentWeather(city: string) {
  const response = await fetch(`${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric&lang=pt_br`);
  if (!response.ok) throw new Error('Erro ao buscar clima atual');
  return response.json();
}

export async function fetchForecast(city: string) {
  const response = await fetch(`${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=pt_br`);
  if (!response.ok) throw new Error('Erro ao buscar previsão');
  return response.json();
}

export async function fetchCurrentWeatherByCoords(lat: number, lon: number) {
    const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=pt_br`;
  
    const response = await fetch(url);
    if (!response.ok) throw new Error('Erro ao buscar clima por coordenadas');
    return response.json();
  }
  export async function fetchForecastByCoords(lat: number, lon: number) {
    const url = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=pt_br`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Erro ao buscar previsão por coordenadas');
    return response.json();
  }