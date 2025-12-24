'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://s3.eu-central-2.wasabisys.com/vlibe.com/vlibe-storage/platform/cmjictky40000ulihxbnfjci7/default/DPSTUDIO-Dylan_Lewis_11_OCT_24-2_1766512210345_jloz8f.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=U0292SSJ930JAC3CVTGQ%2F20251223%2Feu-central-2%2Fs3%2Faws4_request&X-Amz-Date=20251223T200900Z&X-Amz-Expires=3600&X-Amz-Signature=9543d0287faaa1154b6f17e8d82d02b11db1e245857aa08efb5227293d4d1e53&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject"
          alt="Hero"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-white/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <div
          className={`transition-all duration-1000 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-extralight tracking-[0.3em] mb-8">
            DP STUDIO
          </h1>
          <div className="w-32 h-[0.5px] bg-black mx-auto mb-8" />
          <p className="text-sm md:text-base tracking-[0.25em] font-light uppercase">
            Photography & Creative Direction
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-col items-center animate-bounce">
          <span className="text-xs tracking-[0.3em] mb-4">SCROLL</span>
          <div className="w-[0.5px] h-12 bg-black" />
        </div>
      </div>

      {/* Decorative Lines */}
      <div className="absolute top-0 left-[20%] w-[0.5px] h-full bg-black/10" />
      <div className="absolute top-0 right-[20%] w-[0.5px] h-full bg-black/10" />
    </section>
  );
}
