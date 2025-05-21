interface IMarketData {
  price_usd?: number;
  ohlcv_last_1_hour: {
    high?: number;
    low?: number;
  };
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
