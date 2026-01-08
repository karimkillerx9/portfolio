import { Palette, Layers, Briefcase, Languages, PenTool } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface SkillCategory {
  title: string;
  skills: string[];
  logos?: { name: string; url: string }[];
}

export default function Skills() {
  const { t } = useTranslation();
  const skillCategories = t('skills.categories', { returnObjects: true }) as SkillCategory[];

  const icons = [Palette, Layers, PenTool, Briefcase, Languages];

  return (
    <section id="skills" className="py-32 px-6 bg-black/30 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold mb-16 text-center">
          {t('skills.title')} <span className="text-[#A855F7] glow-text">{t('skills.subtitle')}</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => {
            const Icon = icons[index] || Palette;
            return (
              <div key={index} className="card-cosmic p-8 rounded-2xl hover:scale-105 transition-transform">
                <div className="flex items-center gap-3 mb-6">
                  <Icon className="w-8 h-8 text-[#A855F7]" />
                  <h3 className="text-2xl font-bold">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {category.logos ? (
                    category.logos.map((logo) => (
                      <div
                        key={logo.name}
                        className="group relative p-4 bg-[#A855F7]/10 border border-[#A855F7]/30 rounded-xl hover:bg-[#A855F7]/20 hover:border-[#A855F7]/50 transition-all hover:scale-110"
                        title={logo.name}
                      >
                        <img
                          src={logo.url}
                          alt={logo.name}
                          className="w-12 h-12 object-contain filter brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity"
                        />
                      </div>
                    ))
                  ) : (
                    category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-4 py-2 bg-[#A855F7]/10 border border-[#A855F7]/30 rounded-full text-gray-300 hover:bg-[#A855F7]/20 hover:border-[#A855F7]/50 transition-all"
                      >
                        {skill}
                      </span>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
