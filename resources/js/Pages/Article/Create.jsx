import React from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import Breadcrumb from "@/Components/Breadcrumb/Breadcrumb";
import { articleBreadcrumb } from "@/Utils/BreadcrumbContent";
import ArticleForm from "./component/ArticleForm";

function Create({ categories, tags }) {
  const initialValues = {
    category: '',
    categorySelected: '',
    title: { en: '', id: '' },
    slug: { en: '', id: '' },
    excerpt: { en: '', id: '' },
    content: { en: '', id: '' },
    status: '',
    statusSelected: '',
    published_at: null,
    tags: '',
    tagsSelected: ''
  };

  return (
    <>
      <div className="content-box mb-3">
        <Breadcrumb
          title="Create Article"
          pageName="Create"
          prevPage={articleBreadcrumb}
          className="!mb-0"
        />
      </div>

      <div className="content-box">
        <ArticleForm
          method="post"
          initialValues={initialValues}
          routeName="cms.articles.store"
          categories={categories}
          tags={tags}
        />
      </div>
    </>
  );
}

Create.layout = (page) => <DashboardLayout title="Create Article" children={page} />;

export default Create;
