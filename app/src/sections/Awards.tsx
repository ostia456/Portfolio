import { useEffect, useRef, useState } from 'react';
import { 
  Trophy, 
  Award, 
  Medal, 
  Star, 
  GraduationCap, 
  FileCheck,
  Users,
  BookOpen,
  Globe
} from 'lucide-react';

interface AwardItem {
  title: string;
  organization: string;
  date: string;
  description: string;
  icon: React.ElementType;
  color: string;
}

interface Certification {
  title: string;
  organization: string;
  date: string;
  icon: React.ElementType;
}

interface Engagement {
  role: string;
  organization: string;
  icon: React.ElementType;
}

const awards: AwardItem[] = [
  {
    title: 'Bourse de participation',
    organization: 'École d\'Été sur l\'Intelligence Artificielle (EEIA 2025)',
    date: '2025',
    description: 'Sélectionné pour participer à la prestigieuse école d\'été en IA',
    icon: GraduationCap,
    color: '#3898ec',
  },
  {
    title: '2ème Lauréat',
    organization: 'Challenge Programmation EEIA 2025',
    date: '2025',
    description: 'Deuxième place au concours de programmation parmi les participants',
    icon: Trophy,
    color: '#ffd700',
  },
  {
    title: 'Top 10',
    organization: 'École d\'Été sur l\'Intelligence Artificielle (EEIA 2025)',
    date: '2025',
    description: 'Classé parmi les 10 meilleurs participants de l\'EEIA 2025',
    icon: Star,
    color: '#ff6b35',
  },
  {
    title: 'Boursier du Gouvernement',
    organization: 'Gouvernement du Bénin',
    date: '2023 - Présent',
    description: 'Bourse d\'excellence pour les études supérieures',
    icon: Medal,
    color: '#2e7d32',
  },
];

const certifications: Certification[] = [
  {
    title: 'Certification en Intelligence Artificielle',
    organization: 'EEIA',
    date: '2025',
    icon: FileCheck,
  },
  {
    title: 'Certification en Python Avancé',
    organization: 'Labo IA CAEB',
    date: '2025',
    icon: FileCheck,
  },
  {
    title: 'Attestation en Data Science',
    organization: 'Data Hub Afrique',
    date: '2025',
    icon: Award,
  },
];

const engagements: Engagement[] = [
  {
    role: 'Membre actif',
    organization: 'Club IA du Laboratoire d\'Intelligence Artificielle du CAEB',
    icon: Users,
  },
  {
    role: 'Membre',
    organization: 'Club Mathématique de la Faculté',
    icon: BookOpen,
  },
  {
    role: 'Ambassadeur',
    organization: 'École d\'Été sur l\'Intelligence Artificielle',
    icon: Globe,
  },
];

const Awards = () => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
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
    <section id="awards" className="section-padding" style={{ background: '#ffffff' }}>
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span
            className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4"
            style={{ background: 'rgba(56, 152, 236, 0.1)', color: '#3898ec' }}
          >
            Reconnaissance
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: '#333333', fontFamily: 'Montserrat, sans-serif' }}
          >
            Distinctions & <span style={{ color: '#3898ec' }}>Certifications</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#666666' }}>
            Mes réalisations académiques et professionnelles
          </p>
        </div>

        {/* Awards Grid */}
        <div className="mb-16">
          <h3
            className="text-2xl font-bold mb-8 text-center"
            style={{ color: '#333333', fontFamily: 'Montserrat, sans-serif' }}
          >
            Bourses, Prix et Distinctions
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {awards.map((award, index) => (
              <div
                key={index}
                ref={(el) => { itemRefs.current[index] = el; }}
                className={`award-card transition-all duration-700 ${
                  visibleItems.has(index)
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 0.1}s` }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 ${
                    hoveredCard === index ? 'scale-110' : ''
                  }`}
                  style={{
                    background: `linear-gradient(135deg, ${award.color}20, ${award.color}40)`,
                    color: award.color,
                  }}
                >
                  <award.icon size={32} />
                </div>

                <span
                  className="text-xs font-medium mb-2 block"
                  style={{ color: '#999999' }}
                >
                  {award.date}
                </span>

                <h4
                  className="text-lg font-bold mb-2"
                  style={{ color: '#333333', fontFamily: 'Montserrat, sans-serif' }}
                >
                  {award.title}
                </h4>

                <p className="text-sm font-medium mb-3" style={{ color: '#3898ec' }}>
                  {award.organization}
                </p>

                <p className="text-sm" style={{ color: '#666666' }}>
                  {award.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="mb-16">
          <h3
            className="text-2xl font-bold mb-8 text-center"
            style={{ color: '#333333', fontFamily: 'Montserrat, sans-serif' }}
          >
            Certifications
          </h3>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {certifications.map((cert, index) => (
              <div
                key={index}
                ref={(el) => { itemRefs.current[awards.length + index] = el; }}
                className={`p-6 rounded-xl transition-all duration-700 hover-lift ${
                  visibleItems.has(awards.length + index)
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
                style={{
                  background: 'linear-gradient(135deg, rgba(56, 152, 236, 0.05), rgba(30, 135, 220, 0.05))',
                  border: '1px solid rgba(56, 152, 236, 0.1)',
                  transitionDelay: `${index * 0.1}s`,
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    background: 'linear-gradient(135deg, #3898ec, #1e87dc)',
                    color: 'white',
                  }}
                >
                  <cert.icon size={24} />
                </div>

                <h4
                  className="text-lg font-bold mb-2"
                  style={{ color: '#333333', fontFamily: 'Montserrat, sans-serif' }}
                >
                  {cert.title}
                </h4>

                <p className="text-sm mb-1" style={{ color: '#666666' }}>
                  {cert.organization}
                </p>

                <span className="text-xs" style={{ color: '#999999' }}>
                  {cert.date}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Engagements */}
        <div>
          <h3
            className="text-2xl font-bold mb-8 text-center"
            style={{ color: '#333333', fontFamily: 'Montserrat, sans-serif' }}
          >
            Engagement & Leadership
          </h3>

          <div className="flex flex-wrap justify-center gap-4">
            {engagements.map((engagement, index) => (
              <div
                key={index}
                ref={(el) => { itemRefs.current[awards.length + certifications.length + index] = el; }}
                className={`flex items-center gap-4 px-6 py-4 rounded-xl transition-all duration-700 ${
                  visibleItems.has(awards.length + certifications.length + index)
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
                style={{
                  background: 'white',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                  transitionDelay: `${index * 0.1}s`,
                }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{
                    background: 'rgba(56, 152, 236, 0.1)',
                    color: '#3898ec',
                  }}
                >
                  <engagement.icon size={20} />
                </div>
                <div>
                  <p className="font-medium" style={{ color: '#333333' }}>
                    {engagement.role}
                  </p>
                  <p className="text-sm" style={{ color: '#666666' }}>
                    {engagement.organization}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Awards;
