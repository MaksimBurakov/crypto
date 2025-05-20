import type { IAsset } from './apiTypes';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    'x-messari-api-key': import.meta.env.VITE_MESSARI_API_KEY,
  },
};

export const fetchAssets = async (page: string) => {
  const res = await fetch(
    `https://data.messari.io/api/v1/assets?limit=10&page=${page}`,
    options
  );
  if (!res.ok) throw new Error('Error');
  const json = await res.json();
  return json.data;
};

export const fetchAssetSymbols = async () => {
  const res = await fetch(`https://data.messari.io/api/v1/assets`, options);
  if (!res.ok) throw new Error('Error');

  const json = await res.json();

  const symbols = json.data.map((asset: IAsset) => asset.symbol);

  return symbols;
};
