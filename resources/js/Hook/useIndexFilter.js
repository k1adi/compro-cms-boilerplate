import { useCallback, useEffect, useMemo, useState } from 'react';
import { router } from '@inertiajs/react';

const parseQueryParams = () => {
  const params = new URLSearchParams(window.location.search);
  const result = {};

  params.forEach((value, key) => {
    result[key] = value;
  });

  return result;
};

const sanitizeFilters = (filters) => {
  const cleaned = {};

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '' && !(key === 'page' && Number(value) === 1)) {
      cleaned[key] = value;
    }
  });

  return cleaned;
};

const useIndexFilter = ({ routeName, defaultFilters = {} }) => {
  const initialQuery = useMemo(() => ({ page: 1, search: '', ...defaultFilters, ...parseQueryParams() }), [defaultFilters]);
  const [filters, setFilters] = useState(initialQuery);

  useEffect(() => {
    setFilters((prev) => ({ ...prev, ...parseQueryParams() }));
  }, []);

  const applyFilters = useCallback(
    (nextFilters, options = {}) => {
      if (!routeName) {
        console.error('Route name is required for useIndexFilter.');
        return;
      }

      setFilters((previous) => {
        const updated = typeof nextFilters === 'function' ? nextFilters(previous) : { ...previous, ...nextFilters };
        const sanitized = sanitizeFilters(updated);

        router.get(route(routeName), sanitized, {
          replace: true,
          preserveScroll: true,
          preserveState: true,
          ...options,
        });

        return updated;
      });
    },
    [routeName]
  );

  const handleSearchChange = useCallback(
    (value) => {
      applyFilters({ search: value || '', page: 1 });
    },
    [applyFilters]
  );

  const handlePageChange = useCallback(
    (page) => {
      applyFilters({ page: page || 1 });
    },
    [applyFilters]
  );

  return {
    filters,
    setFilters: applyFilters,
    search: filters.search || '',
    currentPage: Number(filters.page) || 1,
    handleSearchChange,
    handlePageChange,
  };
};

export default useIndexFilter;