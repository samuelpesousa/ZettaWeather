import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SamuelPhoto from '../../assets/samuel-sousa.jpeg';

const ContactPage = () => {
  const technologies = [
    { name: "HTML5", color: "#E34F26", icon: "H" },
    { name: "CSS3", color: "#1572B6", icon: "C" },
    { name: "JavaScript", color: "#F7DF1E", icon: "JS" },
    { name: "React", color: "#61DAFB", icon: "R" },
    { name: "PHP", color: "#777BB4", icon: "P" },
    { name: "WordPress", color: "#21759B", icon: "W" },
    { name: "Web Design", color: "#FF4081", icon: "D" },
    { name: "TypeScript", color: "#3178C6", icon: "TS" },
    { name: "Bootstrap", color: "#7952B3", icon: "B" },
    { name: "SASS/SCSS", color: "#CC6699", icon: "S" }
  ];

  // Ícones SVG inline
  const ArrowLeftIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
  );

  const LinkedInIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="#0A66C2">
      <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3v9zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.5-2.35-1.76-2.35-1.37 0-1.84.92-1.84 2.32V19h-3v-9h2.9v1.24a3 3 0 012.7-1.5c2.5 0 3.2 1.65 3.2 3.8V19z"/>
    </svg>
  );

  const GithubIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  );

  const EmailIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="#D44638">
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
    </svg>
  );

  const WhatsAppIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="#25D366">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        backgroundColor: '#0d0d12',
        minHeight: '100vh',
        color: '#ffffff',
        padding: '2rem'
      }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          style={{
            backgroundColor: '#1a1a24',
            borderRadius: '0.5rem',
            padding: '2rem',
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
            <ArrowLeftIcon />
            <span style={{ marginLeft: '0.5rem' }}>Voltar</span>
          </Link>

          {/* Seção de Perfil */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginBottom: '2rem'
            }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              style={{
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                overflow: 'hidden',
                marginBottom: '1rem',
                border: '3px solid #4e5bff'
              }}
            >
              <img 
                src={SamuelPhoto} 
                alt="Samuel Sousa" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </motion.div>
            <h1 style={{ color: '#4e5bff', fontSize: '2rem', marginBottom: '0.5rem' }}>Samuel Sousa</h1>
            <p style={{ color: '#a0a0a0', marginBottom: '1rem' }}>Desenvolvedor Web / Engenharia de Software</p>
          </motion.div>

          {/* Seção de Contato */}
          <motion.section
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{ marginBottom: '2rem' }}
          >
            <h2 style={{ color: '#4e5bff', fontSize: '1.5rem', marginBottom: '1rem' }}>Contato</h2>
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem'
            }}>
              <motion.a
                whileHover={{ scale: 1.05 }}
                href="https://www.linkedin.com/in/samuel-de-paula-sousa/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '1rem',
                  backgroundColor: '#2a2a34',
                  borderRadius: '0.5rem',
                  textDecoration: 'none',
                  color: '#ffffff'
                }}
              >
                <LinkedInIcon />
                <span style={{ marginLeft: '0.5rem' }}>LinkedIn</span>
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.05 }}
                href="https://github.com/samuelpesousa"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '1rem',
                  backgroundColor: '#2a2a34',
                  borderRadius: '0.5rem',
                  textDecoration: 'none',
                  color: '#ffffff'
                }}
              >
                <GithubIcon />
                <span style={{ marginLeft: '0.5rem' }}>GitHub</span>
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.05 }}
                href="mailto:samuelpsousa@hotmail.com"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '1rem',
                  backgroundColor: '#2a2a34',
                  borderRadius: '0.5rem',
                  textDecoration: 'none',
                  color: '#ffffff'
                }}
              >
                <EmailIcon />
                <span style={{ marginLeft: '0.5rem' }}>Email</span>
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.05 }}
                href="https://wa.me/5535999490183"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '1rem',
                  backgroundColor: '#2a2a34',
                  borderRadius: '0.5rem',
                  textDecoration: 'none',
                  color: '#ffffff'
                }}
              >
                <WhatsAppIcon />
                <span style={{ marginLeft: '0.5rem' }}>WhatsApp</span>
              </motion.a>
            </div>
          </motion.section>

          {/* Seção de Tecnologias */}
          <motion.section
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <h2 style={{ color: '#4e5bff', fontSize: '1.5rem', marginBottom: '1rem' }}>Tecnologias que Domino</h2>
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
              gap: '1rem'
            }}>
              {technologies.map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  style={{
                    backgroundColor: '#2a2a34',
                    padding: '1rem',
                    borderRadius: '0.5rem',
                    textAlign: 'center',
                    borderLeft: `4px solid ${tech.color}`
                  }}
                >
                  <div style={{ 
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: tech.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 0.5rem auto',
                    color: '#ffffff',
                    fontWeight: 'bold'
                  }}>
                    {tech.icon}
                  </div>
                  <span style={{ color: '#ffffff' }}>{tech.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ContactPage;