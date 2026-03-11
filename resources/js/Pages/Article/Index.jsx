import React from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import Breadcrumb from "@/Components/Breadcrumb/Breadcrumb";
import { articleBreadcrumb } from "@/Utils/BreadcrumbContent";
import SearchInput from "@/Components/Form/SearchInput";
import CreateButton from "@/Components/Button/CreateButton";

function Index() {
  return (
    <>
      <div className="content-box mb-3">
        <Breadcrumb
          title="Article"
          pageName="Index"
          prevPage={articleBreadcrumb}
        />

        <div className="flex flex-row justify-between items-center">
          <SearchInput />

          <CreateButton routeName="cms.articles.create" />
        </div>
      </div>

      <div className="content-box">
        <p>Article List</p>
      </div>
    </>
  );
}

Index.layout = (page) => <DashboardLayout title="Article" children={page} />;

export default Index;
