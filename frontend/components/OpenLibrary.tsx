
import React, { useState } from 'react';
import { ArrowUpRight, Search, Sparkles } from 'lucide-react';
import { LibraryItem } from '../types';

const OPEN_COLLECTION: LibraryItem[] = [
  {
    id: 'open-1',
    title: 'The Art of Slow Living',
    author: 'Lumimar Open',
    type: 'ebook',
    category: 'Wellness',
    price: 0,
    description: 'A curated guide to reclaiming your time and finding beauty in the pauses. Perfect for anyone looking to reduce digital noise.',
    imageUrl: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=1000&auto=format&fit=crop',
    createdAt: Date.now()
  },
  {
    id: 'open-2',
    title: 'Creative Confidence 101',
    author: 'Lumimar Open',
    type: 'course',
    category: 'Creativity',
    price: 0,
    description: 'Unlocking the subconscious pathways to original thought. A video series designed to break through creative blocks.',
    imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1000&auto=format&fit=crop',
    createdAt: Date.now()
  },
  {
    id: 'open-3',
    title: 'Mindful Morning Blueprint',
    author: 'Lumimar Open',
    type: 'ebook',
    category: 'Rituals',
    price: 0,
    description: 'Transform your first 60 minutes. Learn the exact routine high-achievers use to stay grounded and productive.',
    imageUrl: 'https://images.unsplash.com/photo-1463320726281-696a485928c7?q=80&w=1000&auto=format&fit=crop',
    createdAt: Date.now()
  },
  {
    id: 'open-4',
    title: 'Digital Zen Essentials',
    author: 'Lumimar Open',
    type: 'bundle',
    category: 'Productivity',
    price: 0,
    description: 'A collection of checklists and guides to organize your digital workspace for maximum focus and zero stress.',
    imageUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1000&auto=format&fit=crop',
    createdAt: Date.now()
  }
];

interface OpenLibraryProps {
  onAccessNow: (item: LibraryItem) => void;
}

const OpenLibrary: React.FC<OpenLibraryProps> = ({ onAccessNow }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = OPEN_COLLECTION.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-12 animate-in fade-in duration-700">
      <header className="max-w-3xl mx-auto text-center mb-16 space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-stone-100 rounded-full text-[10px] font-bold uppercase tracking-widest text-stone-600 border border-stone-200">
          <Sparkles size={12} /> Public Collections
        </div>
        <h2 className="text-5xl md:text-7xl font-serif font-bold text-stone-900 tracking-tighter">
          Open Library
        </h2>
        <p className="text-stone-500 font-medium text-lg leading-relaxed">
          Access our curated treasures at no cost. These books and courses are open to all, designed to upgrade your mind and life without barriers.
        </p>
        
        <div className="relative max-w-md mx-auto mt-10">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
          <input 
            type="text" 
            placeholder="Search open collections..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-6 py-4 bg-white border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-stone-200 transition-all text-sm chic-shadow"
          />
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {filteredItems.map((item) => (
          <div key={item.id} className="group bg-white rounded-[2.5rem] overflow-hidden chic-shadow border border-stone-100 flex flex-col md:flex-row h-full transition-all hover:-translate-y-1 hover:shadow-2xl">
            <div className="md:w-2/5 aspect-[4/5] md:aspect-auto overflow-hidden bg-stone-100 relative">
              <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm">
                {item.type}
              </div>
            </div>
            <div className="p-8 md:p-10 md:w-3/5 flex flex-col justify-between">
              <div>
                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] mb-3">{item.category}</p>
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-stone-900 mb-4 leading-tight">{item.title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed mb-6 italic">
                  {item.description}
                </p>
              </div>
              
              <button
                onClick={() => onAccessNow(item)}
                className="w-full py-4 bg-stone-900 text-white rounded-2xl text-[11px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-stone-800 transition-all shadow-lg hover:shadow-stone-200"
              >
                {item.price > 0 ? 'Buy Now' : 'Get Free Access'}
                <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OpenLibrary;
