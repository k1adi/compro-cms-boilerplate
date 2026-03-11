import React from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Breadcrumb from '@/Components/Breadcrumb/Breadcrumb';
import { faqBreadcrumb } from '@/Utils/BreadcrumbContent';
import FaqForm from './component/FaqForm';

function Edit({ faq }) {
  const data = {
    question: faq.question,
    answer: faq.answer,
    category: faq.category,
    categorySelected: [{value: faq.category, label: faq.category}],
  };

  return (
    <div className='content-box'>
      <Breadcrumb
        title='FAQ Edit'
        pageName='Edit'
        prevPage={faqBreadcrumb}
      />

      <FaqForm method='patch' initialValues={data} routeName='cms.faqs.update' faq={faq} />
    </div>
  );
}

Edit.layout = (page) => (
  <DashboardLayout title='FAQ' children={page} />
);

export default Edit;
