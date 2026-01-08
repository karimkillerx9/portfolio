import { useState, useEffect } from 'react';
import { Home, User, Briefcase, FolderOpen, Mail, Award, Menu, X, Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function FloatingNav() {
  const { t, i18n } = useTranslation();
  const [activeSection, setActiveSection] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'fr' : 'en');
  };

  const navItems = [
    { id: 'hero', icon: Home, label: 'nav.home' },
    { id: 'about', icon: User, label: 'nav.about' },
    { id: 'skills', icon: Award, label: 'nav.skills' },
    { id: 'experience', icon: Briefcase, label: 'nav.experience' },
    { id: 'projects', icon: FolderOpen, label: 'nav.projects' },
    { id: 'contact', icon: Mail, label: 'nav.contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
        <div className="flex flex-col gap-4 p-4 bg-black/30 backdrop-blur-xl rounded-full border border-[#A855F7]/20">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`group relative p-3 rounded-full transition-all ${isActive
                  ? 'bg-[#A855F7] text-white scale-110'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-[#A855F7] hover:scale-110'
                  }`}
                aria-label={item.label}
              >
                <Icon className="w-5 h-5" />

                <span className="absolute right-full mr-4 px-3 py-1.5 bg-black/90 backdrop-blur-sm text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-[#A855F7]/20">
                  {t(item.label)}
                </span>
              </button>
            );
          })}

          {/* Desktop Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="group relative p-3 rounded-full transition-all bg-white/5 text-gray-400 hover:bg-white/10 hover:text-[#A855F7] hover:scale-110 mt-2 border-t border-white/10"
            aria-label="Toggle Language"
          >
            <Languages className="w-5 h-5" />
            <span className="absolute right-full mr-4 px-3 py-1.5 bg-black/90 backdrop-blur-sm text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-[#A855F7]/20">
              {i18n.language.toUpperCase()}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="fixed top-6 right-6 z-50 lg:hidden p-3 bg-black/30 backdrop-blur-xl rounded-full border border-[#A855F7]/20 text-white flex items-center gap-2"
        aria-label="Toggle menu"
      >
        <span className="text-sm font-bold ml-1">{i18n.language.toUpperCase()}</span>
        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute top-24 right-6 left-6 bg-black/90 backdrop-blur-xl rounded-2xl border border-[#A855F7]/20 p-6">
            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  toggleLanguage();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-4 p-4 rounded-xl transition-all bg-white/5 text-gray-300 hover:bg-white/10 hover:text-[#A855F7]"
              >
                <Languages className="w-5 h-5" />
                <span className="font-semibold">
                  Switch to {i18n.language === 'en' ? 'Français' : 'English'}
                </span>
              </button>
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-center gap-4 p-4 rounded-xl transition-all ${isActive
                      ? 'bg-[#A855F7] text-white'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-[#A855F7]'
                      }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-semibold">{t(item.label)}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-black/90 backdrop-blur-xl border-t border-[#A855F7]/20">
        <div className="flex justify-around items-center px-4 py-3">
          {navItems.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all min-w-[44px] ${isActive
                  ? 'text-[#A855F7]'
                  : 'text-gray-400'
                  }`}
                aria-label={item.label}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'scale-110' : ''}`} />
                <span className="text-xs">{t(item.label)}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
