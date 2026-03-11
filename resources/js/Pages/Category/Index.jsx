import React, { useState } from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import Breadcrumb from "@/Components/Breadcrumb/Breadcrumb";
import { categoryBreadcrumb } from "@/Utils/BreadcrumbContent";
import ExpandableSection from "@/Components/ExpandableSection";
import CategoryModal from "@/Components/Modal/CategoryModal";
import CategoryLabel from "./component/CategoryLabel";
import ActionButton from "@/Components/Button/ActionButton";
import { Plus } from "lucide-react";

function Index({ categories, tags }) {
  const [modalState, setModalState] = useState({
    show: false,
    type: 'category',
    item: null,
    isEdit: false,
  });

  const openCreateModal = (type) => {
    setModalState({
      show: true,
      type,
      item: null,
      isEdit: false,
    });
  };

  const openEditModal = (type, item) => {
    setModalState({
      show: true,
      type,
      item,
      isEdit: true,
    });
  };

  const closeModal = () => {
    setModalState({
      show: false,
      type: 'category',
      item: null,
      isEdit: false,
    });
  };
  return (
    <>
      <div className="content-box mb-3">
        <Breadcrumb
          title="Category & Tag"
          pageName="Index"
          prevPage={categoryBreadcrumb}
          className="!mb-0"
        />
      </div>

      <ExpandableSection title="Category">
        <CategoryLabel 
          items={categories} 
          label="Category" 
          route="cms.del-category"
          onEdit={(item) => openEditModal('category', item)}
        />

				<div className="flex justify-end">
					<ActionButton className="gradient--primary text-white" onClick={() => openCreateModal('category')}>
							<Plus className="inline-block mb-1" /> Category
          </ActionButton>
				</div>
      </ExpandableSection>

      <ExpandableSection title="Tag">
        <CategoryLabel 
          items={tags} 
          label="Tag" 
          route="cms.del-tag"
          onEdit={(item) => openEditModal('tag', item)}
        />

				<div className="flex justify-end">
					<ActionButton className="gradient--primary text-white" onClick={() => openCreateModal('tag')}>
							<Plus className="inline-block mb-1" /> Tag
          </ActionButton>
				</div>
      </ExpandableSection>

      <CategoryModal
        show={modalState.show}
        onClose={closeModal}
        type={modalState.type}
        item={modalState.item}
        isEdit={modalState.isEdit}
      />
    </>
  );
}

Index.layout = (page) => <DashboardLayout title="Category & Tag" children={page} />;

export default Index;
