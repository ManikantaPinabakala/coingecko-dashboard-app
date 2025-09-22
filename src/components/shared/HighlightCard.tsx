import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatNumber } from "@/utils/helperFunctions";

interface HighlightCardProps {
  title: string;
  data: any[];
  isLoading: boolean;
}

export default function HighlightCard({
  title,
  data,
  isLoading,
}: HighlightCardProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Loading...</p>
        </CardContent>
      </Card>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>No data available.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="min-w-[300px]">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between font-medium text-sm text-gray-500 mb-2 border-b pb-1">
          <div className="w-1/2 text-left pl-2">Coin</div>
          <div className="w-1/4 text-right">Price</div>
          <div className="w-1/4 text-right">24h %</div>
        </div>

        <ul className="space-y-2">
          {data.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <div className="flex items-center gap-2 w-1/2">
                <img
                  src={item.image || item.thumb}
                  alt={item.name}
                  className="w-6 h-6 rounded-full"
                />
                <span className="font-medium text-sm truncate">
                  {item.name}
                </span>
              </div>

              <div className="flex w-1/4 justify-end text-sm font-semibold">
                {item.current_price
                  ? `$${item.current_price.toLocaleString()}`
                  : "N/A"}
              </div>

              <div
                className={`flex w-1/4 justify-end text-sm font-semibold ${
                  item.price_change_percentage_24h > 0
                    ? "text-green-600"
                    : item.price_change_percentage_24h < 0
                    ? "text-red-600"
                    : "text-gray-500"
                }`}
              >
                {item.price_change_percentage_24h
                  ? `${formatNumber(item.price_change_percentage_24h)}%`
                  : "N/A"}
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
