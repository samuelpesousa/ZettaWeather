import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3">
      <Link className="navbar-brand" to="/">GeoWeather</Link>
      <div className="navbar-nav">
        <Link className="nav-link" to="/">Início</Link>
      </div>
    </nav>
  );
}
