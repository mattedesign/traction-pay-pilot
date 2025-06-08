
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MapPin, Clock } from "lucide-react";

interface LoadData {
  origin: string;
  destination: string;
  pickupTime: string;
  deliveryTime: string;
  distance: string;
}

interface LocationDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  loadData: LoadData;
}

const LocationDetailsModal = ({ isOpen, onClose, loadData }: LocationDetailsModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Route Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-slate-700">Pickup Location</span>
            </div>
            <p className="text-sm text-slate-700 ml-6">{loadData.origin}</p>
            <div className="flex items-center space-x-2 ml-6 mt-1">
              <Clock className="w-3 h-3 text-slate-500" />
              <p className="text-xs text-slate-500">{loadData.pickupTime}</p>
            </div>
          </div>
          
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <MapPin className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-slate-700">Delivery Location</span>
            </div>
            <p className="text-sm text-slate-700 ml-6">{loadData.destination}</p>
            <div className="flex items-center space-x-2 ml-6 mt-1">
              <Clock className="w-3 h-3 text-slate-500" />
              <p className="text-xs text-slate-500">{loadData.deliveryTime}</p>
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center space-x-2 mb-2">
              <MapPin className="w-4 h-4 text-slate-600" />
              <span className="text-sm font-medium text-slate-700">Total Distance</span>
            </div>
            <p className="text-sm text-slate-700 ml-6">{loadData.distance}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LocationDetailsModal;
