
import React, { useState, useMemo } from 'react';
import { Search, Book, PlayCircle, Layers, ShoppingBag, ArrowRight, FolderClosed, ChevronLeft } from 'lucide-react';
import { LibraryItem, ContentType } from '../types';

const DEFAULT_CATEGORY_ORDER = ['Relationships', 'Business', 'Lifestyle', 'Psychology'] as const;

const CATEGORY_IMAGES: Record<string, string> = {
  Relationships: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1200&auto=format&fit=crop',
  Business: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=1200&auto=format&fit=crop',
  Lifestyle: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1200&auto=format&fit=crop',
  Psychology: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1200&auto=format&fit=crop'
};

const getCategoryImage = (category: string): string =>
  CATEGORY_IMAGES[category] ??
  'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1200&auto=format&fit=crop';

// Helper to get icons for content types
const getIcon = (type: ContentType) => {
  switch (type) {
    case 'ebook': return <Book size={16} />;
    case 'course': return <PlayCircle size={16} />;
    case 'bundle': return <Layers size={16} />;
  }
};

// Define FolderCard outside LibraryGrid to resolve TS "key" prop errors and follow React best practices
interface FolderCardProps {
  category: string;
  count: number;
  onClick: (category: string) => void;
}

const FolderCard: React.FC<FolderCardProps> = ({ category, count, onClick }) => {
  return (
    <button 
      onClick={() => onClick(category)}
      className="group relative h-[420px] bg-white rounded-[2.5rem] overflow-hidden chic-shadow border border-stone-100 transition-all hover:-translate-y-2 hover:shadow-2xl flex flex-col"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={getCategoryImage(category)} 
          alt={category} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />
      </div>

      <div className="relative z-10 flex flex-col h-full p-10 justify-between items-start text-left">
        <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/20 group-hover:bg-white/20 group-hover:scale-110 transition-all duration-500">
          <FolderClosed size={28} strokeWidth={1.5} />
        </div>
        
        <div className="space-y-2">
          <p className="text-[10px] font-bold text-stone-300 uppercase tracking-[0.2em]">{count} Assets Unlocked</p>
          <h3 className="text-4xl font-serif font-bold text-white mb-1 leading-tight tracking-tight">{category}</h3>
          <div className="pt-4 flex items-center gap-2 text-[10px] font-bold text-white uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            Open Folder <ArrowRight size={12} />
          </div>
        </div>
      </div>
    </button>
  );
};

// Define ItemCard outside LibraryGrid to resolve TS "key" prop errors and follow React best practices
interface ItemCardProps {
  item: LibraryItem;
  onBuyNow: (item: LibraryItem) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, onBuyNow }) => {
  return (
    <div 
      id={`item-${item.id}`}
      className="group relative bg-white rounded-2xl overflow-hidden border border-stone-100 transition-all duration-500 hover:-translate-y-1 chic-shadow"
    >
      <div className="aspect-[3/4] overflow-hidden bg-stone-100 relative">
        <img 
          src={item.imageUrl} 
          alt={item.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-stone-900 shadow-sm">
          {getIcon(item.type)}
          {item.type}
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">{item.category}</p>
          <span className="text-lg font-serif font-bold text-stone-900">
            {item.displayPrice ?? `$${item.price}`}
          </span>
        </div>
        <h3 className="text-xl font-serif font-bold text-stone-900 leading-tight mb-3 line-clamp-2">{item.title}</h3>
        <p className="text-sm text-stone-500 leading-relaxed line-clamp-2 mb-4">{item.description}</p>
        <div className="pt-4 border-t border-stone-50 space-y-4">
          <button 
            onClick={() => onBuyNow(item)}
            className="w-full bg-stone-900 text-white py-3 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-stone-800 transition-all shadow-md group-hover:shadow-lg"
          >
            <ShoppingBag size={14} />
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

interface LibraryGridProps {
  items: LibraryItem[];
  onBuyNow: (item: LibraryItem) => void;
}

const LibraryGrid: React.FC<LibraryGridProps> = ({ items, onBuyNow }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFolder, setActiveFolder] = useState<string | null>(null);

  const handleOpenFolder = (category: string) => {
    setActiveFolder(category);
    setSearchTerm('');
  };

  const visibleCategories = useMemo(() => {
    const categories: string[] = Array.from(
      new Set(
        items
          .map(item => item.category.trim())
          .filter((category): category is string => category.length > 0)
      )
    );

    const orderedCategories = [
      ...DEFAULT_CATEGORY_ORDER.filter(category => categories.includes(category)),
      ...categories
        .filter(category => !DEFAULT_CATEGORY_ORDER.includes(category as (typeof DEFAULT_CATEGORY_ORDER)[number]))
        .sort((a, b) => a.localeCompare(b)),
    ];

    const search = searchTerm.trim().toLowerCase();
    if (!search) {
      return orderedCategories.map(category => ({
        category,
        count: items.filter(item => item.category.trim() === category).length,
      }));
    }

    return orderedCategories
      .map(category => ({
        category,
        count: items.filter(
          item =>
            item.category.trim() === category &&
            (
              item.title.toLowerCase().includes(search) ||
              item.description.toLowerCase().includes(search) ||
              item.category.toLowerCase().includes(search)
            )
        ).length,
      }))
      .filter(categoryData => categoryData.count > 0);
  }, [items, searchTerm]);

  // Group items for the active folder
  const groupedItems = useMemo(() => {
    if (!activeFolder) return null;
    
    const folderItems = items.filter(item => 
      item.category.trim() === activeFolder &&
      (item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
       item.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return {
      ebooks: folderItems.filter(i => i.type === 'ebook'),
      courses: folderItems.filter(i => i.type === 'course'),
      bundles: folderItems.filter(i => i.type === 'bundle'),
    };
  }, [items, activeFolder, searchTerm]);

  return (
    <div className="space-y-12 py-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-b border-stone-200 pb-8">
        <div className="flex items-center gap-4 w-full md:w-auto">
          {activeFolder && (
            <button 
              onClick={() => setActiveFolder(null)}
              className="p-3 bg-white border border-stone-200 rounded-xl text-stone-900 hover:bg-stone-50 transition-all flex items-center gap-2 font-bold text-[10px] uppercase tracking-widest"
            >
              <ChevronLeft size={16} /> Back
            </button>
          )}
          <div className="relative flex-grow md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
            <input 
              type="text" 
              placeholder={activeFolder ? `Search in ${activeFolder}...` : "Search your entire collection..."}
              className="w-full pl-10 pr-4 py-3 bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-200 transition-all text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {!activeFolder ? (
        visibleCategories.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-stone-200 rounded-3xl">
            <p className="text-stone-500 font-serif italic text-lg">
              {searchTerm.trim() ? 'No assets match your search.' : 'Your collection is empty.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {visibleCategories.map(({ category, count }) => (
              <FolderCard
                key={category}
                category={category}
                count={count}
                onClick={handleOpenFolder}
              />
            ))}
          </div>
        )
      ) : (
        <div className="space-y-16 animate-in slide-in-from-right-4 duration-500">
          <header className="flex items-center gap-4">
            <div className="w-12 h-12 bg-stone-900 rounded-2xl flex items-center justify-center text-white">
              <FolderClosed size={24} />
            </div>
            <div>
              <h2 className="text-3xl font-serif font-bold text-stone-900">{activeFolder} Folder</h2>
              <p className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em]">Browsing categorized assets</p>
            </div>
          </header>

          {groupedItems && (
            <>
              {/* Ebooks Section */}
              {groupedItems.ebooks.length > 0 && (
                <section className="space-y-6">
                  <div className="flex items-center gap-3 border-l-4 border-stone-900 pl-4">
                    <Book size={20} className="text-stone-400" />
                    <h3 className="text-xl font-serif font-bold text-stone-900">Ebooks</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {groupedItems.ebooks.map(item => (
                      <ItemCard 
                        key={item.id} 
                        item={item} 
                        onBuyNow={onBuyNow} 
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* Courses Section */}
              {groupedItems.courses.length > 0 && (
                <section className="space-y-6">
                  <div className="flex items-center gap-3 border-l-4 border-stone-900 pl-4">
                    <PlayCircle size={20} className="text-stone-400" />
                    <h3 className="text-xl font-serif font-bold text-stone-900">Video Courses</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {groupedItems.courses.map(item => (
                      <ItemCard 
                        key={item.id} 
                        item={item} 
                        onBuyNow={onBuyNow} 
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* Bundles Section */}
              {groupedItems.bundles.length > 0 && (
                <section className="space-y-6">
                  <div className="flex items-center gap-3 border-l-4 border-stone-900 pl-4">
                    <Layers size={20} className="text-stone-400" />
                    <h3 className="text-xl font-serif font-bold text-stone-900">Full Bundles</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {groupedItems.bundles.map(item => (
                      <ItemCard 
                        key={item.id} 
                        item={item} 
                        onBuyNow={onBuyNow} 
                      />
                    ))}
                  </div>
                </section>
              )}

              {groupedItems.ebooks.length === 0 && groupedItems.courses.length === 0 && groupedItems.bundles.length === 0 && (
                <div className="text-center py-20 border-2 border-dashed border-stone-200 rounded-3xl">
                  <p className="text-stone-400 font-serif italic text-lg">This folder is currently empty...</p>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default LibraryGrid;
