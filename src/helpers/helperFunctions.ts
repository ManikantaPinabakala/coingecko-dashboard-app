export const formatNumber = (num: number | null | undefined, digits = 2) => {
  if (num === null || num === undefined) return "N/A";
  return num.toFixed(digits);
};

export const formatCurrency = (num: number | null | undefined) => {
  if (num === null || num === undefined) return "N/A";
  return `$${num.toLocaleString()}`;
};

export function convertMarketDataToCamelCase(data: any[]): any[] {
  return data.map((coin) => ({
    id: coin.id,
    name: coin.name,
    symbol: coin.symbol,
    image: coin.image,
    currentPrice: coin.current_price,
    marketCapRank: coin.market_cap_rank,
    priceChangePercentage24h: coin.price_change_percentage_24h,
    totalVolume: coin.total_volume,
    marketCap: coin.market_cap,
    priceChange24h: coin.price_change_24h,
  }));
}

export function convertTrendingDataToCamelCase(data: any): any[] {
  return data.coins.slice(0, 5).map((item: any) => ({
    id: item.item.id,
    name: item.item.name,
    symbol: item.item.symbol,
    thumb: item.item.thumb,
    currentPrice: item.item.data?.price,
    priceChangePercentage24h: item.item.data?.price_change_percentage_24h?.usd,
  }));
}
