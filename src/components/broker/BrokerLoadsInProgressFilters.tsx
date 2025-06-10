
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Filter, Download } from "lucide-react";

interface BrokerLoadsInProgressFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  onExport: () => void;
}

const BrokerLoadsInProgressFilters = ({
  searchTerm,
  onSearchChange,
  selectedStatus,
  onStatusChange,
  onExport
}: BrokerLoadsInProgressFiltersProps) => {
  const statusOptions = [
    { value: "all", label: "All Loads", count: 23 },
    { value: "in_transit", label: "In Transit", count: 15 },
    { value: "delivery_scheduled", label: "Delivery Scheduled", count: 6 },
    { value: "delayed", label: "Delayed", count: 2 }
  ];

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Filter className="w-5 h-5" />
            <span>Filters & Search</span>
          </CardTitle>
          <Button onClick={onExport} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input
            placeholder="Search by load ID, carrier, origin, destination..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Status Filters */}
        <div className="flex flex-wrap gap-2">
          {statusOptions.map((option) => (
            <Button
              key={option.value}
              variant={selectedStatus === option.value ? "default" : "outline"}
              size="sm"
              onClick={() => onStatusChange(option.value)}
              className="space-x-2"
            >
              <span>{option.label}</span>
              <Badge variant="secondary" className="ml-1">
                {option.count}
              </Badge>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BrokerLoadsInProgressFilters;
