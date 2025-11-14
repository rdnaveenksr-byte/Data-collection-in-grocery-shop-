
import React, { useState } from 'react';
import { generateDescription } from '../services/geminiService';
import { GroceryCategory } from '../types';
import type { GroceryItem } from '../types';
import LoadingSpinner from './LoadingSpinner';
import { AIIcon } from './icons/AIIcon';

interface GroceryFormProps {
  addGroceryItem: (item: Omit<GroceryItem, 'id'>) => void;
}

const GroceryForm: React.FC<GroceryFormProps> = ({ addGroceryItem }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<GroceryCategory>(GroceryCategory.FRUITS_VEGETABLES);
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleGenerateDescription = async () => {
    if (!name) {
      setError("Please enter an item name first.");
      return;
    }
    setError('');
    setIsGenerating(true);
    try {
      const generatedDesc = await generateDescription(name, category);
      setDescription(generatedDesc);
    } catch (err) {
      setError("Failed to generate description.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !price || !quantity) {
      setError("Please fill in all required fields: Name, Price, and Quantity.");
      return;
    }
    setError('');
    addGroceryItem({
      name,
      category,
      price: parseFloat(price),
      quantity: parseInt(quantity, 10),
      description,
      imageUrl: imagePreview || undefined,
    });
    // Reset form
    setName('');
    setCategory(GroceryCategory.FRUITS_VEGETABLES);
    setPrice('');
    setQuantity('');
    setDescription('');
    setImageFile(null);
    setImagePreview(null);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg space-y-6 sticky top-8">
      <h2 className="text-xl font-bold text-gray-700">Add New Item</h2>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Item Name</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500" placeholder="e.g., Organic Apples" required />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
        <select id="category" value={category} onChange={(e) => setCategory(e.target.value as GroceryCategory)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500">
          {Object.values(GroceryCategory).map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price ($)</label>
          <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500" placeholder="2.99" required min="0" step="0.01" />
        </div>
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
          <input type="number" id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500" placeholder="50" required min="0" />
        </div>
      </div>
      
      <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <div className="relative">
              <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500" rows={4} placeholder="e.g., Fresh and crisp, perfect for snacking." />
              <button type="button" onClick={handleGenerateDescription} disabled={isGenerating || !name} className="absolute bottom-2 right-2 flex items-center justify-center px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-100 rounded-md hover:bg-emerald-200 disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors">
                  {isGenerating ? <LoadingSpinner /> : <AIIcon />}
                  <span className="ml-1.5">{isGenerating ? 'Generating...' : 'Generate with AI'}</span>
              </button>
          </div>
      </div>
      
      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">Item Image</label>
        <div className="mt-1 flex items-center space-x-4">
            {imagePreview && <img src={imagePreview} alt="Preview" className="h-16 w-16 object-cover rounded-md" />}
            <div className="flex-1">
                <input type="file" id="image" onChange={handleImageChange} accept="image/*" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100" />
            </div>
        </div>
      </div>
      
      <button type="submit" className="w-full bg-emerald-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors duration-300">
        Add Item
      </button>
    </form>
  );
};

export default GroceryForm;
