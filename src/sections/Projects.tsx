import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github, Cpu, Car, TrendingUp } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  results: string;
  icon: React.ElementType;
  githubUrl?: string;
  demoUrl?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Prédiction d\'Éligibilité aux Prêts',
    description:
      'Développement d\'un modèle de machine learning capable de prédire si un client est éligible à un prêt bancaire. Le projet a impliqué le prétraitement d\'une base de données massive de 17 millions de lignes.',
    image: '/images/project-loan.jpg',
    technologies: ['Python', 'Pandas', 'Scikit-learn', 'XGBoost', 'Data Preprocessing'],
    results: 'Score de précision: 0.99',
    icon: TrendingUp,
    githubUrl: 'https://github.com/ostia456',
    demoUrl: '#',
  },
  {
    id: 2,
    title: 'Bras Robotique Intelligent - Jeu de Morpion',
    description:
      'Système combinant vision par ordinateur et apprentissage renforcé. Le bras robotique utilise le Q-Learning et l\'équation de Bellman pour apprendre à jouer au morpion en temps réel contre un humain.',
    image: '/images/project-robot.jpg',
    technologies: ['Python', 'OpenCV', 'YOLO', 'TensorFlow', 'Roboflow', 'Q-Learning'],
    results: 'Jeu en temps réel, aucun coup préprogrammé',
    icon: Cpu,
    githubUrl: 'https://github.com/ostia456',
    demoUrl: '#',
  },
  {
    id: 3,
    title: 'Voiture Autonome avec Évitement d\'Obstacles',
    description:
      'Conception et développement d\'une voiture autonome utilisant des capteurs IoT et MicroPython. Le système détecte et évite les obstacles en temps réel grâce à des algorithmes de traitement de données.',
    image: '/images/project-car.jpg',
    technologies: ['MicroPython', 'IoT', 'Capteurs', 'Machine Learning', 'Embedded Systems'],
    results: 'Navigation autonome réussie avec évitement d\'obstacles',
    icon: Car,
    githubUrl: 'https://github.com/ostia456',
    demoUrl: '#',
  },
];

const Projects = () => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    itemRefs.current.forEach((ref, index) => {
      if (ref) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setVisibleItems((prev) => new Set([...prev, index]));
              observer.unobserve(entry.target);
            }
          },
          { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
        );
        observer.observe(ref);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <section id="projects" className="section-padding" style={{ background: '#ffffff' }}>
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span
            className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4"
            style={{ background: 'rgba(56, 152, 236, 0.1)', color: '#3898ec' }}
          >
            Portfolio
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: '#333333', fontFamily: 'Montserrat, sans-serif' }}
          >
            Mes <span style={{ color: '#3898ec' }}>Projets</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#666666' }}>
            Découvrez mes réalisations en Data Science, Intelligence Artificielle et IoT
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => { itemRefs.current[index] = el; }}
              className={`project-card group transition-all duration-700 ${
                visibleItems.has(index)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Image Container */}
              <div className="relative overflow-hidden h-56">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay on hover */}
                <div
                  className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                    hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{
                    background: 'linear-gradient(135deg, rgba(56, 152, 236, 0.9), rgba(30, 135, 220, 0.9))',
                  }}
                >
                  <div className="flex gap-4">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full bg-white flex items-center justify-center transition-transform duration-300 hover:scale-110"
                        style={{ color: '#3898ec' }}
                        aria-label="Voir sur GitHub"
                      >
                        <Github size={24} />
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full bg-white flex items-center justify-center transition-transform duration-300 hover:scale-110"
                        style={{ color: '#3898ec' }}
                        aria-label="Voir la démo"
                      >
                        <ExternalLink size={24} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Icon badge */}
                <div
                  className="absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #3898ec, #1e87dc)',
                    color: 'white',
                  }}
                >
                  <project.icon size={20} />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3
                  className="text-xl font-bold mb-3"
                  style={{ color: '#333333', fontFamily: 'Montserrat, sans-serif' }}
                >
                  {project.title}
                </h3>

                <p className="text-sm mb-4 line-clamp-3" style={{ color: '#666666' }}>
                  {project.description}
                </p>

                {/* Results badge */}
                <div
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg mb-4"
                  style={{ background: '#e8f5e9' }}
                >
                  <TrendingUp size={16} style={{ color: '#2e7d32' }} />
                  <span className="text-xs font-medium" style={{ color: '#1b5e20' }}>
                    {project.results}
                  </span>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full text-xs transition-all duration-300"
                      style={{
                        background: 'rgba(56, 152, 236, 0.1)',
                        color: '#3898ec',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold transition-all duration-300"
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
            <Github size={20} />
            Voir plus sur GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
