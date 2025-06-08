
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LoadSearchResult } from "@/services/loadSearchService";
import { MapPin, Truck, DollarSign } from "lucide-react";

interface SearchResultsDisplayProps {
  results: LoadSearchResult[];
  onLoadSelect: (loadId: string) => void;
}

const SearchResultsDisplay = ({ results, onLoadSelect }: SearchResultsDisplayProps) => {
  if (results.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-slate-500">No loads found matching your search.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Truck className="w-5 h-5 mr-2" />
          Search Results ({results.length} loads found)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {results.map((result) => (
          <div
            key={result.load.id}
            className="p-4 border rounded-lg hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Badge variant="outline">Load #{result.load.id}</Badge>
                <Badge variant="secondary">{result.load.status}</Badge>
                <span className="text-sm text-slate-600">
                  {result.relevanceScore}% match
                </span>
              </div>
              <div className="flex items-center text-green-600 font-semibold">
                <DollarSign className="w-4 h-4 mr-1" />
                {result.load.amount}
              </div>
            </div>

            <div className="flex items-center space-x-4 mb-2">
              <div className="flex items-center space-x-1 text-sm text-slate-600">
                <MapPin className="w-4 h-4" />
                <span>{result.load.origin} → {result.load.destination}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-slate-600">
                <p><strong>Broker:</strong> {result.load.broker}</p>
                <p><strong>Match:</strong> {result.matchReason}</p>
              </div>
              <Button
                size="sm"
                onClick={() => onLoadSelect(result.load.id)}
              >
                View Details
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default SearchResultsDisplay;
