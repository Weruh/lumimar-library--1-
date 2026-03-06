
import React from 'react';
import { BookOpen, Info, Library } from 'lucide-react';
import { TabType } from '../types';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="sticky top-0 z-50 bg-[#fdfbf7]/80 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => setActiveTab('library')}
        >
          <div className="w-10 h-10 bg-stone-900 rounded-full flex items-center justify-center text-white group-hover:bg-stone-700 transition-colors">
            <Library size={20} />
          </div>
          <h1 className="text-2xl font-serif font-semibold tracking-tight">Lumimar Library</h1>
        </div>
        
        <div className="flex items-center gap-8 text-[10px] font-bold tracking-[0.2em] uppercase">
          <button 
            onClick={() => setActiveTab('library')}
            className={`flex items-center gap-2 transition-all ${activeTab === 'library' ? 'text-stone-900 border-b-2 border-stone-900 pb-1' : 'text-stone-400 hover:text-stone-600'}`}
          >
            <BookOpen size={14} />
            My Collection
          </button>
          <button 
            onClick={() => setActiveTab('about')}
            className={`flex items-center gap-2 transition-all ${activeTab === 'about' ? 'text-stone-900 border-b-2 border-stone-900 pb-1' : 'text-stone-400 hover:text-stone-600'}`}
          >
            <Info size={14} />
            About
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
