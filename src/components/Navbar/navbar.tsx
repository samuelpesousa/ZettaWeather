import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import logoCombined from '../../assets/logo-zetta.png'; 

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="navbar navbar-expand-lg py-2" 
      style={{
        backgroundColor: '#0d0d12',
        borderBottom: '1px solid #2a2a34',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)'
      }}
    >
      <div className="container d-flex flex-column flex-lg-row justify-content-lg-between align-items-center gap-2"> {/* Reduzi o gap */}

        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="d-flex align-items-center"
        >
          <Link to="/" className="text-decoration-none">
            <img 
              src={logoCombined} 
              alt="ZettaWeather Logo" 
              style={{ 
                height: '68px', 
                width: 'auto',
                filter: 'drop-shadow(0 0 5px rgba(78, 91, 255, 0.3))'
              }} 
            />
          </Link>
        </motion.div>

        
        <ul className="navbar-nav flex-row flex-wrap justify-content-center gap-2 m-0"> {/* Reduzi o gap */}
          {[
            { to: "/", text: "Início" },
            { to: "/sobre", text: "Sobre" },
            { to: "/contato", text: "Contato" }
          ].map((item) => (
            <motion.li 
              key={item.to}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="nav-item"
            >
              <NavLink 
                to={item.to} 
                className="nav-link position-relative"
                style={({ isActive }) => ({ 
                  color: isActive ? '#4e5bff' : '#a0a0a0',
                  fontWeight: isActive ? '600' : '400',
                  padding: '0.4rem 0.8rem', 
                  transition: 'all 0.3s ease',
                  fontSize: '0.95rem' 
                })}
                end
              >
                {item.text}

                <motion.span
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    height: '2px',
                    backgroundColor: '#4e5bff'
                  }}
                />
              </NavLink>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.nav>
  );
}