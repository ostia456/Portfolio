import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Determine active section
      const sections = ['hero', 'about', 'projects', 'skills', 'awards', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Accueil', href: '#hero' },
    { label: 'Parcours', href: '#about' },
    { label: 'Projets', href: '#projects' },
    { label: 'Compétences', href: '#skills' },
    { label: 'Distinctions', href: '#awards' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'py-3'
            : 'py-5'
        }`}
        style={{
          background: isScrolled
            ? 'rgba(255, 255, 255, 0.95)'
            : 'transparent',
          backdropFilter: isScrolled ? 'blur(10px)' : 'none',
          boxShadow: isScrolled ? '0 4px 20px rgba(0, 0, 0, 0.1)' : 'none',
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, '#hero')}
              className="text-xl font-bold transition-colors duration-300"
              style={{
                color: isScrolled ? '#333333' : '#333333',
                fontFamily: 'Montserrat, sans-serif',
              }}
            >
              Ostia DEDO<span style={{ color: '#3898ec' }}>.</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-sm font-medium transition-all duration-300 relative"
                  style={{
                    color:
                      activeSection === link.href.replace('#', '')
                        ? '#3898ec'
                        : isScrolled
                        ? '#666666'
                        : '#666666',
                  }}
                  onMouseEnter={(e) => {
                    if (activeSection !== link.href.replace('#', '')) {
                      e.currentTarget.style.color = '#3898ec';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeSection !== link.href.replace('#', '')) {
                      e.currentTarget.style.color = isScrolled ? '#666666' : '#666666';
                    }
                  }}
                >
                  {link.label}
                  {activeSection === link.href.replace('#', '') && (
                    <span
                      className="absolute -bottom-1 left-0 w-full h-0.5 rounded-full"
                      style={{
                        background: 'linear-gradient(90deg, #3898ec, #1e87dc)',
                      }}
                    />
                  )}
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #3898ec, #1e87dc)',
                  color: 'white',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(56, 152, 236, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Me contacter
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300"
              style={{
                background: isScrolled ? 'rgba(56, 152, 236, 0.1)' : 'rgba(56, 152, 236, 0.1)',
                color: '#3898ec',
              }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0"
          style={{ background: 'rgba(0, 0, 0, 0.5)' }}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Panel */}
        <div
          className={`absolute top-0 right-0 w-80 max-w-full h-full transition-all duration-500 ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{
            background: 'white',
            boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.1)',
          }}
        >
          <div className="p-6 pt-20">
            <div className="space-y-4">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="block py-3 px-4 rounded-xl text-lg font-medium transition-all duration-300"
                  style={{
                    color:
                      activeSection === link.href.replace('#', '')
                        ? '#3898ec'
                        : '#333333',
                    background:
                      activeSection === link.href.replace('#', '')
                        ? 'rgba(56, 152, 236, 0.1)'
                        : 'transparent',
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="mt-8">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="block w-full py-3 px-4 rounded-xl text-center font-semibold transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #3898ec, #1e87dc)',
                  color: 'white',
                }}
              >
                Me contacter
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
