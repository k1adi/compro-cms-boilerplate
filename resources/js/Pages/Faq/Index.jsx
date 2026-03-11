import React from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Breadcrumb from '@/Components/Breadcrumb/Breadcrumb';
import { faqBreadcrumb } from '@/Utils/BreadcrumbContent';
import SearchInput from '@/Components/Form/SearchInput';
import CreateButton from '@/Components/Button/CreateButton';
import HorizontalNav from '@/Components/HorizontalNav';
import { FaqNavItems } from '@/Utils/StaticSelectOption';
import FaqWrapper from './component/FaqWrapper';
import Pagination from '@/Components/Pagination/Pagination';
import useIndexFilter from '@/Hook/useIndexFilter';

function Index({ faqs }) {
  const { filters, search, handleSearchChange, handlePageChange } = useIndexFilter({
    routeName: 'cms.faqs.index',
    defaultFilters: {
      category: 'all',
    },
  });

  const currentCategory = filters.category || 'all';
  const { total, from, to, current_page, last_page } = faqs.meta;

  return (
    <>
      <div className='content-box mb-3'>
        <Breadcrumb
          title='Frequently Asked Question'
          pageName='Index'
          prevPage={faqBreadcrumb}
        />

        <div className='flex flex-row justify-between items-center'>
          <SearchInput
            value={search}
            onChange={handleSearchChange}
            placeholder='Search FAQ...'
          />

          <CreateButton routeName='cms.faqs.create' />
        </div>
      </div>

      <HorizontalNav
        navItems={FaqNavItems()}
        currentView={currentCategory}
      />

      <FaqWrapper faqs={faqs.data} />

      {faqs.data.length > 0 && (
        <div className='content-box'>
          <Pagination
            total={total}
            firstIndex={from}
            lastIndex={to}
            currentPage={current_page}
            lastPage={last_page}
            onPageChange={handlePageChange}
            className='!py-0'
          />
        </div>
      )}
    </>
  );
}

Index.layout = (page) => <DashboardLayout title='FAQ' children={page} />;

export default Index;
