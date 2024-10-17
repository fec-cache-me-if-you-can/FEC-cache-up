// hooks/useOutfitData.js
import React, { useState, useEffect, useCallback } from 'react';
import {
  fetchOutfitProductIds,
  addProductByIdToOutfit,
  removeProductByIdFromOutfit,
} from '../../api';

export const useOutfitData = () => {
  const [outfitIds, setOutfitIds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOutfitIds = async () => {
    setIsLoading(true);
    try {
      const ids = await fetchOutfitProductIds();
      setOutfitIds(ids);
      setError(null);
    } catch (error) {
      console.error('Error fetching outfit:', error);
      setError('Failed to load outfit. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOutfitIds();
  }, []);

  const addProduct = useCallback(async (productId) => {
    console.log('Hook: addProduct called with:', productId);
    try {
      const updatedOutfit = await addProductByIdToOutfit(productId);
      console.log('Hook: Received updated outfit:', updatedOutfit);
      setOutfitIds((prev) => updatedOutfit.map((product) => product.id));
    } catch (error) {
      console.error('Hook: Error adding product to outfit:', error);
    }
  }, []);

  const removeProduct = useCallback(async (productId) => {
    try {
      const updatedOutfit = await removeProductByIdFromOutfit(productId);
      setOutfitIds((prev) => updatedOutfit.map((product) => product.id));
    } catch (error) {
      console.error('Error removing product from outfit:', error);
    }
  }, []);

  console.log('useOutfitData hook returning:', {
    outfitIds,
    isLoading,
    error,
    addProduct,
    removeProduct,
  });

  return {
    outfitIds,
    isLoading,
    error,
    addProduct,
    removeProduct,
  };
};
