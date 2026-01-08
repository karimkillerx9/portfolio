import { useState, useRef, useEffect } from 'react';
import { FileText, BookOpen, Zap, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ProjectItem {
  number: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  color: string;
  pdfPath: string;
  year: number;
}

export default function Projects() {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const projectItems = t('projects.items', { returnObjects: true }) as ProjectItem[];
  const icons = [BookOpen, Zap, Users, FileText];

  const projects = projectItems.map((item, index) => ({
    ...item,
    icon: icons[index] || FileText
  }));

  const handlePdfOpen = (pdfPath: string) => {
    window.open(pdfPath, '_blank');
  };

  const scroll = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      setCurrentIndex(Math.max(0, currentIndex - 1));
    } else {
      setCurrentIndex(Math.min(projects.length - 1, currentIndex + 1));
    }
  };

  // Handle touch events for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentIndex < projects.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  useEffect(() => {
    setCanScrollLeft(currentIndex > 0);
    setCanScrollRight(currentIndex < projects.length - 1);
  }, [currentIndex, projects.length]);

  return (
    <section id="projects" className="py-20 sm:py-32 px-4 sm:px-6 bg-black/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 text-center">
          {t('projects.title')} <span className="text-[#A855F7] glow-text">{t('projects.subtitle')}</span>
        </h2>
        <p className="text-center text-gray-400 mb-12 sm:mb-16 text-base sm:text-lg px-4">
          {t('projects.desc')}
        </p>

        <div className="relative">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`flex-shrink-0 p-3 rounded-lg transition-all ${canScrollLeft
                ? 'bg-[#A855F7]/20 hover:bg-[#A855F7]/30 text-[#A855F7] cursor-pointer'
                : 'bg-gray-700/20 text-gray-500 cursor-not-allowed opacity-50'
                }`}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="flex-1 overflow-hidden">
              <div
                ref={scrollContainerRef}
                className="flex transition-all duration-500 ease-out"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                }}
              >
                {projects.map((proj) => {
                  const ProjIcon = proj.icon;
                  return (
                    <div
                      key={proj.number}
                      className="w-full flex-shrink-0 px-4"
                    >
                      <div
                        className="card-cosmic p-8 sm:p-12 rounded-2xl h-full flex flex-col"
                        style={{
                          borderColor: `${proj.color}40`,
                        }}
                      >
                        <div className="flex items-start justify-between mb-6 sm:mb-8">
                          <div>
                            <span
                              className="text-xs sm:text-sm font-semibold uppercase tracking-widest opacity-60"
                              style={{ color: proj.color }}
                            >
                              {proj.category}
                            </span>
                            <div className="mt-3 sm:mt-4">
                              <span
                                className="text-5xl sm:text-7xl font-bold opacity-20"
                                style={{ color: proj.color }}
                              >
                                {proj.number}
                              </span>
                            </div>
                          </div>
                          <div
                            className="p-3 sm:p-4 rounded-lg"
                            style={{ backgroundColor: `${proj.color}20` }}
                          >
                            <ProjIcon
                              className="w-8 h-8 sm:w-10 sm:h-10"
                              style={{ color: proj.color }}
                            />
                          </div>
                        </div>

                        <div className="flex-1">
                          <h3
                            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6"
                            style={{ color: proj.color }}
                          >
                            {proj.title}
                          </h3>
                          <p className="text-gray-300 leading-relaxed text-base sm:text-lg mb-4 sm:mb-6">
                            {proj.longDescription}
                          </p>
                          <p className="text-gray-400 leading-relaxed italic text-sm sm:text-base">
                            {proj.description}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-6 sm:pt-8 border-t border-gray-700 mt-6 sm:mt-8">
                          <span className="text-gray-500 text-sm">{proj.year}</span>
                          <button
                            onClick={() => handlePdfOpen(proj.pdfPath)}
                            className="px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold text-xs sm:text-sm transition-all hover:scale-105"
                            style={{
                              backgroundColor: `${proj.color}20`,
                              color: proj.color,
                              border: `1px solid ${proj.color}40`,
                            }}
                          >
                            {t('projects.viewPdf')}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`flex-shrink-0 p-3 rounded-lg transition-all ${canScrollRight
                ? 'bg-[#A855F7]/20 hover:bg-[#A855F7]/30 text-[#A855F7] cursor-pointer'
                : 'bg-gray-700/20 text-gray-500 cursor-not-allowed opacity-50'
                }`}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Swipeable Cards */}
          <div
            className="md:hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-300 ease-out"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                }}
              >
                {projects.map((proj) => {
                  const ProjIcon = proj.icon;
                  return (
                    <div
                      key={proj.number}
                      className="w-full flex-shrink-0 px-2"
                    >
                      <div
                        className="card-cosmic p-6 rounded-2xl"
                        style={{
                          borderColor: `${proj.color}40`,
                        }}
                      >
                        <div className="flex items-start justify-between mb-6">
                          <div>
                            <span
                              className="text-xs font-semibold uppercase tracking-widest opacity-60"
                              style={{ color: proj.color }}
                            >
                              {proj.category}
                            </span>
                            <div className="mt-2">
                              <span
                                className="text-4xl font-bold opacity-20"
                                style={{ color: proj.color }}
                              >
                                {proj.number}
                              </span>
                            </div>
                          </div>
                          <div
                            className="p-3 rounded-lg"
                            style={{ backgroundColor: `${proj.color}20` }}
                          >
                            <ProjIcon
                              className="w-6 h-6"
                              style={{ color: proj.color }}
                            />
                          </div>
                        </div>

                        <h3
                          className="text-xl font-bold mb-4"
                          style={{ color: proj.color }}
                        >
                          {proj.title}
                        </h3>
                        <p className="text-gray-400 leading-relaxed text-sm mb-4 italic">
                          {proj.description}
                        </p>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-700 mt-4">
                          <span className="text-gray-500 text-xs">{proj.year}</span>
                          <button
                            onClick={() => handlePdfOpen(proj.pdfPath)}
                            className="px-4 py-2 rounded-lg font-semibold text-xs transition-all active:scale-95"
                            style={{
                              backgroundColor: `${proj.color}20`,
                              color: proj.color,
                              border: `1px solid ${proj.color}40`,
                            }}
                          >
                            {t('projects.viewPdf')}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 sm:gap-3 mt-8 sm:mt-12">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`transition-all rounded-full ${index === currentIndex
                  ? 'bg-[#A855F7] w-6 sm:w-8 h-2 sm:h-3'
                  : 'bg-gray-600 w-2 sm:w-3 h-2 sm:h-3 hover:bg-[#A855F7]/50'
                  }`}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="mt-16 sm:mt-20 text-center">
          <div className="card-cosmic p-6 sm:p-8 rounded-2xl inline-block max-w-3xl">
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-[#A855F7]">{t('projects.myApproach')}</h3>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed italic">
              {t('projects.myApproachDesc')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
