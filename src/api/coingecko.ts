import axios from "axios";
import {
  convertMarketDataToCamelCase,
  convertTrendingDataToCamelCase,
} from "@/helpers/helperFunctions";

const api = axios.create({
  baseURL: "https://api.coingecko.com/api/v3",
  headers: {
    "Content-Type": "application/json",
    "x-cg-demo-api-key": import.meta.env.VITE_COINGECKO_API_KEY,
  },
});

export const getMarkets = async (page: number = 1, search: string = "") => {
  try {
    const res = await api.get("/coins/markets", {
      params: {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: 20,
        page,
        price_change_percentage: "24h,7d,30d",
        sparkline: false,
      },
    });

    if (search) {
      return convertMarketDataToCamelCase(
        res.data.filter(
          (coin: any) =>
            coin.name.toLowerCase().includes(search.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(search.toLowerCase())
        )
      );
    }

    return convertMarketDataToCamelCase(res.data);
  } catch (error) {
    console.error("Error fetching market data:", error);
    throw error;
  }
};

export const getTrending = async () => {
  try {
    const res = await api.get("/search/trending");

    return convertTrendingDataToCamelCase(res.data);
  } catch (error) {
    console.error("Error fetching trending data:", error);
    throw error;
  }
};

export const getCoinDetails = async (id: string) => {
  const res = await api.get(`/coins/${id}`);
  return res.data;
};
