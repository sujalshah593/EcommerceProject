import React from 'react'
import { ChevronRight } from 'lucide-react';

const SimpleSection = () => {
  return (
    <>
         <section className="py-32 px-6 md:px-12 bg-black text-white text-center">
          <div className="max-w-4xl mx-auto space-y-8 reveal">
            <span className="text-[40px] font-serif leading-none italic opacity-50 block">"</span>
            <h2 className="text-3xl text1 md:text-5xl font-serif leading-tight">
              Fashion is not just about clothes, it's about the narrative we choose to tell the world through our
              silhouette.
            </h2>
            <span className="text-[10px] font-bold uppercase text1 tracking-[0.4em] text-white/40">— Rohit Shah</span>
          </div>
        </section>
         

    </>
  )
}

export default SimpleSection;
