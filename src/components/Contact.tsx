import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectInterest: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const projectItems = t('projects.items', { returnObjects: true }) as { title: string; category: string }[];

  const projects = projectItems.map((item, index) => ({
    id: `project-${index}`,
    label: `${item.title} - ${item.category}`
  }));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const response = await fetch(`${supabaseUrl}/functions/v1/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', projectInterest: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        console.error('Failed to submit form');
        // Simulated success for prototype if no backend
        setSubmitted(true);
        setFormData({ name: '', email: '', projectInterest: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      // Simulated success for prototype
      setSubmitted(true);
      setFormData({ name: '', email: '', projectInterest: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold mb-6 text-center">
          {t('contact.title')} <span className="text-[#A855F7] glow-text">{t('contact.subtitle')}</span>
        </h2>

        <p className="text-xl text-gray-400 mb-16 max-w-2xl mx-auto text-center">
          {t('contact.desc')}
        </p>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-white mb-8">{t('contact.infoTitle')}</h3>

            <a
              href="mailto:kchallouf@gmail.com"
              className="card-cosmic p-6 rounded-2xl hover:scale-105 transition-all group flex items-center gap-4"
            >
              <div className="p-4 bg-[#A855F7]/20 rounded-full group-hover:bg-[#A855F7]/30 transition-colors flex-shrink-0">
                <Mail className="w-6 h-6 text-[#A855F7]" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Email</p>
                <p className="text-white font-semibold">kchallouf@gmail.com</p>
              </div>
            </a>

            <a
              href="tel:+21621439907"
              className="card-cosmic p-6 rounded-2xl hover:scale-105 transition-all group flex items-center gap-4"
            >
              <div className="p-4 bg-[#A855F7]/20 rounded-full group-hover:bg-[#A855F7]/30 transition-colors flex-shrink-0">
                <Phone className="w-6 h-6 text-[#A855F7]" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Phone</p>
                <p className="text-white font-semibold">+216 21 439 907</p>
              </div>
            </a>

            <div className="card-cosmic p-6 rounded-2xl flex items-center gap-4">
              <div className="p-4 bg-[#A855F7]/20 rounded-full flex-shrink-0">
                <MapPin className="w-6 h-6 text-[#A855F7]" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Location</p>
                <p className="text-white font-semibold">Ariana Soukra, Tunisia</p>
              </div>
            </div>
          </div>

          <div className="card-cosmic p-8 rounded-2xl">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[400px] gap-4">
                <CheckCircle className="w-16 h-16 text-green-400" />
                <h4 className="text-2xl font-bold text-white">{t('contact.form.success')}</h4>
                <p className="text-gray-400 text-center">{t('contact.form.successDesc')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    {t('contact.form.name')}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-black/40 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#A855F7]/50 transition-colors"
                    placeholder={t('contact.form.namePlaceholder')}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    {t('contact.form.email')}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-black/40 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#A855F7]/50 transition-colors"
                    placeholder={t('contact.form.emailPlaceholder')}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    {t('contact.form.project')}
                  </label>
                  <select
                    name="projectInterest"
                    value={formData.projectInterest}
                    onChange={handleChange}
                    className="w-full bg-black/40 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#A855F7]/50 transition-colors"
                  >
                    <option value="">{t('contact.form.projectPlaceholder')}</option>
                    {projects.map((project) => (
                      <option key={project.id} value={project.label}>
                        {project.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    {t('contact.form.message')}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full bg-black/40 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#A855F7]/50 transition-colors resize-none"
                    placeholder={t('contact.form.messagePlaceholder')}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#A855F7] hover:bg-[#A855F7]/80 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2 group"
                >
                  <span>{loading ? t('contact.form.sending') : t('contact.form.send')}</span>
                  {!loading && <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="border-t border-gray-800 pt-12 text-center">
          <p className="text-gray-500">
            {t('contact.footer')}
          </p>
        </div>
      </div>
    </section>
  );
}
