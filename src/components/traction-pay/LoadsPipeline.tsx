
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Truck, DollarSign, Calendar, AlertCircle } from "lucide-react";

interface Load {
  id: string;
  loadNumber: string;
  customer: string;
  amount: number;
  status: 'received' | 'processing' | 'approved' | 'purchased' | 'funded';
  submittedDate: Date;
  dueDate?: Date;
  documents: string[];
  exceptions?: string[];
}

interface LoadsPipelineProps {
  limit?: number;
}

const LoadsPipeline = ({ limit }: LoadsPipelineProps) => {
  const [loads, setLoads] = useState<Load[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    // Mock load data
    const mockLoads: Load[] = [
      {
        id: '1',
        loadNumber: 'L1001',
        customer: 'ABC Logistics',
        amount: 1250.00,
        status: 'funded',
        submittedDate: new Date('2024-01-15'),
        documents: ['rate_confirmation', 'pod', 'bol']
      },
      {
        id: '2',
        loadNumber: 'L1002', 
        customer: 'XYZ Freight',
        amount: 890.50,
        status: 'approved',
        submittedDate: new Date('2024-01-16'),
        dueDate: new Date('2024-01-18'),
        documents: ['rate_confirmation', 'pod']
      },
      {
        id: '3',
        loadNumber: 'L1003',
        customer: 'Global Transport',
        amount: 2150.00,
        status: 'processing',
        submittedDate: new Date('2024-01-17'),
        documents: ['rate_confirmation'],
        exceptions: ['Missing POD signature']
      },
      {
        id: '4',
        loadNumber: 'L1004',
        customer: 'Fast Freight Co',
        amount: 675.25,
        status: 'received',
        submittedDate: new Date('2024-01-18'),
        documents: ['rate_confirmation']
      },
      {
        id: '5',
        loadNumber: 'L1005',
        customer: 'Reliable Shipping',
        amount: 1800.75,
        status: 'purchased',
        submittedDate: new Date('2024-01-19'),
        dueDate: new Date('2024-01-20'),
        documents: ['rate_confirmation', 'pod', 'bol']
      }
    ];
    
    setLoads(mockLoads);
  }, []);

  const filteredLoads = loads
    .filter(load => 
      statusFilter === "all" || load.status === statusFilter
    )
    .filter(load =>
      load.loadNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      load.customer.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(0, limit);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'received':
        return 'bg-gray-100 text-gray-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'approved':
        return 'bg-yellow-100 text-yellow-800';
      case 'purchased':
        return 'bg-purple-100 text-purple-800';
      case 'funded':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'funded':
        return <DollarSign className="w-4 h-4" />;
      case 'purchased':
        return <Truck className="w-4 h-4" />;
      default:
        return <Calendar className="w-4 h-4" />;
    }
  };

  const calculateFactoringFee = (amount: number, rate = 0.02) => {
    return amount * rate;
  };

  const statuses = ['all', 'received', 'processing', 'approved', 'purchased', 'funded'];

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Truck className="w-5 h-5 text-blue-600" />
            <span>Loads Pipeline</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>
        
        {!limit && (
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search loads by number or customer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border rounded-md text-sm"
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Statuses' : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
        )}
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {filteredLoads.map((load) => (
            <div key={load.id} className="border rounded-lg p-4 hover:bg-slate-50 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(load.status)}
                    <span className="font-semibold text-slate-800">
                      {load.loadNumber}
                    </span>
                  </div>
                  <Badge className={getStatusColor(load.status)}>
                    {load.status.toUpperCase()}
                  </Badge>
                  {load.exceptions && load.exceptions.length > 0 && (
                    <Badge className="bg-red-100 text-red-800">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      Exception
                    </Badge>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-slate-800">
                    ${load.amount.toLocaleString()}
                  </p>
                  <p className="text-xs text-slate-500">
                    Fee: ${calculateFactoringFee(load.amount).toFixed(2)}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-600">Customer</p>
                  <p className="font-medium">{load.customer}</p>
                </div>
                <div>
                  <p className="text-slate-600">Submitted</p>
                  <p className="font-medium">{load.submittedDate.toLocaleDateString()}</p>
                </div>
              </div>
              
              {load.dueDate && (
                <div className="mt-2 text-sm">
                  <p className="text-slate-600">Expected Funding</p>
                  <p className="font-medium text-green-600">{load.dueDate.toLocaleDateString()}</p>
                </div>
              )}
              
              {load.exceptions && load.exceptions.length > 0 && (
                <div className="mt-3 p-2 bg-red-50 rounded border border-red-200">
                  <p className="text-sm text-red-800 font-medium">Exceptions:</p>
                  <ul className="text-sm text-red-700 mt-1">
                    {load.exceptions.map((exception, index) => (
                      <li key={index}>• {exception}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="mt-3 flex items-center justify-between">
                <div className="flex space-x-1">
                  {load.documents.map((doc, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {doc.replace('_', ' ')}
                    </Badge>
                  ))}
                </div>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            </div>
          ))}
          
          {filteredLoads.length === 0 && (
            <div className="text-center py-8 text-slate-500">
              <Truck className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No loads found matching your criteria</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LoadsPipeline;
