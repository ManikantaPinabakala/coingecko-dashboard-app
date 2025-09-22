import axios from "axios";

const api = axios.create({
  baseURL: "https://api.coingecko.com/api/v3",
  headers: {
    "Content-Type": "application/json",
    "x-cg-demo-api-key": import.meta.env.VITE_COINGECKO_API_KEY,
  },
});

export const getMarkets = async (page: number = 1, search: string = "") => {
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
    return res.data.filter(
      (coin: any) =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    );
  }
  return res.data;
};

export const getTrending = async () => {
  const res = await api.get("/search/trending");
  return res.data;
};

export const getCoinDetails = async (id: string) => {
  const res = await api.get(`/coins/${id}`);
  return res.data;
};
