
import React, { createContext, useContext, useState, useEffect } from 'react';
import { LoadDataService, LoadDataContext } from '@/services/loadDataService';

interface LoadContextProviderProps {
  children: React.ReactNode;
  loadId?: string;
}

interface LoadContextValue {
  loadContext: LoadDataContext | null;
  isLoading: boolean;
  refreshContext: () => void;
}

const LoadContext = createContext<LoadContextValue | null>(null);

export const LoadContextProvider = ({ children, loadId }: LoadContextProviderProps) => {
  const [loadContext, setLoadContext] = useState<LoadDataContext | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const refreshContext = async () => {
    if (!loadId) {
      setLoadContext(null);
      return;
    }

    setIsLoading(true);
    try {
      const context = await LoadDataService.getLoadContext(loadId);
      setLoadContext(context);
    } catch (error) {
      console.error('Error refreshing load context:', error);
      setLoadContext(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshContext();
  }, [loadId]);

  return (
    <LoadContext.Provider value={{ loadContext, isLoading, refreshContext }}>
      {children}
    </LoadContext.Provider>
  );
};

export const useLoadContext = () => {
  const context = useContext(LoadContext);
  if (!context) {
    throw new Error('useLoadContext must be used within a LoadContextProvider');
  }
  return context;
};
