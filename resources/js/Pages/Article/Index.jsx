import React, { useState } from "react";
import { usePage } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import Breadcrumb from "@/Components/Breadcrumb/Breadcrumb";
import { articleBreadcrumb } from "@/Utils/BreadcrumbContent";
import SearchInput from "@/Components/Form/SearchInput";
import CreateButton from "@/Components/Button/CreateButton";
import ArticleWrapper from "./component/ArticleWrapper";
import SelectOption from "@/Components/Form/SelectOption";

function Index({ articles, filters }) {
  const { url } = usePage();
  const [statusFilter, setStatusFilter] = useState(filters?.status || 'all');

  const handleStatusChange = (option) => {
    const newStatus = option?.value || 'all';
    setStatusFilter(newStatus);
    const params = new URLSearchParams();
    if (filters?.search) params.append('search', filters.search);
    if (newStatus !== 'all') params.append('status', newStatus);
    window.location.href = `${url.split('?')[0]}${params.toString() ? '?' + params.toString() : ''}`;
  };

  return (
    <>
      <div className="content-box mb-3">
        <Breadcrumb
          title="Article"
          pageName="Index"
          prevPage={articleBreadcrumb}
        />

        <div className='flex flex-row justify-between items-center flex-wrap gap-2'>
          <div className='flex items-start gap-2 flex-wrap'>
            <SearchInput />

            <div className="w-40 mt-1">
              <SelectOption
                id='status-filter'
                options={[
                  { value: 'all', label: 'All Status' },
                  { value: 'draft', label: 'Draft' },
                  { value: 'published', label: 'Published' },
                ]}
                value={statusFilter}
                onChange={handleStatusChange}
                className='block w-full'
              />
            </div>
          </div>

          <CreateButton routeName="cms.articles.create" />
        </div>
      </div>

      <div className="content-box">
        <ArticleWrapper articles={articles.data} />
      </div>

      {articles.links && (
        <div className="mt-4 flex justify-center">
          {/* Pagination can be added here */}
        </div>
      )}
    </>
  );
}

Index.layout = (page) => <DashboardLayout title="Article" children={page} />;

export default Index;
