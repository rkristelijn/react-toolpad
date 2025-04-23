// React imports
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

// Types
export type SortDirection = 'asc' | 'desc';

export interface ListViewContextType<SortFieldType, ItemType> {
  selectedItemId: string | null;
  onSelectItem: (item: ItemType) => void;
  sortField: SortFieldType | null;
  sortDirection: SortDirection;
  onSortFieldChange: (field: SortFieldType) => void;
  onSortDirectionChange: (direction: SortDirection) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface ListViewProviderProps<SortFieldType, ItemType> {
  children: React.ReactNode;
  onSelectItem?: (item: ItemType) => void;
  selectedItemId?: string | null;
}

// Create the context with a default value
const ListViewContext = createContext<ListViewContextType<unknown, unknown>>({
  selectedItemId: null,
  onSelectItem: () => {},
  sortField: null,
  sortDirection: 'asc',
  onSortFieldChange: () => {},
  onSortDirectionChange: () => {},
});

export function ListViewProvider<SortFieldType, ItemType>({
  children,
  onSelectItem,
  selectedItemId: initialSelectedItemId,
}: ListViewProviderProps<SortFieldType, ItemType>) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedItemId, setSelectedItemId] = useState<string | null>(initialSelectedItemId || null);
  const [sortField, setSortField] = useState<SortFieldType | null>((searchParams.get('sortField') as SortFieldType) || null);
  const [sortDirection, setSortDirection] = useState<SortDirection>((searchParams.get('sortDirection') as SortDirection) || 'asc');

  // Sync sort state with URL parameters
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (sortField) {
      params.set('sortField', String(sortField));
      params.set('sortDirection', sortDirection);
    } else {
      params.delete('sortField');
      params.delete('sortDirection');
    }
    setSearchParams(params);
  }, [sortField, sortDirection, setSearchParams, searchParams]);

  const handleSelectItem = (item: ItemType) => {
    const itemId = (item as { id: string }).id;
    setSelectedItemId(itemId);

    // Update URL parameters
    const params = new URLSearchParams(searchParams);
    params.set('selectedItem', itemId);
    setSearchParams(params);

    onSelectItem?.(item);
  };

  const handleSortFieldChange = (field: SortFieldType) => {
    setSortField(field);
    // Clear selection when sort changes
    setSelectedItemId(null);
    const params = new URLSearchParams(searchParams);
    params.delete('selectedItem');
    setSearchParams(params);
  };

  const handleSortDirectionChange = (direction: SortDirection) => {
    setSortDirection(direction);
    // Clear selection when sort direction changes
    setSelectedItemId(null);
    const params = new URLSearchParams(searchParams);
    params.delete('selectedItem');
    setSearchParams(params);
  };

  const contextValue: ListViewContextType<SortFieldType, ItemType> = {
    selectedItemId,
    onSelectItem: handleSelectItem,
    sortField,
    sortDirection,
    onSortFieldChange: handleSortFieldChange,
    onSortDirectionChange: handleSortDirectionChange,
  };

  return <ListViewContext.Provider value={contextValue as ListViewContextType<unknown, unknown>}>{children}</ListViewContext.Provider>;
}

// Custom hook to use the ListViewContext
export function useListView<SortFieldType, ItemType>() {
  const context = useContext(ListViewContext);
  if (!context) {
    throw new Error('useListView must be used within a ListViewProvider');
  }
  return context as ListViewContextType<SortFieldType, ItemType>;
}
