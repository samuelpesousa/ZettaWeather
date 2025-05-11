import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const FaArrowLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

const TechIcon = ({ color, children }: { color: string; children: React.ReactNode }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill={color}>
    {children}
  </svg>
);

export default function AboutPage() {
  const technologies = [
    { name: 'React', color: '#61DAFB', icon: <path d="M12 18c3.31 0 6-2.69 6-6s-2.69-6-6-6-6 2.69-6 6 2.69 6 6 6z" /> },
    { name: 'TypeScript', color: '#3178C6', icon: <path d="M3 3h18v18H3V3zm10.5 15v-2.5h-2.5V12H13v3h3V8.5h-3V6h6v12h-5.5z" /> },
    { name: 'Vite', color: '#646CFF', icon: <path d="M12 2L2 19h20L12 2zm0 3.5L18.5 17h-13L12 5.5z" /> },
    { name: 'Node.js', color: '#68A063', icon: <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.5v-3c0-.28-.22-.5-.5-.5h-3c-.28 0-.5.22-.5.5v3c0 .28.22.5.5.5h3c.28 0 .5-.22.5-.5zm6 0v-3c0-.28-.22-.5-.5-.5h-3c-.28 0-.5.22-.5.5v3c0 .28.22.5.5.5h3c.28 0 .5-.22.5-.5z" /> },
    { name: 'Bootstrap 5+', color: '#7952B3', icon: <><circle cx="12" cy="12" r="10" /><path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm-1 7.5h2v-7h-2v7z" /></> },
    { name: 'SASS/SCSS', color: '#CC6699', icon: <><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.5v-3c0-.28-.22-.5-.5-.5h-3c-.28 0-.5.22-.5.5v3c0 .28.22.5.5.5h3c.28 0 .5-.22.5-.5zm6 0v-3c0-.28-.22-.5-.5-.5h-3c-.28 0-.5.22-.5.5v3c0 .28.22.5.5.5h3c.28 0 .5-.22.5-.5z" /></> }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        backgroundColor: '#0d0d12',
        minHeight: '100vh',
        color: '#ffffff',
        padding: '1rem'
      }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          style={{
            backgroundColor: '#1a1a24',
            borderRadius: '0.5rem',
            padding: '2rem',
            marginBottom: '2rem',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
          }}
        >
          <Link 
            to="/" 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              color: '#a0a0a0',
              marginBottom: '1.5rem',
              width: 'fit-content',
              textDecoration: 'none'
            }}
          >
            <FaArrowLeft />
            <span style={{ marginLeft: '0.5rem' }}>Voltar</span>
          </Link>

          <h1 style={{ color: '#4e5bff', fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
            Sobre o Projeto
          </h1>
          
          <div style={{ textAlign: 'left' }}>
            <section style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ color: '#4e5bff', fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem' }}>
                Objetivo
              </h2>
              <p style={{ color: '#a0a0a0' }}>
                Este projeto foi desenvolvido como parte da trilha de conhecimentos em Desenvolvimento de Software da ZettaLab 2025, na qual pertence à Universidade Federal de Lavras,
                com o objetivo de consolidar aprendizados em desenvolvimento frontend moderno e a integração com APIs.
              </p>
            </section>

            <section style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ color: '#4e5bff', fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem' }}>
                Tecnologias Utilizadas
              </h2>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                gap: '1rem'
              }}>
                {technologies.map((tech, index) => (
                  <motion.div 
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0.75rem',
                      borderRadius: '0.375rem',
                      backgroundColor: '#2a2a34'
                    }}
                  >
                    <div style={{ marginRight: '0.75rem' }}>
                      <TechIcon color={tech.color}>{tech.icon}</TechIcon>
                    </div>
                    <span style={{ color: '#a0a0a0' }}>{tech.name}</span>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
