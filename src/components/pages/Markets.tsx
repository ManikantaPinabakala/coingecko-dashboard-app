import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMarkets } from "../../api/coingecko";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatNumber } from "@/helpers/helperFunctions";
import { useDebounce } from "@/hooks/useDebounce";
import CoinDetailDialog from "@/components/shared/CoinDetailDialog";
import { ArrowDownNarrowWide, ArrowDownWideNarrow } from "lucide-react";
import { AppLoader } from "@/components/shared/Loader";
import { type CoinData } from "@/types/typeDefinitions";

type SortKey =
  | "currentPrice"
  | "priceChangePercentage24h"
  | "marketCap"
  | "totalVolume"
  | null;
type SortDirection = "asc" | "desc" | null;

export default function Markets() {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [selectedCoin, setSelectedCoin] = useState<CoinData | null>(null);
  const [sortColumn, setSortColumn] = useState<SortKey>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading, isError, error, refetch } = useQuery<CoinData[]>({
    queryKey: ["markets", page, debouncedSearch],
    queryFn: () => getMarkets(page, debouncedSearch),
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading && debouncedSearch) {
    return (
      <div className="flex flex-col items-center justify-center mt-20 gap-4">
        <AppLoader />
        <p>Searching...</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center mt-20 gap-4">
        <AppLoader />
        <p>Loading market data...</p>
      </div>
    );
  }

  if (isError) {
    console.log("Error fetching market data:", error);

    return (
      <div className="flex flex-col items-center justify-center mt-20 gap-4">
        <p className="text-lg text-red-500">
          Failed to fetch market data. Please try again.
        </p>
        <Button onClick={() => refetch()}>Retry</Button>
      </div>
    );
  }

  const handleSort = (column: SortKey) => {
    if (sortColumn === column) {
      setSortDirection(
        sortDirection === "asc"
          ? "desc"
          : sortDirection === "desc"
          ? null
          : "asc"
      );
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedData = data
    ? [...data].sort((a, b) => {
        if (!sortColumn || !sortDirection) return 0;

        const valueA = a[sortColumn];
        const valueB = b[sortColumn];

        if (valueA < valueB) return sortDirection === "asc" ? -1 : 1;
        if (valueA > valueB) return sortDirection === "asc" ? 1 : -1;
        return 0;
      })
    : [];

  const renderTableHeader = () => {
    return (
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Name</TableHead>
          <TableHead
            onClick={() => handleSort("currentPrice")}
            className="cursor-pointer"
          >
            <div className="flex items-center gap-1">
              Price
              {sortColumn === "currentPrice" &&
                (sortDirection === "asc" ? (
                  <ArrowDownNarrowWide size={14} />
                ) : (
                  <ArrowDownWideNarrow size={14} />
                ))}
            </div>
          </TableHead>
          <TableHead
            onClick={() => handleSort("priceChangePercentage24h")}
            className="cursor-pointer"
          >
            <div className="flex items-center gap-1">
              24h Change %
              {sortColumn === "priceChangePercentage24h" &&
                (sortDirection === "asc" ? (
                  <ArrowDownNarrowWide size={14} />
                ) : (
                  <ArrowDownWideNarrow size={14} />
                ))}
            </div>
          </TableHead>
          <TableHead
            onClick={() => handleSort("marketCap")}
            className="cursor-pointer"
          >
            <div className="flex items-center gap-1">
              Market Cap
              {sortColumn === "marketCap" &&
                (sortDirection === "asc" ? (
                  <ArrowDownNarrowWide size={14} />
                ) : (
                  <ArrowDownWideNarrow size={14} />
                ))}
            </div>
          </TableHead>
          <TableHead
            onClick={() => handleSort("totalVolume")}
            className="cursor-pointer"
          >
            <div className="flex items-center gap-1">
              24h Volume
              {sortColumn === "totalVolume" &&
                (sortDirection === "asc" ? (
                  <ArrowDownNarrowWide size={14} />
                ) : (
                  <ArrowDownWideNarrow size={14} />
                ))}
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Coin Market Data</h2>

      {/* Search */}
      <Input
        placeholder="Search by name or symbol..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 max-w-sm"
      />

      {/* Table */}
      <Table>
        {renderTableHeader()}

        <TableBody>
          {sortedData.length > 0 ? (
            sortedData.map((coin: CoinData) => (
              <TableRow
                key={coin.id}
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => setSelectedCoin(coin)}
              >
                <TableCell align="left">{coin.marketCapRank}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <img src={coin.image} alt={coin.name} className="w-5 h-5" />
                    {coin.name} ({coin.symbol.toUpperCase()})
                  </div>
                </TableCell>
                <TableCell align="left">
                  ${coin.currentPrice.toLocaleString()}
                </TableCell>
                <TableCell
                  align="left"
                  className={
                    coin.priceChangePercentage24h >= 0
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {formatNumber(coin.priceChange24h)} (
                  {formatNumber(coin.priceChangePercentage24h)}%)
                </TableCell>
                <TableCell align="left">
                  {formatCurrency(coin.marketCap)}
                </TableCell>
                <TableCell align="left">
                  {formatCurrency(coin.totalVolume)}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center py-4 font-bold text-xl"
              >
                No coins found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-4">
        <Button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="cursor-pointer"
        >
          Previous
        </Button>
        <span>Page {page}</span>
        <Button
          onClick={() => setPage((p) => p + 1)}
          className="cursor-pointer"
        >
          Next
        </Button>
      </div>

      {/* Coin Detail Dialog */}
      <CoinDetailDialog
        selectedCoin={selectedCoin}
        setSelectedCoin={setSelectedCoin}
      />
    </div>
  );
}
