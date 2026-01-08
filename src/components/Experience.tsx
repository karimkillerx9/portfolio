import { Briefcase, TrendingUp, Users, PenTool } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Define interface for the experience data structure from i18n
interface ExperienceItem {
  year: string;
  role: string;
  company: string;
  achievements: string[];
}

export default function Experience() {
  const { t } = useTranslation();

  const experienceItems = t('experience.items', { returnObjects: true }) as ExperienceItem[];

  const icons = [PenTool, TrendingUp, Users];

  return (
    <section id="experience" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold mb-16 text-center">
          <span className="text-[#A855F7] glow-text">{t('experience.title')}</span>
        </h2>

        <div className="space-y-12 relative">
          {experienceItems.map((exp, index) => {
            const Icon = icons[index] || Briefcase;
            return (
              <div key={index} className="relative">
                <div className="card-cosmic p-8 md:p-10 rounded-2xl hover:scale-[1.02] transition-transform">
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <div className="flex items-center gap-4 md:w-1/3">
                      <div className="p-3 bg-[#A855F7]/20 border border-[#A855F7]/40 rounded-lg flex-shrink-0">
                        <Icon className="w-8 h-8 text-[#A855F7]" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-semibold">{exp.year}</p>
                        <h3 className="text-2xl font-bold text-white">{exp.role}</h3>
                        <p className="text-[#A855F7]">{exp.company}</p>
                      </div>
                    </div>

                    <div className="md:w-2/3">
                      <ul className="space-y-3">
                        {exp.achievements.map((achievement, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 text-gray-300"
                          >
                            <Briefcase className="w-5 h-5 text-[#A855F7] mt-1 flex-shrink-0" />
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="absolute right-8 top-8 md:relative md:right-0 md:top-0 w-12 h-12 md:w-auto md:h-auto flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#A855F7]/20 to-[#A855F7]/5 border border-[#A855F7]/40 flex items-center justify-center">
                        <span className="text-sm font-semibold text-[#A855F7]">{index + 1}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
