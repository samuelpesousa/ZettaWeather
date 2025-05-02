import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary py-3">
      <div className="container d-flex flex-column flex-lg-row justify-content-around align-items-center gap-3">

        {/* Logo centralizada */}
        <span className="navbar-brand text-white fw-bold fs-4 m-0">GeoWeather</span>

        {/* Links centralizados */}
        <ul className="navbar-nav flex-row flex-wrap justify-content-center gap-3 m-0">
          <li className="nav-item">
            <NavLink to="/" className="nav-link text-white" end>Início</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/blog" className="nav-link text-white">Blog</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/contato" className="nav-link text-white">Contato</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/sobre" className="nav-link text-white">Sobre</NavLink>
          </li>
        </ul>

      </div>
    </nav>
  );
}
