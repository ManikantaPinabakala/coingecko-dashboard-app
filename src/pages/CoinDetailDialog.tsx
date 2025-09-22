import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatCurrency, formatNumber } from "@/utils/helperFunctions";

interface CoinDetailDialogProps {
  selectedCoin: any;
  setSelectedCoin: (coin: any | null) => void;
}

export default function CoinDetailDialog({
  selectedCoin,
  setSelectedCoin,
}: CoinDetailDialogProps) {
  return (
    <Dialog open={!!selectedCoin} onOpenChange={() => setSelectedCoin(null)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{selectedCoin?.name}</DialogTitle>
        </DialogHeader>
        {selectedCoin && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src={selectedCoin.image}
                alt={selectedCoin.name}
                className="w-10 h-10"
              />
              <p className="text-xl font-semibold">
                {selectedCoin.name} ({selectedCoin.symbol.toUpperCase()})
              </p>
            </div>
            <p>
              <span className="font-medium">Current Price:</span> $
              {selectedCoin.current_price.toLocaleString()}
            </p>
            <p>
              <span className="font-medium">Market Cap:</span>{" "}
              {formatCurrency(selectedCoin.market_cap)}
            </p>
            <p>
              <span className="font-medium">24h Volume:</span>{" "}
              {formatCurrency(selectedCoin.total_volume)}
            </p>
            <p>
              <span className="font-medium">24h Change:</span>{" "}
              <span
                className={
                  selectedCoin.price_change_percentage_24h >= 0
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {formatNumber(selectedCoin.price_change_percentage_24h)}%
              </span>
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
