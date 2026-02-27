import { useEffect, useRef, useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Linkedin,
  Github,
  CheckCircle,
  Loader2,
  AlertCircle,
} from 'lucide-react';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    // Formatage du message (tu peux personnaliser le texte)
    const whatsappMessage = 
      `*Nouveau message depuis le portfolio !* 🌟\n\n` +
      `Nom: ${formData.name || 'Non renseigné'}\n` +
      `Email: ${formData.email || 'Non renseigné'}\n` +
      `Message:\n${formData.message || 'Aucun message'}\n\n` +
      `Envoyé le ${new Date().toLocaleString('fr-BJ')}`;

    // Numéro WhatsApp (international, sans espaces ni tirets)
    const phoneNumber = '2290141120115';

    // Lien wa.me officiel
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    try {
      // Ouvre le lien (mobile → WhatsApp app, desktop → web.whatsapp.com)
      window.open(whatsappUrl, '_blank');
      
      // Simule succès après ouverture
      setTimeout(() => {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setIsSubmitted(false), 6000);
      }, 800);
    } catch (err) {
      setSubmitError('Impossible d’ouvrir WhatsApp. Copie le message manuellement ou vérifie ton navigateur.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'ostiadedo456@gmail.com',
      href: 'mailto:ostiadedo456@gmail.com',
    },
    {
      icon: Phone,
      label: 'Téléphone',
      value: '+229 0141120115',
      href: 'tel:+2290141120115',
    },
    {
      icon: MapPin,
      label: 'Localisation',
      value: 'Bénin',
      href: '#',
    },
  ];

  const socialLinks = [
    { icon: Linkedin, href: 'https://www.linkedin.com/in/ostia-dedo/', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com/ostia456', label: 'GitHub' },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section-padding relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      }}
    >
      {/* Animated background (inchangé) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-10"
            style={{
              width: `${Math.random() * 200 + 50}px`,
              height: `${Math.random() * 200 + 50}px`,
              background: 'linear-gradient(135deg, #3898ec, #1e87dc)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${4 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto relative z-10">
        {/* Header (inchangé) */}
        <div className="text-center mb-16">
          <span
            className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4"
            style={{ background: 'rgba(56, 152, 236, 0.2)', color: '#3898ec' }}
          >
            Contact
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: '#ffffff', fontFamily: 'Montserrat, sans-serif' }}
          >
            Travaillons <span style={{ color: '#3898ec' }}>Ensemble</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#b0b0b0' }}>
            Vous avez un projet en tête ? N'hésitez pas à me contacter pour discuter de vos idées
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Infos contact (inchangé) */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <h3 className="text-2xl font-bold mb-8" style={{ color: '#ffffff', fontFamily: 'Montserrat, sans-serif' }}>
              Informations de Contact
            </h3>
            <div className="space-y-6 mb-12">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.href}
                  className="flex items-center gap-4 p-4 rounded-xl transition-all duration-300 group"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(56, 152, 236, 0.1)';
                    e.currentTarget.style.borderColor = 'rgba(56, 152, 236, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: 'linear-gradient(135deg, #3898ec, #1e87dc)',
                      color: 'white',
                    }}
                  >
                    <info.icon size={24} />
                  </div>
                  <div>
                    <p className="text-sm mb-1" style={{ color: '#999999' }}>
                      {info.label}
                    </p>
                    <p className="font-medium" style={{ color: '#ffffff' }}>
                      {info.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4" style={{ color: '#ffffff', fontFamily: 'Montserrat, sans-serif' }}>
                Réseaux Sociaux
              </h4>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: '#3898ec',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#3898ec';
                      e.currentTarget.style.color = 'white';
                      e.currentTarget.style.transform = 'translateY(-3px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                      e.currentTarget.style.color = '#3898ec';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                    aria-label={social.label}
                  >
                    <social.icon size={24} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Formulaire */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
            style={{ transitionDelay: '0.2s' }}
          >
            <div
              className="p-8 rounded-2xl"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <h3 className="text-2xl font-bold mb-6" style={{ color: '#ffffff', fontFamily: 'Montserrat, sans-serif' }}>
                Envoyez-moi un message
              </h3>

              {isSubmitted ? (
                <div className="p-6 rounded-xl text-center" style={{ background: 'rgba(46, 125, 50, 0.2)' }}>
                  <CheckCircle size={48} style={{ color: '#4caf50' }} className="mx-auto mb-4" />
                  <h4 className="text-xl font-bold mb-2" style={{ color: '#4caf50' }}>
                    Message prêt !
                  </h4>
                  <p style={{ color: '#b0b0b0' }}>
                    Ouvre WhatsApp et envoie-le-moi (il est déjà pré-rempli) 🚀
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2" style={{ color: '#b0b0b0' }}>
                      Nom
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        required
                        className="w-full px-4 py-3 rounded-xl transition-all duration-300 outline-none"
                        style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: `1px solid ${focusedField === 'name' ? '#3898ec' : 'rgba(255, 255, 255, 0.1)'}`,
                          color: '#ffffff',
                        }}
                        placeholder="Votre nom"
                      />
                      <div
                        className="absolute bottom-0 left-0 h-0.5 transition-all duration-300"
                        style={{
                          width: focusedField === 'name' ? '100%' : '0%',
                          background: 'linear-gradient(90deg, #3898ec, #1e87dc)',
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: '#b0b0b0' }}>
                      Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        required
                        className="w-full px-4 py-3 rounded-xl transition-all duration-300 outline-none"
                        style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: `1px solid ${focusedField === 'email' ? '#3898ec' : 'rgba(255, 255, 255, 0.1)'}`,
                          color: '#ffffff',
                        }}
                        placeholder="votre@email.com"
                      />
                      <div
                        className="absolute bottom-0 left-0 h-0.5 transition-all duration-300"
                        style={{
                          width: focusedField === 'email' ? '100%' : '0%',
                          background: 'linear-gradient(90deg, #3898ec, #1e87dc)',
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2" style={{ color: '#b0b0b0' }}>
                      Message
                    </label>
                    <div className="relative">
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        required
                        rows={5}
                        className="w-full px-4 py-3 rounded-xl transition-all duration-300 outline-none resize-none"
                        style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: `1px solid ${focusedField === 'message' ? '#3898ec' : 'rgba(255, 255, 255, 0.1)'}`,
                          color: '#ffffff',
                        }}
                        placeholder="Votre message..."
                      />
                      <div
                        className="absolute bottom-0 left-0 h-0.5 transition-all duration-300"
                        style={{
                          width: focusedField === 'message' ? '100%' : '0%',
                          background: 'linear-gradient(90deg, #3898ec, #1e87dc)',
                        }}
                      />
                    </div>
                  </div>

                  {submitError && (
                    <div className="p-4 rounded-xl bg-red-900/30 text-red-300 flex items-center gap-3">
                      <AlertCircle size={20} />
                      <p>{submitError}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-70"
                    style={{
                      background: 'linear-gradient(135deg, #3898ec, #1e87dc)',
                      color: 'white',
                    }}
                    onMouseEnter={(e) => {
                      if (!isSubmitting) {
                        e.currentTarget.style.transform = 'scale(1.02)';
                        e.currentTarget.style.boxShadow = '0 10px 30px rgba(56, 152, 236, 0.4)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        Préparation...
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        Envoyer sur WhatsApp
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;