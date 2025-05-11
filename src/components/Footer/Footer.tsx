import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import logoCombined from '../../assets/logo-zetta.png'; // Importe a mesma logo usada no navbar

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="py-4" 
      style={{
        backgroundColor: '#0d0d12',
        borderTop: '1px solid #2a2a34',
        boxShadow: '0 -4px 12px rgba(0, 0, 0, 0.25)'
      }}
    >
      <div className="container">
        <div className="d-flex flex-column align-items-center gap-2"> {/* Reduzi o gap */}
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img 
              src={logoCombined} 
              alt="ZettaWeather Logo" 
              style={{ 
                height: '60px',
                width: 'auto',
                filter: 'drop-shadow(0 0 5px rgba(78, 91, 255, 0.3))'
              }} 
            />
          </motion.div>

          <motion.p 
            className="m-0"
            style={{ color: '#a0a0a0', fontSize: '0.9rem' }} 
            whileHover={{ color: '#ffffff' }}
            transition={{ duration: 0.3 }}
          >
            &copy; ZettaLab 2025 - Todos os direitos reservados
          </motion.p>

          <motion.p
            className="m-0"
            style={{ color: '#a0a0a0', fontSize: '0.9rem' }}
            whileHover={{ 
              color: '#4e5bff',
              scale: 1.05
            }}
            transition={{ duration: 0.3 }}
          >
            Desenvolvido por <span style={{ fontWeight: '600' }}>Samuel de Paula e Sousa</span>
          </motion.p>

          <motion.div 
            className="d-flex gap-3 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <motion.a
              href="https://github.com/samuelpesousa/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none"
              style={{ color: '#a0a0a0' }}
              whileHover={{ 
                color: '#4e5bff',
                scale: 1.2
              }}
              transition={{ duration: 0.2 }}
              aria-label="GitHub"
            >
              <GithubIcon />
            </motion.a>

            <motion.a
              href="https://www.linkedin.com/in/samuel-de-paula-e-sousa-6879b41b2/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none"
              style={{ color: '#a0a0a0' }}
              whileHover={{ 
                color: '#4e5bff',
                scale: 1.2
              }}
              transition={{ duration: 0.2 }}
              aria-label="LinkedIn"
            >
              <LinkedinIcon />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
}