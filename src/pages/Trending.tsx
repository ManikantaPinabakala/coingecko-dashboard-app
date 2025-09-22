import { useQuery } from "@tanstack/react-query";
import { getTrending } from "../api/coingecko";

export default function Trending() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["trending"],
    queryFn: getTrending,
  });

  if (isLoading) return <p>Loading trending...</p>;
  if (isError) return <p>Failed to fetch trending data.</p>;

  return (
    <div>
      <h2>Trending Coins</h2>
      <ul>
        {data.coins.map((item: any) => (
          <li key={item.item.id}>
            {item.item.name} ({item.item.symbol})
          </li>
        ))}
      </ul>
    </div>
  );
}
