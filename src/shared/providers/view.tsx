import { createContext, useContext, useState } from 'react';

import type { ReactNode } from 'react';

interface ViewState {
  sortField?: string;
  sortDirection?: 'asc' | 'desc';
  page: number;
  pageSize: number;
}

interface ViewContextType {
  state: ViewState;
  setSortField: (field: string | undefined) => void;
  setSortDirection: (direction: 'asc' | 'desc' | undefined) => void;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  resetSort: () => void;
}

const ViewContext = createContext<ViewContextType | undefined>(undefined);

interface ViewProviderProps {
  children: ReactNode;
  initialState?: Partial<ViewState>;
}

export function ViewProvider({ children, initialState = {} }: ViewProviderProps) {
  const [state, setState] = useState<ViewState>({
    page: 0,
    pageSize: 5,
    ...initialState,
  });

  const setSortField = (field: string | undefined) => setState(prev => ({ ...prev, sortField: field }));

  const setSortDirection = (direction: 'asc' | 'desc' | undefined) => setState(prev => ({ ...prev, sortDirection: direction }));

  const setPage = (page: number) => setState(prev => ({ ...prev, page }));

  const setPageSize = (pageSize: number) => setState(prev => ({ ...prev, pageSize }));

  const resetSort = () => setState(prev => ({ ...prev, sortField: undefined, sortDirection: undefined }));

  return (
    <ViewContext.Provider
      value={{
        state,
        setSortField,
        setSortDirection,
        setPage,
        setPageSize,
        resetSort,
      }}
    >
      {children}
    </ViewContext.Provider>
  );
}

export function useView() {
  const context = useContext(ViewContext);
  if (!context) {
    throw new Error('useView must be used within a ViewProvider');
  }
  return context;
}

export default ViewProvider;
