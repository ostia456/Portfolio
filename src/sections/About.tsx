import { useEffect, useRef, useState } from 'react';
import { Calendar, MapPin, Award, BookOpen } from 'lucide-react';

interface TimelineItem {
  id: number;
  title: string;
  organization: string;
  location: string;
  period: string;
  description: string[];
  skills: string[];
  results: string;
  side: 'left' | 'right';
}

const experiences: TimelineItem[] = [
  {
    id: 1,
    title: 'Data Scientist',
    organization: 'Data Afrique Hub',
    location: 'Bénin',
    period: 'Octobre 2025 – Novembre 2025',
    description: [
      'Prétraitement d\'une base de données de 17 millions de lignes',
      'Conception d\'un modèle pouvant prédire si un client est éligible à un prêt',
    ],
    skills: ['Data Science', 'Analyse statistique', 'Optimisation', 'Machine Learning'],
    results: 'Modèle prédictif avec un score de 0.99',
    side: 'left',
  },
  {
    id: 2,
    title: 'Projet IA - Bras Robotique',
    organization: 'École d\'Été sur l\'Intelligence Artificielle (EEIA)',
    location: 'Bénin Excellence',
    period: 'Juin 2025 – Juillet 2025',
    description: [
      'Développement d\'un système combinant la vision par ordinateur et l\'apprentissage renforcé',
      'Conception d\'un modèle basé sur le Q-Learning et l\'équation de Bellman',
      'Illustration du triptyque IA : percevoir, réfléchir et agir dans un environnement réel',
    ],
    skills: ['Python', 'OpenCV', 'YOLO', 'TensorFlow', 'Roboflow', 'Q-Learning'],
    results: 'Bras robotique jouant en temps réel contre un humain, aucun coup préprogrammé',
    side: 'right',
  },
  {
    id: 3,
    title: 'Développeur IA & IoT',
    organization: 'Laboratoire d\'Intelligence Artificielle du CAEB',
    location: 'Natitingou',
    period: 'Septembre 2024 – Juin 2025',
    description: [
      'Utilisation de microcontrôleurs et programmation MicroPython',
      'Intégration de capteurs et traitements de données en temps réel',
      'Programmation Python avancée & Machine learning & Web Scraping ',
    ],
    skills: ['MicroPython', 'IoT', 'Capteurs', 'POO', 'RegEx', 'Data Science','outils de scraping'],
    results: 'Conception d\'une voiture autonome avec évitement d\'obstacle, système de gestion de bibliothèque , collecte de données',
    side: 'left',
  },
];

interface EducationDetail {
  year: string;
  grade?: string;
  rank?: string;
  mention?: string;
  status?: string;
}

interface EducationItem {
  degree: string;
  school: string;
  location: string;
  period: string;
  details: EducationDetail[];
  courses: string[];
}

const education: EducationItem[] = [
  {
    degree: 'Licence Mathématiques-Informatique',
    school: 'Université Nationale des Sciences Technologies Ingénierie Mathématiques (UNSTIM)',
    location: 'Bénin',
    period: '2023 - 2026',
    details: [
      { year: 'L3 (2025-2026)', status: 'En cours' },
      { year: 'L2 (2024-2025)', grade: '14.09/20', rank: '2ème/150', mention: 'Bien' },
      { year: 'L1 (2023-2024)', grade: '14.12/20', rank: '6ème/181', mention: 'Bien' },
    ],
    courses: [
      'Algèbre linéaire (17)',
      'Méthode statistique d\'analyse de données (14)',
      'Algèbre Multilinéaire (17)',
      'Analyse complexe et vectorielle (15)',
      'Équation différentielle & système dynamique (15)',
      'Probabilité & Statistiques (15)',
      'Algorithme & C (14)',
      'Méthodes & Schémas numériques',
      'Structures algébriques',
      'Architecture et Technologie des Ordinateurs',
      'Convergence et Équations Différentielles',
      'Structures de données avancées',
      'Algorithmes de tri et complexité',
      'Topologie',
      'Mesure et intégration',
      'Théorie des graphes',
      'Algèbre Commutative',
      'Géométrie des Courbes et Surfaces',
      'Équations aux dérivées partielles',
      'Probabilité au sens de mesure & Statistique mathématique',
    ],
  },
  {
    degree: 'Baccalauréat Scientifique (Série C)',
    school: 'CEG2-Bohicon',
    location: 'Bénin',
    period: '2023',
    details: [{ year: 'Bac', grade: '14.86/20', mention: 'Bien' }],
    courses: [],
  },
];

const About = () => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
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
    <section id="about" className="section-padding" style={{ background: '#f3f3f3' }}>
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span
            className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4"
            style={{ background: 'rgba(56, 152, 236, 0.1)', color: '#3898ec' }}
          >
            Mon Parcours
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: '#333333', fontFamily: 'Montserrat, sans-serif' }}
          >
            Formation &{' '}
            <span style={{ color: '#3898ec' }}>Expériences</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#666666' }}>
            Un parcours académique solide et des expériences pratiques en Data Science et Intelligence Artificielle
          </p>
        </div>

        {/* Education Section */}
        <div className="mb-20">
          <h3
            className="text-2xl font-bold mb-8 flex items-center gap-3"
            style={{ color: '#333333' }}
          >
            <BookOpen size={28} style={{ color: '#3898ec' }} />
            Formation
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            {education.map((edu, index) => (
              <div
                key={index}
                ref={(el) => { itemRefs.current[index] = el; }}
                className={`p-6 rounded-xl transition-all duration-700 ${
                  visibleItems.has(index)
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
                style={{
                  background: 'white',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-xl font-bold mb-1" style={{ color: '#333333' }}>
                      {edu.degree}
                    </h4>
                    <p className="text-sm" style={{ color: '#666666' }}>
                      {edu.school}
                    </p>
                  </div>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{ background: 'rgba(56, 152, 236, 0.1)', color: '#3898ec' }}
                  >
                    {edu.period}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-4 text-sm" style={{ color: '#999999' }}>
                  <MapPin size={16} />
                  {edu.location}
                </div>

                {edu.details.length > 0 && (
                  <div className="mb-4">
                    {edu.details.map((detail, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-4 py-2 border-b last:border-0"
                        style={{ borderColor: '#f3f3f3' }}
                      >
                        <span className="font-medium" style={{ color: '#333333' }}>
                          {detail.year}
                        </span>
                        {detail.grade && (
                          <span className="text-sm" style={{ color: '#3898ec' }}>
                            Moyenne: {detail.grade}
                          </span>
                        )}
                        {detail.rank && (
                          <span className="text-sm" style={{ color: '#666666' }}>
                            Rang: {detail.rank}
                          </span>
                        )}
                        {detail.mention && (
                          <span
                            className="px-2 py-1 rounded text-xs"
                            style={{ background: '#e8f5e9', color: '#2e7d32' }}
                          >
                            {detail.mention}
                          </span>
                        )}
                        {detail.status && (
                          <span
                            className="px-2 py-1 rounded text-xs"
                            style={{ background: '#fff3e0', color: '#e65100' }}
                          >
                            {detail.status}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {edu.courses.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-2" style={{ color: '#666666' }}>
                      Cours principaux:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {edu.courses.map((course, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-full text-xs"
                          style={{
                            background: 'rgba(56, 152, 236, 0.1)',
                            color: '#3898ec',
                          }}
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Experience Timeline */}
        <div>
          <h3
            className="text-2xl font-bold mb-8 flex items-center gap-3"
            style={{ color: '#333333' }}
          >
            <Calendar size={28} style={{ color: '#3898ec' }} />
            Expériences Professionnelles
          </h3>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block timeline-line" />

            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <div
                  key={exp.id}
                  ref={(el) => { itemRefs.current[index + education.length] = el; }}
                  className={`relative flex flex-col md:flex-row items-center ${
                    exp.side === 'right' ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline dot */}
                  <div
                    className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full z-10 items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, #3898ec, #1e87dc)',
                      boxShadow: '0 0 20px rgba(56, 152, 236, 0.5)',
                    }}
                  >
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>

                  {/* Content card */}
                  <div
                    className={`w-full md:w-5/12 transition-all duration-700 ${
                      visibleItems.has(index + education.length)
                        ? 'opacity-100 translate-x-0'
                        : `opacity-0 ${exp.side === 'left' ? '-translate-x-10' : 'translate-x-10'}`
                    }`}
                  >
                    <div
                      className="p-6 rounded-xl hover-lift"
                      style={{
                        background: 'white',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                      }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-lg font-bold mb-1" style={{ color: '#333333' }}>
                            {exp.title}
                          </h4>
                          <p className="text-sm font-medium" style={{ color: '#3898ec' }}>
                            {exp.organization}
                          </p>
                        </div>
                        <span
                          className="px-3 py-1 rounded-full text-xs font-medium"
                          style={{ background: 'rgba(56, 152, 236, 0.1)', color: '#3898ec' }}
                        >
                          {exp.period}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mb-4 text-sm" style={{ color: '#999999' }}>
                        <MapPin size={16} />
                        {exp.location}
                      </div>

                      <ul className="space-y-2 mb-4">
                        {exp.description.map((desc, idx) => (
                          <li
                            key={idx}
                            className="text-sm flex items-start gap-2"
                            style={{ color: '#666666' }}
                          >
                            <span style={{ color: '#3898ec' }}>•</span>
                            {desc}
                          </li>
                        ))}
                      </ul>

                      <div
                        className="p-3 rounded-lg mb-4"
                        style={{ background: '#e8f5e9' }}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <Award size={16} style={{ color: '#2e7d32' }} />
                          <span className="text-sm font-medium" style={{ color: '#2e7d32' }}>
                            Résultats
                          </span>
                        </div>
                        <p className="text-sm" style={{ color: '#1b5e20' }}>
                          {exp.results}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 rounded-full text-xs"
                            style={{
                              background: 'rgba(56, 152, 236, 0.1)',
                              color: '#3898ec',
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Empty space for other side */}
                  <div className="hidden md:block w-5/12" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
