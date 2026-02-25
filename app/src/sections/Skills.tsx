import { useEffect, useRef, useState } from 'react';
import { 
  Code2, 
  Database, 
  Brain, 
  BarChart3, 
  Calculator,
  Microchip,
  Eye,
  Terminal
} from 'lucide-react';

interface SkillCategory {
  title: string;
  icon: React.ElementType;
  skills: { name: string; level: number }[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Mathématiques & Modélisation',
    icon: Calculator,
    skills: [
      { name: 'Analyse numérique', level: 90 },
      { name: 'Algèbre linéaire', level: 95 },
      { name: 'Probabilités & Statistiques', level: 90 },
      { name: 'Méthodes numériques', level: 85 },
      { name: 'Équations différentielles', level: 80 },
    ],
  },
  {
    title: 'Programmation',
    icon: Code2,
    skills: [
      { name: 'Python', level: 95 },
      { name: 'C/C++', level: 75 },
      { name: 'R', level: 70 },
      { name: 'MicroPython', level: 85 },
      { name: 'Algorithmique', level: 90 },
    ],
  },
  {
    title: 'Data Science & ML',
    icon: Brain,
    skills: [
      { name: 'Machine Learning', level: 90 },
      { name: 'Deep Learning', level: 85 },
      { name: 'TensorFlow', level: 80 },
      { name: 'Scikit-learn', level: 90 },
      { name: 'XGBoost', level: 85 },
      { name: 'Reinforcement Learning', level: 80 },
    ],
  },
  {
    title: 'Analyse de Données',
    icon: BarChart3,
    skills: [
      { name: 'Pandas', level: 95 },
      { name: 'NumPy', level: 90 },
      { name: 'Matplotlib', level: 85 },
      { name: 'Seaborn', level: 85 },
      { name: 'Modélisation prédictive', level: 90 },
    ],
  },
  {
    title: 'Vision par Ordinateur',
    icon: Eye,
    skills: [
      { name: 'OpenCV', level: 85 },
      { name: 'YOLO', level: 80 },
      { name: 'Roboflow', level: 75 },
      { name: 'Image Processing', level: 80 },
    ],
  },
  {
    title: 'IoT & Embarqué',
    icon: Microchip,
    skills: [
      { name: 'Microcontrôleurs', level: 85 },
      { name: 'Capteurs IoT', level: 80 },
      { name: 'Traitement temps réel', level: 75 },
      { name: 'Systèmes embarqués', level: 80 },
    ],
  },
  {
    title: 'Bases de Données',
    icon: Database,
    skills: [
      { name: 'SQL', level: 80 },
      { name: 'Data Preprocessing', level: 95 },
      { name: 'Big Data', level: 75 },
    ],
  },
  {
    title: 'Outils & Environnements',
    icon: Terminal,
    skills: [
      { name: 'Git', level: 85 },
      { name: 'Jupyter Notebook', level: 95 },
      { name: 'Google Colab', level: 90 },
      { name: 'VS Code', level: 90 },
      { name: 'LaTeX', level: 80 },
    ],
  },
];

const softSkills = [
  'Rigueur',
  'Esprit critique',
  'Travail en équipe',
  'Résolution de problèmes',
  'Curiosité',
  'Autonomie',
  'Communication',
  'Adaptabilité',
];

const Skills = () => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const [animatedLevels, setAnimatedLevels] = useState<{ [key: string]: number }>({});
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

  // Animate skill bars when visible
  useEffect(() => {
    skillCategories.forEach((category, catIndex) => {
      if (visibleItems.has(catIndex)) {
        category.skills.forEach((skill) => {
          setTimeout(() => {
            setAnimatedLevels((prev) => ({
              ...prev,
              [`${catIndex}-${skill.name}`]: skill.level,
            }));
          }, 200 + catIndex * 100);
        });
      }
    });
  }, [visibleItems]);

  return (
    <section id="skills" className="section-padding" style={{ background: '#f3f3f3' }}>
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span
            className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4"
            style={{ background: 'rgba(56, 152, 236, 0.1)', color: '#3898ec' }}
          >
            Expertise
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: '#333333', fontFamily: 'Montserrat, sans-serif' }}
          >
            Mes <span style={{ color: '#3898ec' }}>Compétences</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#666666' }}>
            Un ensemble de compétences techniques et personnelles acquises à travers mes études et expériences
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {skillCategories.map((category, index) => (
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
                transitionDelay: `${index * 0.1}s`,
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #3898ec, #1e87dc)',
                    color: 'white',
                  }}
                >
                  <category.icon size={24} />
                </div>
                <h3
                  className="text-lg font-bold"
                  style={{ color: '#333333', fontFamily: 'Montserrat, sans-serif' }}
                >
                  {category.title}
                </h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium" style={{ color: '#666666' }}>
                        {skill.name}
                      </span>
                      <span className="text-sm" style={{ color: '#3898ec' }}>
                        {animatedLevels[`${index}-${skill.name}`] || 0}%
                      </span>
                    </div>
                    <div
                      className="h-2 rounded-full overflow-hidden"
                      style={{ background: '#f3f3f3' }}
                    >
                      <div
                        className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: `${animatedLevels[`${index}-${skill.name}`] || 0}%`,
                          background: 'linear-gradient(90deg, #3898ec, #1e87dc)',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Soft Skills */}
        <div
          ref={(el) => { itemRefs.current[skillCategories.length] = el; }}
          className={`text-center transition-all duration-700 ${
            visibleItems.has(skillCategories.length)
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
          }`}
        >
          <h3
            className="text-2xl font-bold mb-8"
            style={{ color: '#333333', fontFamily: 'Montserrat, sans-serif' }}
          >
            Soft Skills
          </h3>

          <div className="flex flex-wrap justify-center gap-4">
            {softSkills.map((skill, index) => (
              <div
                key={index}
                className="skill-tag px-6 py-3 text-base font-medium"
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                {skill}
              </div>
            ))}
          </div>
        </div>

        {/* Tools Section */}
        <div
          ref={(el) => { itemRefs.current[skillCategories.length + 1] = el; }}
          className={`mt-16 text-center transition-all duration-700 ${
            visibleItems.has(skillCategories.length + 1)
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
          }`}
        >
          <h3
            className="text-2xl font-bold mb-8"
            style={{ color: '#333333', fontFamily: 'Montserrat, sans-serif' }}
          >
            Outils & Technologies
          </h3>

          <div className="flex flex-wrap justify-center gap-6">
            {[
              { name: 'Python', color: '#3776ab' },
              { name: 'TensorFlow', color: '#ff6f00' },
              { name: 'PyTorch', color: '#ee4c2c' },
              { name: 'Scikit-learn', color: '#f7931e' },
              { name: 'Pandas', color: '#150458' },
              { name: 'NumPy', color: '#013243' },
              { name: 'OpenCV', color: '#5c3ee8' },
              { name: 'Git', color: '#f05032' },
              { name: 'Jupyter', color: '#f37626' },
              { name: 'VS Code', color: '#007acc' },
              { name: 'Linux', color: '#fcc624' },
              { name: 'LaTeX', color: '#008080' },
            ].map((tool, index) => (
              <div
                key={index}
                className="px-6 py-3 rounded-full text-white font-medium transition-all duration-300 hover:scale-110"
                style={{
                  background: tool.color,
                  boxShadow: `0 4px 15px ${tool.color}40`,
                }}
              >
                {tool.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
