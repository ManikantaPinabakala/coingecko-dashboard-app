import { useQuery } from "@tanstack/react-query";
import { getTrending, getMarkets } from "../api/coingecko";
import HighlightCard from "@/components/shared/HighlightCard";
import { AppLoader } from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";

export default function Trending() {
  const {
    data: trendingData,
    isLoading: trendingDataLoading,
    isError: trendingDataError,
    error: trendingDataErrorDetails,
    refetch: refetchTrendingData,
  } = useQuery({
    queryKey: ["trending"],
    queryFn: getTrending,
    staleTime: 5 * 60 * 1000,
  });

  const {
    data: marketData,
    isLoading: marketDataLoading,
    isError: marketDataError,
    error: marketDataErrorDetails,
    refetch: refetchMarketData,
  } = useQuery({
    queryKey: ["markets"],
    queryFn: () => getMarkets(),
    staleTime: 5 * 60 * 1000,
  });

  if (trendingDataLoading || marketDataLoading) {
    return (
      <div className="flex flex-col items-center justify-center mt-20 gap-4">
        <AppLoader />
        <p>Loading highlights...</p>
      </div>
    );
  }

  if (trendingDataError || marketDataError) {
    if (trendingDataError) {
      console.log("Error fetching trending data:", trendingDataErrorDetails);
    }
    if (marketDataError) {
      console.log("Error fetching market data:", marketDataErrorDetails);
    }

    return (
      <div className="flex flex-col items-center justify-center mt-20 gap-4">
        <p className="text-lg text-red-500">
          Failed to fetch data for highlights. Please try again.
        </p>
        <div className="flex gap-4">
          {trendingDataError && (
            <Button onClick={() => refetchTrendingData()}>
              Retry Trending
            </Button>
          )}
          {marketDataError && (
            <Button onClick={() => refetchMarketData()}>Retry Markets</Button>
          )}
        </div>
      </div>
    );
  }

  const topGainers = marketData
    ?.sort(
      (a: any, b: any) =>
        b.price_change_percentage_24h - a.price_change_percentage_24h
    )
    .slice(0, 5);
  const topLosers = marketData
    ?.sort(
      (a: any, b: any) =>
        a.price_change_percentage_24h - b.price_change_percentage_24h
    )
    .slice(0, 5);
  const highestVolume = marketData
    ?.sort((a: any, b: any) => b.total_volume - a.total_volume)
    .slice(0, 5);
  const top7dPerformers = marketData
    ?.sort(
      (a: any, b: any) =>
        b.price_change_percentage_7d_in_currency -
        a.price_change_percentage_7d_in_currency
    )
    .slice(0, 5);
  const top30dPerformers = marketData
    ?.sort(
      (a: any, b: any) =>
        b.price_change_percentage_30d_in_currency -
        a.price_change_percentage_30d_in_currency
    )
    .slice(0, 5);
  const enrichedTrendingData = trendingData?.coins
    .slice(0, 5)
    .map((trendingCoin: any) => ({
      id: trendingCoin.item.id,
      name: trendingCoin.item.name,
      image: trendingCoin.item.thumb,
      current_price: trendingCoin.item.data.price,
      price_change_percentage_24h:
        trendingCoin.item.data.price_change_percentage_24h.usd,
    }));

  return (
    <div>
      <h2 className="text-xl font-bold mt-6 mb-4">Highlights</h2>
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <HighlightCard
          title="Trending Coins"
          data={enrichedTrendingData}
          isLoading={trendingDataLoading}
        />
        <HighlightCard
          title="Top Gainers (24h)"
          data={topGainers}
          isLoading={marketDataLoading}
        />
        <HighlightCard
          title="Top Losers (24h)"
          data={topLosers}
          isLoading={marketDataLoading}
        />
        <HighlightCard
          title="Highest Volume (24h)"
          data={highestVolume}
          isLoading={marketDataLoading}
        />
        <HighlightCard
          title="Top Performers (7d)"
          data={top7dPerformers}
          isLoading={marketDataLoading}
        />
        <HighlightCard
          title="Top Performers (30d)"
          data={top30dPerformers}
          isLoading={marketDataLoading}
        />
      </div>
    </div>
  );
}
