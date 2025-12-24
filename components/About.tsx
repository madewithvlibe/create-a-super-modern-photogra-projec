'use client';

import { useEffect, useState } from 'react';

export default function About() {
  const [isVisible, setIsVisible] = useState(false);

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

    const element = document.getElementById('about');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-32 px-6 lg:px-12 bg-black text-white relative overflow-hidden">
      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-[25%] w-[0.5px] h-full bg-white" />
        <div className="absolute top-0 left-[50%] w-[0.5px] h-full bg-white" />
        <div className="absolute top-0 left-[75%] w-[0.5px] h-full bg-white" />
        <div className="absolute top-[33%] left-0 w-full h-[0.5px] bg-white" />
        <div className="absolute top-[66%] left-0 w-full h-[0.5px] bg-white" />
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Side - Number */}
          <div
            className={`lg:col-span-3 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <div className="text-[120px] md:text-[180px] font-extralight leading-none opacity-20">
              01
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="lg:col-span-9 space-y-12">
            <div
              className={`transition-all duration-1000 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
            >
              <h2 className="text-5xl md:text-7xl font-extralight tracking-[0.3em] mb-8">
                ABOUT
              </h2>
              <div className="w-24 h-[0.5px] bg-white mb-12" />
            </div>

            <div
              className={`space-y-8 transition-all duration-1000 delay-400 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
            >
              <p className="text-lg md:text-xl font-light tracking-[0.1em] leading-relaxed max-w-3xl">
                DP Studio is a creative photography practice specializing in portrait and
                editorial work. Based on capturing authentic moments and creating timeless
                imagery that tells compelling stories.
              </p>
              <p className="text-base md:text-lg font-light tracking-[0.08em] leading-relaxed max-w-3xl opacity-80">
                With a focus on natural light and minimalist composition, every project
                is approached with meticulous attention to detail and artistic vision.
                The studio works with clients ranging from individuals to brands, creating
                visual narratives that resonate.
              </p>
            </div>

            {/* Stats */}
            <div
              className={`grid grid-cols-3 gap-8 pt-16 border-t border-white/10 transition-all duration-1000 delay-600 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
            >
              <div>
                <div className="text-4xl md:text-5xl font-extralight mb-2">50+</div>
                <div className="text-xs tracking-[0.2em] opacity-60">PROJECTS</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-extralight mb-2">5+</div>
                <div className="text-xs tracking-[0.2em] opacity-60">YEARS</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-extralight mb-2">100%</div>
                <div className="text-xs tracking-[0.2em] opacity-60">PASSION</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
