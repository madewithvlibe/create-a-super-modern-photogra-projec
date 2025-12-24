'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const images = [
  {
    src: 'https://s3.eu-central-2.wasabisys.com/vlibe.com/vlibe-storage/platform/cmjictky40000ulihxbnfjci7/default/DPSTUDIO-A_LPort-11_1766511112051_d6y72e.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=U0292SSJ930JAC3CVTGQ%2F20251223%2Feu-central-2%2Fs3%2Faws4_request&X-Amz-Date=20251223T200900Z&X-Amz-Expires=3600&X-Amz-Signature=702f0aad645c2e799872ec6fdff25ef4b64df8d0b408f7e0b5c453b4f14e57d2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject',
    alt: 'Portrait 1',
    position: 'top-left',
  },
  {
    src: 'https://s3.eu-central-2.wasabisys.com/vlibe.com/vlibe-storage/platform/cmjictky40000ulihxbnfjci7/default/DPSTUDIO-22NOV24DL-109_1766511090104_p87q7p.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=U0292SSJ930JAC3CVTGQ%2F20251223%2Feu-central-2%2Fs3%2Faws4_request&X-Amz-Date=20251223T200900Z&X-Amz-Expires=3600&X-Amz-Signature=a9f5bf08e210ecafcd6eccce5d5bb2ed04ad28e9882f4add0ccf5791517fff65&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject',
    alt: 'Portrait 2',
    position: 'bottom-right',
  },
  {
    src: 'https://s3.eu-central-2.wasabisys.com/vlibe.com/vlibe-storage/platform/cmjictky40000ulihxbnfjci7/default/DPSTUDIO-22NOV24DL-107_1766511062504_4ehq6j.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=U0292SSJ930JAC3CVTGQ%2F20251223%2Feu-central-2%2Fs3%2Faws4_request&X-Amz-Date=20251223T202952Z&X-Amz-Expires=3600&X-Amz-Signature=c1a995a332e74d2e32035fac18b666e2a2ea001923a795d570249c7e21f12edc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject',
    alt: 'Team Portrait',
    position: 'center',
  },
  {
    src: 'https://s3.eu-central-2.wasabisys.com/vlibe.com/vlibe-storage/platform/cmjictky40000ulihxbnfjci7/default/DPSTUDIO-22NOV24DL-106_1766511015427_s6mtie.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=U0292SSJ930JAC3CVTGQ%2F20251223%2Feu-central-2%2Fs3%2Faws4_request&X-Amz-Date=20251223T200900Z&X-Amz-Expires=3600&X-Amz-Signature=bc0ba274e8460c3044309b0730a8a0264db9c4951ce546db4f02af897477f020&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject',
    alt: 'Portrait 4',
    position: 'offset',
  },
  {
    src: 'https://s3.eu-central-2.wasabisys.com/vlibe.com/vlibe-storage/platform/cmjictky40000ulihxbnfjci7/default/DPSTUDIO-22NOV24DL-108_1766511067953_oaga5l.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=U0292SSJ930JAC3CVTGQ%2F20251223%2Feu-central-2%2Fs3%2Faws4_request&X-Amz-Date=20251223T202952Z&X-Amz-Expires=3600&X-Amz-Signature=5c26155b44aebdcc171addd8aabb1a64aa457ac844c6c4d89eacdc368bb1505c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject',
    alt: 'Portrait 5',
    position: 'bottom-left',
  },
  {
    src: 'https://s3.eu-central-2.wasabisys.com/vlibe.com/vlibe-storage/platform/cmjictky40000ulihxbnfjci7/default/DPSTUDIO-Dylan_Lewis_11_OCT_24-2_1766512210345_jloz8f.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=U0292SSJ930JAC3CVTGQ%2F20251223%2Feu-central-2%2Fs3%2Faws4_request&X-Amz-Date=20251223T200900Z&X-Amz-Expires=3600&X-Amz-Signature=9543d0287faaa1154b6f17e8d82d02b11db1e245857aa08efb5227293d4d1e53&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject',
    alt: 'Portrait 6',
    position: 'top-right',
  },
];

export default function Gallery() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
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
      { threshold: 0.1 }
    );

    const element = document.getElementById('work');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="work" className="py-32 px-6 lg:px-12 bg-white relative">
      {/* Section Title */}
      <div className="max-w-[1800px] mx-auto mb-24">
        <div className="flex items-center space-x-8">
          <h2 className="text-5xl md:text-7xl font-extralight tracking-[0.3em]">SELECTED WORK</h2>
          <div className="flex-grow h-[0.5px] bg-black/20" />
        </div>
      </div>

      {/* Gallery Grid - Asymmetric Layout */}
      <div className="max-w-[1800px] mx-auto space-y-6">
        {/* Row 1 */}
        <div className="grid grid-cols-12 gap-6">
          <div
            className={`col-span-12 md:col-span-7 aspect-[4/5] relative overflow-hidden border-[0.5px] border-black/10 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
            style={{ transitionDelay: '0ms' }}
          >
            <Image
              src={images[0].src}
              alt={images[0].alt}
              fill
              className={`object-cover transition-transform duration-700 ${
                hoveredIndex === 0 ? 'scale-105' : 'scale-100'
              }`}
              onMouseEnter={() => setHoveredIndex(0)}
              onMouseLeave={() => setHoveredIndex(null)}
            />
          </div>
          <div
            className={`col-span-12 md:col-span-5 aspect-[3/4] relative overflow-hidden border-[0.5px] border-black/10 md:mt-32 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <Image
              src={images[1].src}
              alt={images[1].alt}
              fill
              className={`object-cover transition-transform duration-700 ${
                hoveredIndex === 1 ? 'scale-105' : 'scale-100'
              }`}
              onMouseEnter={() => setHoveredIndex(1)}
              onMouseLeave={() => setHoveredIndex(null)}
            />
          </div>
        </div>

        {/* Row 2 - Team Portrait Feature */}
        <div className="grid grid-cols-12 gap-6">
          <div
            className={`col-span-12 md:col-span-4 aspect-[3/4] relative overflow-hidden border-[0.5px] border-black/10 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            <Image
              src={images[2].src}
              alt={images[2].alt}
              fill
              className={`object-cover transition-transform duration-700 ${
                hoveredIndex === 2 ? 'scale-105' : 'scale-100'
              }`}
              onMouseEnter={() => setHoveredIndex(2)}
              onMouseLeave={() => setHoveredIndex(null)}
            />
          </div>
          <div
            className={`col-span-12 md:col-span-8 aspect-[16/9] relative overflow-hidden border-[0.5px] border-black/10 md:-mt-16 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
            style={{ transitionDelay: '600ms' }}
          >
            <Image
              src={images[3].src}
              alt={images[3].alt}
              fill
              className={`object-cover transition-transform duration-700 ${
                hoveredIndex === 3 ? 'scale-105' : 'scale-100'
              }`}
              onMouseEnter={() => setHoveredIndex(3)}
              onMouseLeave={() => setHoveredIndex(null)}
            />
          </div>
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-12 gap-6">
          <div
            className={`col-span-12 md:col-span-6 aspect-[4/5] relative overflow-hidden border-[0.5px] border-black/10 md:mt-16 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
            style={{ transitionDelay: '800ms' }}
          >
            <Image
              src={images[4].src}
              alt={images[4].alt}
              fill
              className={`object-cover transition-transform duration-700 ${
                hoveredIndex === 4 ? 'scale-105' : 'scale-100'
              }`}
              onMouseEnter={() => setHoveredIndex(4)}
              onMouseLeave={() => setHoveredIndex(null)}
            />
          </div>
          <div
            className={`col-span-12 md:col-span-6 aspect-[4/5] relative overflow-hidden border-[0.5px] border-black/10 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
            style={{ transitionDelay: '1000ms' }}
          >
            <Image
              src={images[5].src}
              alt={images[5].alt}
              fill
              className={`object-cover transition-transform duration-700 ${
                hoveredIndex === 5 ? 'scale-105' : 'scale-100'
              }`}
              onMouseEnter={() => setHoveredIndex(5)}
              onMouseLeave={() => setHoveredIndex(null)}
            />
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 right-0 w-24 h-[0.5px] bg-black/10" />
      <div className="absolute bottom-1/4 left-0 w-32 h-[0.5px] bg-black/10" />
    </section>
  );
}
