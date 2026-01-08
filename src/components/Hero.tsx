import { Mail, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-16 sm:py-20 pb-28 sm:pb-32 lg:pb-20">
      <div className="max-w-6xl w-full">
        <div className="space-y-6 sm:space-y-8 flex flex-col items-center sm:items-start text-center sm:text-left">
          {/* Name and Title */}
          <div className="space-y-2 sm:space-y-4">
            <h1 className="font-bold tracking-tight leading-tight">
              <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl">
                {t('hero.name')}
              </span>
              <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl text-[#A855F7] glow-text mt-1 sm:mt-2">
                {t('hero.title1')}
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-400 font-light italic">
              {t('hero.title2')}
            </p>
          </div>

          {/* Description */}
          <div className="space-y-3 sm:space-y-4 max-w-2xl mx-auto sm:mx-0">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 leading-relaxed">
              {t('hero.desc1')}
            </p>

            <p className="text-sm sm:text-base md:text-lg text-gray-400">
              {t('hero.desc2')}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6">
            <a
              href="#contact"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-[#A855F7] text-white font-semibold rounded-lg hover:bg-[#9333EA] transition-all hover:shadow-lg hover:shadow-[#A855F7]/50 hover:scale-105 text-center text-sm sm:text-base"
            >
              {t('hero.ctaWork')}
            </a>
            <a
              href="#contact"
              className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-[#A855F7] text-[#A855F7] font-semibold rounded-lg hover:bg-[#A855F7]/10 transition-all hover:shadow-lg hover:shadow-[#A855F7]/30 hover:scale-105 text-center text-sm sm:text-base"
            >
              {t('hero.ctaContact')}
            </a>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 pt-4 sm:pt-6 text-gray-400">
            <a
              href="mailto:kchallouf@gmail.com"
              className="flex items-center gap-2 hover:text-[#A855F7] transition-colors group min-h-[44px] text-sm sm:text-base"
            >
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform flex-shrink-0" />
              <span className="break-all">kchallouf@gmail.com</span>
            </a>
            <a
              href="tel:+21621439907"
              className="flex items-center gap-2 hover:text-[#A855F7] transition-colors group min-h-[44px] text-sm sm:text-base"
            >
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform flex-shrink-0" />
              <span>+216 21 439 907</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
