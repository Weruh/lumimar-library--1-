
import React, { useState } from 'react';
import { CheckCircle2, DollarSign } from 'lucide-react';
import { ContentType, LibraryItem } from '../types';

interface UploadFormProps {
  onAdd: (item: LibraryItem) => void;
  onSuccess: () => void;
}

const UploadForm: React.FC<UploadFormProps> = ({ onAdd, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'ebook' as ContentType,
    category: 'Business',
    author: 'Lumimar',
    price: 7,
    imageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1000&auto=format&fit=crop'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: LibraryItem = {
      id: crypto.randomUUID(),
      ...formData,
      createdAt: Date.now()
    };
    onAdd(newItem);
    onSuccess();
  };

  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="bg-white rounded-[2rem] chic-shadow p-8 md:p-12 border border-stone-100">
        <header className="mb-12 text-center">
          <h2 className="text-4xl font-serif font-bold text-stone-900 mb-4">Add New Treasure</h2>
          <p className="text-stone-500 max-w-lg mx-auto">Upload your IDPLR assets and organize them as polished books or course listings in your collection.</p>
        </header>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-stone-400 ml-1">Asset Title</label>
              <input 
                required
                type="text" 
                placeholder="Ex: Master Class of Luxury Marketing" 
                className="w-full p-4 bg-white border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-stone-200 text-sm font-medium"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-stone-400 ml-1">Category</label>
              <input 
                required
                type="text"
                placeholder="Ex: Business"
                className="w-full p-4 bg-white border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-stone-200 text-sm font-medium"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-stone-400 ml-1">Type</label>
                <select 
                  className="w-full p-4 bg-white border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-stone-200 text-sm appearance-none"
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value as ContentType})}
                >
                  <option value="ebook">Ebook</option>
                  <option value="course">Video Course</option>
                  <option value="bundle">Full Bundle</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-stone-400 ml-1">Listing Price ($)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={14} />
                  <input 
                    required
                    type="number" 
                    min="1"
                    className="w-full p-4 pl-9 bg-white border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-stone-200 text-sm"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-stone-400 ml-1">Description</label>
              <textarea 
                required
                placeholder="Provide a brief summary of what's inside..." 
                className="w-full h-44 p-4 bg-white border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-stone-200 text-sm leading-relaxed"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-stone-400 ml-1">Cover Preview</label>
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-stone-200 group">
                <img src={formData.imageUrl} className="w-full h-full object-cover" alt="Preview" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <p className="text-white text-xs font-bold">Book cover preview</p>
                </div>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-stone-900 text-white py-4 rounded-2xl font-bold tracking-widest uppercase hover:bg-stone-800 transition-all flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
            >
              <CheckCircle2 size={18} />
              Save to Library
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadForm;
