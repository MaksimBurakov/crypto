interface IMarketData {
  price_usd?: number;
}

interface IMetrics {
  market_data?: IMarketData;
}

export interface IAsset {
  id: string;
  name: string;
  symbol: string;
  metrics?: IMetrics;
}
