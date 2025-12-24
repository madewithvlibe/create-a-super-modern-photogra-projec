import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 relative overflow-hidden">
      {/* Decorative Lines */}
      <div className="absolute top-0 left-[20%] w-[0.5px] h-full bg-black/5" />
      <div className="absolute top-0 left-[40%] w-[0.5px] h-full bg-black/5" />
      <div className="absolute top-0 left-[60%] w-[0.5px] h-full bg-black/5" />
      <div className="absolute top-0 left-[80%] w-[0.5px] h-full bg-black/5" />

      <div className="text-center relative z-10">
        {/* Large 404 */}
        <div className="text-[180px] md:text-[280px] font-extralight leading-none opacity-10 mb-8">
          404
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-extralight tracking-[0.3em] mb-6">
          PAGE NOT FOUND
        </h1>

        <div className="w-32 h-[0.5px] bg-black mx-auto mb-8" />

        {/* Description */}
        <p className="text-sm md:text-base tracking-[0.2em] font-light mb-12 opacity-60">
          THE PAGE YOU ARE LOOKING FOR DOES NOT EXIST
        </p>

        {/* Back Button */}
        <Link
          href="/"
          className="inline-block px-12 py-4 border border-black/20 text-sm tracking-[0.2em] hover:bg-black hover:text-white transition-all duration-300"
        >
          RETURN HOME
        </Link>
      </div>
    </div>
  );
}
