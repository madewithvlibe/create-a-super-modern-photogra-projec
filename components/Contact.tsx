'use client';

import { useState, useEffect } from 'react';

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    const element = document.getElementById('contact');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <section id="contact" className="py-32 px-6 lg:px-12 bg-white relative">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-48 h-[0.5px] bg-black/10" />
      <div className="absolute bottom-0 right-0 w-64 h-[0.5px] bg-black/10" />

      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Side - Info */}
          <div
            className={`lg:col-span-5 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <h2 className="text-5xl md:text-7xl font-extralight tracking-[0.3em] mb-8">
              GET IN TOUCH
            </h2>
            <div className="w-24 h-[0.5px] bg-black mb-12" />

            <div className="space-y-8 text-sm tracking-[0.15em]">
              <div>
                <div className="text-xs opacity-40 mb-2">EMAIL</div>
                <a href="mailto:hello@dpstudio.com" className="hover:opacity-60 transition-opacity">
                  hello@dpstudio.com
                </a>
              </div>
              <div>
                <div className="text-xs opacity-40 mb-2">INSTAGRAM</div>
                <a href="https://instagram.com/dpstudio" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity">
                  @dpstudio
                </a>
              </div>
              <div>
                <div className="text-xs opacity-40 mb-2">LOCATION</div>
                <div className="opacity-80">Available Worldwide</div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div
            className={`lg:col-span-7 transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <input
                  type="text"
                  placeholder="NAME"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full bg-transparent border-b border-black/20 py-4 px-0 text-sm tracking-[0.15em] focus:outline-none focus:border-black transition-colors placeholder:text-black/30"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="EMAIL"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full bg-transparent border-b border-black/20 py-4 px-0 text-sm tracking-[0.15em] focus:outline-none focus:border-black transition-colors placeholder:text-black/30"
                />
              </div>
              <div>
                <textarea
                  placeholder="MESSAGE"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={6}
                  className="w-full bg-transparent border-b border-black/20 py-4 px-0 text-sm tracking-[0.15em] focus:outline-none focus:border-black transition-colors placeholder:text-black/30 resize-none"
                />
              </div>
              <div className="flex items-center justify-between pt-4">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="group relative px-12 py-4 border border-black/20 text-sm tracking-[0.2em] hover:bg-black hover:text-white transition-all duration-300 disabled:opacity-50"
                >
                  {status === 'sending' && 'SENDING...'}
                  {status === 'success' && 'SENT!'}
                  {status === 'error' && 'ERROR'}
                  {status === 'idle' && 'SEND'}
                </button>
                {status === 'success' && (
                  <span className="text-xs tracking-[0.15em] opacity-60">
                    Thank you for your message
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
