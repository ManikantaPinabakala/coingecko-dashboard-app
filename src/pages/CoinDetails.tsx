import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCoinDetails } from "../api/coingecko";

export default function CoinDetails() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["coin", id],
    queryFn: () => getCoinDetails(id!),
    enabled: !!id,
  });

  if (isLoading) return <p>Loading coin details...</p>;
  if (isError) return <p>Failed to fetch coin details.</p>;

  return (
    <div>
      <h2>
        {data.name} ({data.symbol.toUpperCase()})
      </h2>
      <img src={data.image.small} alt={data.name} />
      <p>Current Price: ${data.market_data.current_price.usd}</p>
      <p>Market Cap: ${data.market_data.market_cap.usd}</p>
    </div>
  );
}
