import React, { useState } from 'react';
import { router } from '@inertiajs/react';

export default function MyTable({ from, data, columns, handleClick = '', withFilter = false, sortable = false, currentSort = null, currentDirection = null, routeName = '' }) {
  const [filterText, setFilterText] = useState('');
  const [filterColumn, setFilterColumn] = useState('all');

  // Handle column sort
  const handleSort = (columnKey) => {
    if (!sortable || !routeName) return;

    let newDirection = 'asc';
    
    // Toggle direction if clicking the same column
    if (currentSort === columnKey) {
      newDirection = currentDirection === 'asc' ? 'desc' : 'asc';
    }

    // Get current URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('sort', columnKey);
    urlParams.set('direction', newDirection);
    
    // Navigate with new sort parameters
    router.get(route(routeName, Object.fromEntries(urlParams)), {}, {
      preserveState: true,
      preserveScroll: true,
    });
  };

  // Render sort indicator
  const renderSortIndicator = (columnKey) => {
    if (!sortable || currentSort !== columnKey) {
      return sortable ? <span className="ml-1 text-gray-400">⇅</span> : null;
    }
    
    return (
      <span className="ml-1">
        {currentDirection === 'asc' ? '↑' : '↓'}
      </span>
    );
  };

  // Filter data based on input
  const filteredData = data.filter(item => {
    if (!filterText) return true;
    
    if (filterColumn === 'all') {
      // Search all columns
      return columns.some(col => {
        const value = item[col.key]?.toString().toLowerCase() || '';
        return value.includes(filterText.toLowerCase());
      });
    } else {
      // Search specific column
      const value = item[filterColumn]?.toString().toLowerCase() || '';
      return value.includes(filterText.toLowerCase());
    }
  });

  function renderCell(col, rowIndex, item) {
    if (col.key === 'id') {
      return from + rowIndex;
    }
    return col.render ? col.render(item, rowIndex) : item[col.key];
  }

  return (
    <div>
      {withFilter && (
        <div className='flex space-x-2 mt-3'>
        <input
          type='text'
          placeholder='Filter...'
          className='input input-bordered rounded-md'
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />

        <select 
          className='select select-bordered rounded-md'
          value={filterColumn}
          onChange={(e) => setFilterColumn(e.target.value)}
        >
          <option value='all'>All Columns</option>
          {columns.map(col => (
            <option key={col.key} value={col.key}>{col.label}</option>
          ))}
        </select>
        </div>
      )}

      {/* Table */}
      <div className='overflow-x-auto'>
        <table className='table'>
          <thead>
            <tr>
              {columns.map((col, index) => (
                <th 
                  key={index} 
                  className={`${col.sortable && sortable ? 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 select-none' : ''}`}
                  onClick={() => col.sortable && handleSort(col.sortKey || col.key)}
                >
                  <div className={`flex items-center w-full ${col.sortable && sortable ? 'justify-between' : col.classHead ? col.classHead : 'justify-start'}`}>
                    <span className={`${col.sortable && sortable ? 'text-left flex-1' : ''}`}>{col.label}</span>
                    {col.sortable && (
                      <span className='ml-2 flex-shrink-0'>
                        {renderSortIndicator(col.sortKey || col.key)}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.length !== 0 ? filteredData.map((item, index) => (
              <tr
                key={index}
                className={`
                  ${index % 2 !== 0 ? 'bg-slate-50 dark:bg-slate-800' : 'bg-white dark:bg-slate-900'} 
                  group transition-colors duration-200
                  ${handleClick ? 'cursor-pointer hover:bg-red-50 dark:hover:bg-slate-700 hover:shadow-sm' : ''}
                `}
                onClick={() => handleClick && handleClick(item)}
              >
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className={`group-hover:text-light-primary dark:group-hover:text-dark-primary ` + col.classBody}>
                    { renderCell(col, index, item) }
                  </td>
                ))}
              </tr>
            )) : (
              <tr className='text-center'>
                <td colSpan={(columns.length + 1)}>No matching records found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}