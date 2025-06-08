
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LoadSearchResult } from "@/services/loadSearchService";
import { Truck, MapPin, DollarSign, Clock, FileText } from "lucide-react";

interface LoadResultsPresenterProps {
  results: LoadSearchResult[];
  onLoadSelect: (loadId: string) => void;
  showingSearch?: boolean;
}

const LoadResultsPresenter = ({ results, onLoadSelect, showingSearch = false }: LoadResultsPresenterProps) => {
  if (results.length === 0) {
    return (
      <Card className="border-amber-200 bg-amber-50">
        <CardContent className="pt-6">
          <div className="text-center">
            <Truck className="w-8 h-8 mx-auto mb-2 text-amber-600" />
            <p className="text-amber-800">No matching loads found</p>
            <p className="text-sm text-amber-600 mt-1">Try searching with different keywords or load ID</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending_pickup': return 'bg-blue-100 text-blue-800';
      case 'in_transit': return 'bg-green-100 text-green-800';
      case 'delivered': return 'bg-gray-100 text-gray-800';
      case 'delayed': return 'bg-red-100 text-red-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatStatus = (status: string) => {
    return status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  if (results.length === 1 && !showingSearch) {
    // Single result - show detailed view
    const result = results[0];
    const { load } = result;

    return (
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Truck className="w-5 h-5 text-blue-600" />
              Load #{load.id}
            </CardTitle>
            <Badge className={getStatusColor(load.status)}>
              {formatStatus(load.status)}
            </Badge>
          </div>
          <CardDescription>
            Match: {result.matchReason} (Score: {result.relevanceScore})
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-green-600" />
              <span className="font-medium">{load.amount}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-600" />
              <span className="text-sm">{load.pickupTime}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-red-500 mt-0.5" />
              <div className="text-sm">
                <div className="font-medium">{load.origin}</div>
                <div className="text-gray-600">to {load.destination}</div>
                <div className="text-gray-500">{load.distance}</div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-600" />
            <span className="text-sm">Broker: {load.broker}</span>
          </div>

          <Button 
            onClick={() => onLoadSelect(load.id)}
            className="w-full mt-3"
            size="sm"
          >
            View Load Details
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Multiple results - show list view
  return (
    <Card className="border-purple-200 bg-purple-50">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Truck className="w-5 h-5 text-purple-600" />
          Found {results.length} Matching Load{results.length > 1 ? 's' : ''}
        </CardTitle>
        <CardDescription>
          Click on any load to view details or get specific help
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-60 overflow-y-auto">
          {results.map((result) => {
            const { load } = result;
            return (
              <div 
                key={load.id}
                className="p-3 bg-white rounded-lg border border-purple-200 hover:border-purple-300 cursor-pointer transition-colors"
                onClick={() => onLoadSelect(load.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Load #{load.id}</span>
                    <Badge className={getStatusColor(load.status)} variant="secondary">
                      {formatStatus(load.status)}
                    </Badge>
                  </div>
                  <span className="text-sm font-medium text-green-600">{load.amount}</span>
                </div>
                
                <div className="text-sm text-gray-600 mb-1">
                  {load.broker} • {load.origin} → {load.destination}
                </div>
                
                <div className="text-xs text-purple-600">
                  Match: {result.matchReason} ({result.relevanceScore}% relevance)
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default LoadResultsPresenter;
