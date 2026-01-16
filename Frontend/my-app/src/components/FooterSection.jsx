import React from 'react';
import { Instagram, Facebook, Twitter, ChevronRight } from 'lucide-react'

const FooterSection = () => {
  return (
    <>
        <footer className="bg-black text-white px-6 md:px-12 pt-24 pb-12">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24 pb-24 border-b border-white/10">
            <div className="md:col-span-4 space-y-8">
              <a href="/" className="text-2xl font-bold tracking-tighter uppercase">
                SHRÉEJI<span className="text-accent">.</span>
              </a>
              <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
                A design-driven clothing studio focused on creating timeless garments for the modern individual. We
                believe in the beauty of simplicity and the integrity of natural materials.
              </p>
              <div className="flex gap-6">
                <Instagram className="w-5 h-5 hover:text-accent cursor-pointer transition-colors" />
                <Facebook className="w-5 h-5 hover:text-accent cursor-pointer transition-colors" />
                <Twitter className="w-5 h-5 hover:text-accent cursor-pointer transition-colors" />
              </div>
            </div>

            <div className="md:col-span-2 space-y-6">
              <h5 className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">Shop</h5>
              <ul className="space-y-4 text-[10px] uppercase tracking-widest font-bold">
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Boys
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Men
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    New Arrivals
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Exclusives
                  </a>
                </li>
              </ul>
            </div>

            <div className="md:col-span-2 space-y-6">
              <h5 className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">About</h5>
              <ul className="space-y-4 text-[10px] uppercase tracking-widest font-bold">
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Journal
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Bespoke
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Owner
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            <div className="md:col-span-4 space-y-6">
              <h5 className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">Customer Care</h5>
              <div className="space-y-4">
                <p className="text-[10px] font-bold uppercase tracking-widest hover:text-accent transition-colors cursor-pointer border-b border-white/10 pb-2">
                  support@vero.com
                </p>
                <div className="grid grid-cols-2 gap-4 text-[10px] uppercase tracking-widest font-bold text-zinc-400">
                  <a href="#" className="hover:text-white transition-colors">
                    Shipping
                  </a>
                  <a href="#" className="hover:text-white transition-colors">
                    Exchanges
                  </a>
                  <a href="#" className="hover:text-white transition-colors">
                    Sustainability
                  </a>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </div>
              </div>
            </div>
          </div>a       <div className="max-w-7xl mx-auto pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-medium">
              © 2025 SHRÉEJI DESIGN STUDIO. ALL RIGHTS RESERVED.
            </p>
            <div className="flex gap-12 text-[10px] uppercase tracking-[0.4em] font-bold text-zinc-500">
              <span className="cursor-pointer hover:text-white transition-colors underline decoration-accent underline-offset-4">
                EN
              </span>
              <span className="cursor-pointer hover:text-white transition-colors">FR</span>
              <span className="cursor-pointer hover:text-white transition-colors">IT</span>
            </div>
          </div>
        </footer>
    </>
  )
}

export default FooterSection
