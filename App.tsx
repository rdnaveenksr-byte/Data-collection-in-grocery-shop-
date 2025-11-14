
import React from 'react';
import Header from './components/Header';
import GroceryForm from './components/GroceryForm';
import GroceryList from './components/GroceryList';
import { useGroceryData } from './hooks/useGroceryData';
import type { GroceryItem } from './types';

function App() {
  const { groceryItems, addGroceryItem } = useGroceryData();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header />
      <main className="container mx-auto p-4 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 xl:col-span-4">
            <GroceryForm addGroceryItem={addGroceryItem} />
          </div>
          <div className="lg:col-span-7 xl:col-span-8">
            <GroceryList groceryItems={groceryItems} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
