export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 px-6 lg:px-12 border-t border-white/10">
      <div className="max-w-[1800px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          {/* Logo */}
          <div className="text-xl tracking-[0.3em] font-light">
            DP STUDIO
          </div>

          {/* Links */}
          <div className="flex items-center space-x-8 text-xs tracking-[0.2em]">
            <a href="https://instagram.com/dpstudio" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity">
              INSTAGRAM
            </a>
            <span className="w-[0.5px] h-4 bg-white/20" />
            <a href="mailto:hello@dpstudio.com" className="hover:opacity-60 transition-opacity">
              EMAIL
            </a>
          </div>

          {/* Copyright */}
          <div className="text-xs tracking-[0.15em] opacity-40">
            2024 DP STUDIO
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-xs tracking-[0.2em] opacity-30">
            DESIGNED WITH PASSION
          </p>
        </div>
      </div>
    </footer>
  );
}
