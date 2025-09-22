export interface CoinData {
  id: string;
  name: string;
  symbol: string;
  image: string;
  currentPrice: number;
  marketCapRank: number;
  priceChangePercentage24h: number;
  totalVolume: number;
  marketCap: number;
  priceChange24h: number;
  priceChangePercentage7dInCurrency: number;
  priceChangePercentage30dInCurrency: number;
}

export interface TrendingCoinData {
  id: string;
  name: string;
  symbol: string;
  thumb: string;
  currentPrice: number | null;
  priceChangePercentage24h: number | null;
}
