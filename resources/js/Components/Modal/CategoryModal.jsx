import React, { useEffect } from "react";
import { useForm } from "@inertiajs/react";
import Modal from "./Modal";
import Header from "./ModalHeader";
import Body from "./ModalBody";
import Footer from "./ModalFooter";
import FieldGroup from "../Form/FieldGroup";
import TextInput from "../Form/TextInput";
import ActionButton from "../Button/ActionButton";

export default function CategoryModal({ show, onClose, type, item, isEdit }) {
  const { data, setData, post, put, processing, errors, reset } = useForm({
    type: type,
    name: item ? item.name : { en: '', id: '' },
  });

  // Update the type when the modal is open
  useEffect(() => {
    setData((prev) => ({
      ...prev,
      type,
    }));
  }, [type, setData]);

  // Update form data when editing an item
  useEffect(() => {
    if (show && isEdit && item) {
      setData({
        type: type,
        name: item.name || { en: '', id: '' },
      });
    } else if (show && !isEdit) {
      setData({
        type: type,
        name: { en: '', id: '' },
      });
    }
  }, [show, isEdit, item, type]);

  const submit = (e) => {
    e.preventDefault();

    if (isEdit) {
      put(route('cms.categories.update', item.id), {
        data: { ...data },
        onSuccess: () => {
          reset();
          onClose();
        },
      });
    } else {
      post(route('cms.categories.store'), {
        data: { ...data },
        onSuccess: () => {
          reset();
          onClose();
        },
      });
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const title = isEdit ? `Edit ${type}` : `Create ${type}`;

  return (
    <Modal show={show} onClose={handleClose} maxWidth="md">
      <form onSubmit={submit}>
        <Header title={title} onClose={handleClose} />

        <Body>
          <div className="mb-4">
            <FieldGroup
              label='Name (English)'
              name='name.en'
              error={errors['name.en']}
              isPrimary={true}
            >
              <TextInput
                id='name-en'
                name='name.en'
                className='mt-1 block w-full'
                value={data.name?.en || ''}
                placeholder='Enter name in English...'
                onChange={(e) => setData('name', { ...data.name, en: e.target.value })}
              />
            </FieldGroup>

            <FieldGroup
              label='Nama (Indonesian)'
              name='name.id'
              error={errors['name.id']}
              isPrimary={true}
            >
              <TextInput
                id='name-id'
                name='name.id'
                className='mt-1 block w-full'
                value={data.name?.id || ''}
                placeholder='Masukkan nama dalam Bahasa Indonesia...'
                onChange={(e) => setData('name', { ...data.name, id: e.target.value })}
              />
            </FieldGroup>
          </div>
        </Body>

        <Footer>
          <ActionButton 
            btnColor='gradient--gray text-white'
            onClick={handleClose}
            isDisabled={processing}
          >
            Cancel
          </ActionButton>
          <ActionButton
            type='submit'
            btnColor='gradient--green text-white'
            isDisabled={processing}
          >
            {isEdit ? 'Update' : 'Create'}
          </ActionButton>
        </Footer>
      </form>
    </Modal>
  );
}
