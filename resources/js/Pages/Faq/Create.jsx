import React from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Breadcrumb from '@/Components/Breadcrumb/Breadcrumb';
import { faqBreadcrumb } from '@/Utils/BreadcrumbContent';
import FaqForm from './component/FaqForm';

function Create() {
  const data = {
		question: '',
		answer: '',
		category: '',
		categorySelected: '',
	};

  return (
	<div className='content-box'>
		<Breadcrumb title='FAQ Create' pageName='Create' prevPage={faqBreadcrumb} />
	  
	  <FaqForm 
		method='post'
		initialValues={data}
		routeName='cms.faqs.store'
	  />
	</div>
  );
}

Create.layout = page => (
  <DashboardLayout title='FAQ' children={page} />
);

export default Create;
