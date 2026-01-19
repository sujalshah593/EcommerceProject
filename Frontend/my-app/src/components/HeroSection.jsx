import men from '../assets/men.jpg';
const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center pt-20">
      
      <img
        src={men}
        alt="Hero"
        className="absolute inset-0 w-full h-full object-cover brightness-90"
      />

      <div className="relative z-10 px-6 md:px-12 max-w-7xl mx-auto font-serif text-white space-y-6">
        <span className="text-[10px] uppercase tracking-[0.5em] opacity-70">
          Spring / Summer 2025
        </span>

        <h1 className="text-6xl md:text-9xl font-serif leading-none">
          The New <br />
          Standard<span className="text-red-500 italic">.</span>
        </h1>

        <p className="max-w-md text-lg opacity-80">
          Redefining contemporary elegance through structural silhouettes.
        </p>

        <div className="flex gap-4">
          <button className="px-10 py-4 bg-white text-black text-[10px] uppercase tracking-widest">
            Shop Collection
          </button>
          <button className="px-10 py-4 border border-white/30 text-[10px] uppercase tracking-widest">
            Watch Film
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
