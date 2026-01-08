import { GraduationCap } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function About() {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16">
          <div className="space-y-8">
            <h2 className="text-5xl md:text-6xl font-bold">
              {t('about.title')} <span className="text-[#A855F7] glow-text">{t('about.titleMe')}</span>
            </h2>

            <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
              <p>
                {t('about.p1')}
              </p>

              <p>
                {t('about.p2')}
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="card-cosmic p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-4 text-[#A855F7]">{t('about.profileSummaryTitle')}</h3>
              <p className="text-gray-300 leading-relaxed">
                {t('about.profileSummaryDesc')}
              </p>
            </div>

            <div className="card-cosmic p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <GraduationCap className="w-7 h-7 text-[#A855F7]" />
                {t('about.educationTitle')}
              </h3>
              <div className="space-y-6">
                <div>
                  <p className="font-semibold text-white">{t('about.essted')}</p>
                  <p className="text-gray-400">{t('about.esstedDegree')}</p>
                  <p className="text-sm text-gray-500">2023 – 2025</p>
                </div>
                <div>
                  <p className="font-semibold text-white">{t('about.highschool')}</p>
                  <p className="text-gray-400">{t('about.highschoolDegree')}</p>
                  <p className="text-sm text-gray-500">2018 – 2022</p>
                </div>
              </div>
            </div>

            <div className="card-cosmic p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-4 text-[#A855F7]">{t('about.designApproachTitle')}</h3>
              <p className="text-gray-300 leading-relaxed italic">
                {t('about.designApproachDesc')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
