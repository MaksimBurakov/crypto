import { useMemo } from 'react';
import type { IAsset } from '../types/assetTypes';

export const useSortedAssets = (
  assets: IAsset[],
  sortBy: 'name' | 'price',
  sortOrder: 'asc' | 'desc'
) => {
  return useMemo(() => {
    return [...assets].sort((a, b) => {
      if (sortBy === 'name') {
        return sortOrder === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
      const priceA = a.metrics?.market_data?.price_usd ?? 0;
      const priceB = b.metrics?.market_data?.price_usd ?? 0;
      return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
    });
  }, [assets, sortBy, sortOrder]);
};
