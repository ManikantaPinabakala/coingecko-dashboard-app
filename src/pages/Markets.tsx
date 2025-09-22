import { useQuery } from "@tanstack/react-query";
import { getMarkets } from "../api/coingecko";

export default function Markets() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["markets", 1],
    queryFn: () => getMarkets(1),
  });

  if (isLoading) return <p>Loading markets...</p>;
  if (isError) return <p>Failed to fetch market data. Please try again.</p>;

  return (
    <div>
      <h2>Top 50 Coins</h2>
      <ul>
        {data.map((coin: any) => (
          <li key={coin.id}>
            <img src={coin.image} alt={coin.name} className="w-5" /> {coin.name}{" "}
            ($
            {coin.current_price})
          </li>
        ))}
      </ul>
    </div>
  );
}
