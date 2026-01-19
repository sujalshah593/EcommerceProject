import React from 'react'
import { ArrowRight } from 'lucide-react'
import men from '../assets/men.jpg'
import download from '../assets/download.jpg';

const FeaturedSection = () => {
  return (
    <>
      <section className="px-6 md:px-12 py-24 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center font-serif">
            <div className="lg:col-span-7 relative aspect-[4/5] bg-secondary group overflow-hidden reveal">
              <img
                src="/high-fashion-editorial.png"
                alt="Editorial"
                className="object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute bottom-8 left-8 text-white">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em]">Issue No. 12</p>
                <h3 className="text-2xl font-serif italic">Silent Luxury</h3>
              </div>
            </div>
            <div className="lg:col-span-5 space-y-8 reveal">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">Philosophy</span>
              <h2 className="text-4xl md:text-6xl font-serif leading-[1.1]">
                The Art of <br />
                Subtraction
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                We believe that true luxury lies in what is left out. Our garments are designed with a minimalist lens,
                focusing on the tension between drape and structure, shadow and light.
              </p>
              <div className="pt-4">
                <a
                  href="#"
                  className="group inline-flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em]"
                >
                  Read the Journal{" "}
                  <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>
        <section className="px-6 md:px-12 py-12 max-w-7xl mx-auto space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-[1200px] md:h-[800px]">
            <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden bg-zinc-100 reveal">
              <img
                src={men}
                alt="Women"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all"></div>
              <div className="absolute bottom-8 left-8 space-y-2">
                <h4 className="text-2xl font-serif text-white">Ready-to-Wear</h4>
                <a
                  href="#"
                  className="inline-block text-[10px] font-bold uppercase tracking-widest text-white border-b border-white pb-1"
                >
                  Shop Women
                </a>
              </div>
            </div>
            <div className="md:col-span-2 relative group overflow-hidden bg-zinc-200 reveal">
              <img
                src={download}
                alt="Men"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all"></div>
              <div className="absolute bottom-8 left-8 space-y-2">
                <h4 className="text-2xl font-serif text-white">Modern Tailoring</h4>
                <a
                  href="#"
                  className="inline-block text-[10px] font-bold uppercase tracking-widest text-white border-b border-white pb-1"
                >
                  Shop Men
                </a>
              </div>
            </div>
            <div className="relative group overflow-hidden bg-zinc-300 reveal">
              <img
                src="/fashion-accessories-detail.jpg"
                alt="Accessories"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-6 left-6">
                <h4 className="text-lg font-serif text-white">Objects</h4>
              </div>
            </div>
            <div className="relative group overflow-hidden bg-zinc-400 reveal">
              <img
                src="/silk-scarf-texture.jpg"
                alt="Silk"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-6 left-6">
                <h4 className="text-lg font-serif text-white">Textiles</h4>
              </div>
            </div>
          </div>
        </section>
    </>
  )
}

export default FeaturedSection
