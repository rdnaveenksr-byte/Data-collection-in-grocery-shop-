
import { useState, useCallback } from 'react';
import type { GroceryItem } from '../types';

export const useGroceryData = () => {
  const [groceryItems, setGroceryItems] = useState<GroceryItem[]>([]);

  const addGroceryItem = useCallback((item: Omit<GroceryItem, 'id'>) => {
    const newItem: GroceryItem = {
      ...item,
      id: new Date().toISOString() + Math.random(),
    };
    setGroceryItems((prevItems) => [newItem, ...prevItems]);
  }, []);

  return { groceryItems, addGroceryItem };
};
