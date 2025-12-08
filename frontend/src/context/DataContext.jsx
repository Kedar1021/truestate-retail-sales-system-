import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    search: '',
    regions: [],
    gender: [],
    categories: [],
    tags: [],
    paymentMethods: [],
    ageMin: '',
    ageMax: '',
    dateFrom: '',
    dateTo: ''
  });

  const [sorting, setSorting] = useState({
    sortBy: 'date',
    sortOrder: 'desc'
  });

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10
  });

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setPagination(prev => ({ ...prev, page: 1 })); 
  };

  const updateSort = (field) => {
    setSorting(prev => {
        if (field === 'date') return { sortBy: 'date', sortOrder: 'desc' };
        if (field === 'quantity') return { sortBy: 'quantity', sortOrder: 'desc' };
        if (field === 'customer_name') return { sortBy: 'customer_name', sortOrder: 'asc' };
        return prev;
    });
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const updatePage = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      regions: [],
      gender: [],
      categories: [],
      tags: [],
      paymentMethods: [],
      ageMin: '',
      ageMax: '',
      dateFrom: '',
      dateTo: ''
    });
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  return (
    <DataContext.Provider value={{
      filters,
      sorting,
      pagination,
      updateFilters,
      updateSort,
      updatePage,
      clearFilters
    }}>
      {children}
    </DataContext.Provider>
  );
};
