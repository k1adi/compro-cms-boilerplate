const dynamicBreadcrumb = (routeName, pageName) => {
  return [
    { link: route('dashboard'), text: 'Dashboard' },
    { link: route(routeName), text: pageName },
  ];
};

const dashboardBreadcrumb = [
	{ link: route('cms.dashboard'), text: 'Dashboard' }
];

const articleBreadcrumb = [
  { link: route('cms.dashboard'), text: 'Dashboard' },
  { link: '#', text: 'Article' },
];

const categoryBreadcrumb = [
  { link: route('cms.dashboard'), text: 'Dashboard' },
  { link: '#', text: 'Category & Tag' },
];

const faqBreadcrumb = [
  { link: route('cms.dashboard'), text: 'Dashboard' },
  { link: '#', text: 'FAQ' },
];

export {
  dynamicBreadcrumb,
  dashboardBreadcrumb,
  articleBreadcrumb,
  categoryBreadcrumb,
  faqBreadcrumb,
};
