import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
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
      <DialogContent className="sm:max-w-[425px]">
        {selectedCoin && (
          <div className="p-4">
            <div className="flex items-center gap-4 mb-4 border-b pb-4">
              <img
                src={selectedCoin.image}
                alt={selectedCoin.name}
                className="w-12 h-12"
              />
              <div>
                <DialogTitle className="text-2xl font-bold">
                  {selectedCoin.name}
                </DialogTitle>
                <p className="text-sm text-gray-500">
                  {selectedCoin.symbol.toUpperCase()}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <p className="text-gray-500 text-sm font-medium">Price</p>
                <p className="text-lg font-semibold">
                  ${selectedCoin.current_price.toLocaleString()}
                </p>
              </div>

              <div className="flex flex-col">
                <p className="text-gray-500 text-sm font-medium">24h Change</p>
                <p
                  className={`text-lg font-semibold ${
                    selectedCoin.price_change_percentage_24h >= 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {formatNumber(selectedCoin.price_change_percentage_24h)}%
                </p>
              </div>

              <div className="flex flex-col">
                <p className="text-gray-500 text-sm font-medium">Market Cap</p>
                <p className="text-lg font-semibold">
                  {formatCurrency(selectedCoin.market_cap)}
                </p>
              </div>

              <div className="flex flex-col">
                <p className="text-gray-500 text-sm font-medium">24h Volume</p>
                <p className="text-lg font-semibold">
                  {formatCurrency(selectedCoin.total_volume)}
                </p>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
