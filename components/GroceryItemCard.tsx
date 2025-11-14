
import React from 'react';
import type { GroceryItem } from '../types';

interface GroceryItemCardProps {
  item: GroceryItem;
}

const GroceryItemCard: React.FC<GroceryItemCardProps> = ({ item }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-xl duration-300 flex">
      <div className="w-1/3 md:w-1/4 flex-shrink-0">
        <img
          src={item.imageUrl || `https://picsum.photos/seed/${item.id}/400/400`}
          alt={item.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-4 md:p-6 flex-1 flex flex-col justify-between">
        <div>
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
              <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">{item.category}</span>
            </div>
            <p className="text-gray-600 mt-2 text-sm">{item.description || 'No description provided.'}</p>
        </div>
        <div className="mt-4 flex justify-between items-center text-sm">
            <p className="text-lg font-semibold text-emerald-600">${item.price.toFixed(2)}</p>
            <p className="text-gray-500">
                <span className="font-medium">Quantity:</span> {item.quantity}
            </p>
        </div>
      </div>
    </div>
  );
};

export default GroceryItemCard;
