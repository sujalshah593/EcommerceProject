import React from 'react'
import boys from '../assets/boys.png'
import men from '../assets/men.png'
import download from '../assets/download.jpg';
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom';
import left_image from "../assets/left_image.png"

const BuyerSection = () => {
  return (
<>
        <section className="px-6 md:px-12 py-12 max-w-7xl mx-auto space-y-8 mb-20">
          <div className="grid grid-cols-1 text md:grid-cols-4 md:grid-rows-2 gap-4 h-[1200px] md:h-[800px]">
            <div className="md:col-span-2  md:row-span-2 relative group overflow-hidden bg-zinc-100 reveal">
              <img
                src={boys}
                alt="Women"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all"></div>
              <div className="absolute bottom-8 left-8 space-y-2">
                <h4 className="text-2xl text1 text-white">Ready-to-Wear</h4>
                <Link
                  to="/Boys"
                  className="inline-block text-[10px] font-bold uppercase tracking-widest text-white border-b border-white pb-1"
                >
                  For Kids
                </Link>
              </div>
            </div>
            <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden bg-zinc-100 reveal">
              <img
                src={men}
                alt="Men"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all"></div>
              <div className="absolute bottom-8 left-8 space-y-2">
                <h4 className="text-2xl font-serif text1 text-white">Modern Tailoring</h4>
                <Link
                  to="/Mens"
                  className="inline-block text-[10px] font-bold uppercase tracking-widest text-white border-b border-white pb-1"
                >
                  Shop Mens
                </Link>
              </div>
            </div>
            
          </div>
        </section>
</>
  )
}

export default BuyerSection
