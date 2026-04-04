import { useEffect, useRef, useState } from 'react';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #ffffff 0%, #f3f3f3 50%, #e8f4fc 100%)',
      }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-20"
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              background: 'linear-gradient(135deg, #3898ec, #1e87dc)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Neural network lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3898ec" />
            <stop offset="100%" stopColor="#1e87dc" />
          </linearGradient>
        </defs>
        {[...Array(8)].map((_, i) => (
          <line
            key={i}
            x1={`${Math.random() * 100}%`}
            y1={`${Math.random() * 100}%`}
            x2={`${Math.random() * 100}%`}
            y2={`${Math.random() * 100}%`}
            stroke="url(#lineGradient)"
            strokeWidth="1"
            strokeDasharray="5,5"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="20"
              dur={`${2 + Math.random() * 3}s`}
              repeatCount="indefinite"
            />
          </line>
        ))}
      </svg>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <div
              className={`transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '0.2s' }}
            >
              <span className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-6"
                style={{
                  background: 'rgba(56, 152, 236, 0.1)',
                  color: '#3898ec',
                }}
              >
                Data Scientist Junior
              </span>
            </div>

            <h1
              className={`text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{
                transitionDelay: '0.4s',
                color: '#333333',
                fontFamily: 'Montserrat, sans-serif',
              }}
            >
              DEDO{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #3898ec, #1e87dc)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Exaucé
              </span>{' '}
              Ostia
            </h1>

            <p
              className={`text-lg sm:text-xl mb-4 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
              style={{
                transitionDelay: '0.6s',
                color: '#666666',
              }}
            >
              Étudiant en Licence Mathématiques-Informatique | Passionné d'Intelligence Artificielle
            </p>

            <p
              className={`text-base mb-8 max-w-xl mx-auto lg:mx-0 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{
                transitionDelay: '0.8s',
                color: '#999999',
              }}
            >
              Je transforme les données complexes en solutions intelligentes. Expert en Python, 
              Machine Learning et IoT, je mets mon expertise technique au service de projets innovants.
              Passionné par l'intelligence artificielle appliquée à l'imagerie médicale, développeur Python & MicroPython, chercheur en devenir.
            </p>

            <div
              className={`flex flex-wrap gap-4 justify-center lg:justify-start mb-8 transition-all duration-1000 ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
              }`}
              style={{ transitionDelay: '1s' }}
            >
              <button
                onClick={scrollToAbout}
                className="btn-primary flex items-center gap-2"
              >
                Découvrir mon parcours
                <ArrowDown size={18} />
              </button>
              <a
                href="#contact"
                className="px-8 py-3 rounded-full font-semibold transition-all duration-300 border-2"
                style={{
                  borderColor: '#3898ec',
                  color: '#3898ec',
                }}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#3898ec';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#3898ec';
                }}
              >
                Me contacter
              </a>
            </div>

            {/* Social Links */}
            <div
              className={`flex gap-4 justify-center lg:justify-start transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '1.2s' }}
            >
              {[
                { icon: Github, href: 'https://github.com/ostia456', label: 'GitHub' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/ostia-dedo/', label: 'LinkedIn' },
                { icon: Mail, href: 'mailto:ostiadedo456@gmail.com', label: 'Email' },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{
                    background: 'rgba(56, 152, 236, 0.1)',
                    color: '#3898ec',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#3898ec';
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(56, 152, 236, 0.1)';
                    e.currentTarget.style.color = '#3898ec';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Profile Image */}
          <div
            className={`flex-1 flex justify-center transition-all duration-1000 ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            }`}
            style={{ transitionDelay: '0.5s' }}
          >
            <div className="relative">
              {/* Animated rings */}
              <div
                className="absolute inset-0 rounded-full animate-pulse-glow"
                style={{
                  background: 'linear-gradient(135deg, #3898ec, #1e87dc)',
                  transform: 'scale(1.1)',
                  opacity: 0.3,
                }}
              />
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'linear-gradient(135deg, #3898ec, #1e87dc)',
                  transform: 'scale(1.2)',
                  opacity: 0.1,
                  animation: 'pulse-glow 3s ease-in-out infinite',
                  animationDelay: '0.5s',
                }}
              />
              
              {/* Profile image container */}
              <div
                className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden"
                style={{
                  boxShadow: '0 25px 50px rgba(56, 152, 236, 0.3)',
                }}
              >
                <img
                  src="/images/profile.jpg"
                  alt="DEDO Exaucé Ostia"
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay gradient */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(180deg, transparent 60%, rgba(56, 152, 236, 0.2) 100%)',
                  }}
                />
              </div>

              {/* Floating badges */}
              <div
                className="absolute -top-4 -right-4 px-4 py-2 rounded-full text-sm font-semibold animate-float"
                style={{
                  background: 'linear-gradient(135deg, #3898ec, #1e87dc)',
                  color: 'white',
                  boxShadow: '0 10px 30px rgba(56, 152, 236, 0.4)',
                }}
              >
                Python
              </div>
              <div
                className="absolute -bottom-2 -left-4 px-4 py-2 rounded-full text-sm font-semibold animate-float"
                style={{
                  background: 'white',
                  color: '#3898ec',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                  animationDelay: '1s',
                }}
              >
                IA & ML
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        onClick={scrollToAbout}
      >
        <div
          className="w-6 h-10 rounded-full border-2 flex justify-center pt-2"
          style={{ borderColor: '#3898ec' }}
        >
          <div
            className="w-1.5 h-3 rounded-full animate-bounce"
            style={{ background: '#3898ec' }}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
