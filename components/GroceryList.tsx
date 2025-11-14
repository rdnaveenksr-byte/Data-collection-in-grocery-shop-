
import React from 'react';
import type { GroceryItem } from '../types';
import GroceryItemCard from './GroceryItemCard';

interface GroceryListProps {
  groceryItems: GroceryItem[];
}

const GroceryList: React.FC<GroceryListProps> = ({ groceryItems }) => {
  if (groceryItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-white p-8 rounded-lg shadow-lg text-center">
        <svg className="w-16 h-16 text-gray-300 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h7.5M8.25 12h7.5m-7.5 5.25h7.5M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg>
        <h3 className="text-xl font-semibold text-gray-700">No Items Yet</h3>
        <p className="text-gray-500 mt-2">Add a new grocery item using the form to see it here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {groceryItems.map((item) => (
        <GroceryItemCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default GroceryList;
