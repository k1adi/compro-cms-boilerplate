import React from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import Breadcrumb from "@/Components/Breadcrumb/Breadcrumb";
import { articleBreadcrumb } from "@/Utils/BreadcrumbContent";
import ArticleForm from "./component/ArticleForm";

function Edit({ articleData, article, categories, tags, coverImage }) {
  const initialValues = {...articleData.data};

  return (
    <>
      <div className="content-box mb-3">
        <Breadcrumb
          title="Edit Article"
          pageName="Edit"
          prevPage={articleBreadcrumb}
          className="!mb-0"
        />
      </div>

      <div className="content-box">
        <ArticleForm
          method="patch"
          initialValues={initialValues}
          routeName="cms.articles.update"
          article={article}
          categories={categories}
          tags={tags}
          coverImage={coverImage}
        />
      </div>
    </>
  );
}

Edit.layout = (page) => <DashboardLayout title="Edit Article" children={page} />;

export default Edit;
