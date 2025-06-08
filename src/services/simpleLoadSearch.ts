
import { LoadSearchResult } from "./loadSearchService";

// Simple mock load data
const mockLoads = [
  {
    id: "L001",
    broker: "FreightForward Inc",
    origin: "Chicago, IL",
    destination: "Dallas, TX",
    status: "Available",
    amount: "$2,450"
  },
  {
    id: "L002", 
    broker: "TransLogistics Co",
    origin: "Los Angeles, CA",
    destination: "Phoenix, AZ", 
    status: "In Transit",
    amount: "$1,850"
  },
  {
    id: "L003",
    broker: "CargoLink LLC",
    origin: "Miami, FL",
    destination: "Atlanta, GA",
    status: "Delivered",
    amount: "$1,650"
  },
  {
    id: "L004",
    broker: "FreightForward Inc", 
    origin: "Denver, CO",
    destination: "Salt Lake City, UT",
    status: "Available",
    amount: "$1,200"
  },
  {
    id: "L005",
    broker: "RoadMaster Freight",
    origin: "Seattle, WA", 
    destination: "Portland, OR",
    status: "Pending",
    amount: "$950"
  }
];

export const simpleLoadSearch = (query: string): LoadSearchResult[] => {
  if (!query.trim()) return [];
  
  const searchTerm = query.toLowerCase();
  
  const results = mockLoads
    .filter(load => 
      load.id.toLowerCase().includes(searchTerm) ||
      load.broker.toLowerCase().includes(searchTerm) ||
      load.origin.toLowerCase().includes(searchTerm) ||
      load.destination.toLowerCase().includes(searchTerm) ||
      load.status.toLowerCase().includes(searchTerm)
    )
    .map(load => ({
      load,
      relevanceScore: calculateRelevance(load, searchTerm),
      matchedFields: getMatchedFields(load, searchTerm),
      matchReason: getMatchReason(load, searchTerm)
    }))
    .sort((a, b) => b.relevanceScore - a.relevanceScore);
    
  return results;
};

const calculateRelevance = (load: any, searchTerm: string): number => {
  let score = 0;
  
  if (load.id.toLowerCase().includes(searchTerm)) score += 100;
  if (load.broker.toLowerCase().includes(searchTerm)) score += 80;
  if (load.status.toLowerCase().includes(searchTerm)) score += 60;
  if (load.origin.toLowerCase().includes(searchTerm)) score += 40;
  if (load.destination.toLowerCase().includes(searchTerm)) score += 40;
  
  return Math.min(score, 100);
};

const getMatchedFields = (load: any, searchTerm: string): string[] => {
  const fields: string[] = [];
  
  if (load.id.toLowerCase().includes(searchTerm)) fields.push('loadId');
  if (load.broker.toLowerCase().includes(searchTerm)) fields.push('broker');
  if (load.status.toLowerCase().includes(searchTerm)) fields.push('status');
  if (load.origin.toLowerCase().includes(searchTerm)) fields.push('origin');
  if (load.destination.toLowerCase().includes(searchTerm)) fields.push('destination');
  
  return fields;
};

const getMatchReason = (load: any, searchTerm: string): string => {
  if (load.id.toLowerCase().includes(searchTerm)) return "Load ID match";
  if (load.broker.toLowerCase().includes(searchTerm)) return "Broker name match";
  if (load.status.toLowerCase().includes(searchTerm)) return "Status match";
  if (load.origin.toLowerCase().includes(searchTerm)) return "Origin match";
  if (load.destination.toLowerCase().includes(searchTerm)) return "Destination match";
  return "General match";
};
