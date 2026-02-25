import { Heart, Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const navLinks = [
    { label: 'Accueil', href: '#hero' },
    { label: 'Parcours', href: '#about' },
    { label: 'Projets', href: '#projects' },
    { label: 'Compétences', href: '#skills' },
    { label: 'Distinctions', href: '#awards' },
    { label: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/ostia456', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/ostia-dedo/', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:ostiadedo456@gmail.com', label: 'Email' },
  ];

  return (
    <footer
      className="py-12 px-4 sm:px-6 lg:px-8 xl:px-12"
      style={{ background: '#0a0a0a' }}
    >
      <div className="container mx-auto">
        {/* Top section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          {/* Logo/Name */}
          <div className="text-center md:text-left">
            <h3
              className="text-2xl font-bold mb-2"
              style={{ color: '#ffffff', fontFamily: 'Montserrat, sans-serif' }}
            >
              DEDO{' '}
              <span style={{ color: '#3898ec' }}>Ostia</span>
            </h3>
            <p className="text-sm" style={{ color: '#666666' }}>
              Data Scientist Junior | Passionné d'IA
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-6">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-sm transition-colors duration-300"
                style={{ color: '#999999' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#3898ec';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#999999';
                }}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex gap-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: '#999999',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#3898ec';
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.color = '#999999';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
                aria-label={social.label}
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div
          className="h-px w-full mb-8"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)' }}
        />

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-center md:text-left" style={{ color: '#666666' }}>
            © {currentYear} DEDO Ostia. Tous droits réservés.
          </p>

          <p
            className="text-sm flex items-center gap-1"
            style={{ color: '#666666' }}
          >
            Fait avec <Heart size={14} style={{ color: '#e74c3c' }} /> au Bénin
          </p>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #3898ec, #1e87dc)',
              color: 'white',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(56, 152, 236, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            aria-label="Retour en haut"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
