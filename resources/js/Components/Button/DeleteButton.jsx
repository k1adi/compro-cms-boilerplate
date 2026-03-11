import React from 'react';
import { router } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';
import ConfirmDelete from '@/Components/Notification/ConfirmDelete';

const DeleteButton = ({ id, routeName, className='', withText=true, name='' }) => {
  const handleDelete = async () => {
    const confirmed = await ConfirmDelete(name);
    if (confirmed) {
      router.delete(route(routeName, id));
    }
  };

  return (
    <button className={'btn gradient--red text-white ml-2 ' + className} onClick={handleDelete}>
      <Trash2 
        className='inline-block mb-1' 
        size={16} 
        strokeWidth={3}
      /> 
      {withText && ' Delete'}
    </button>
  );
};

export default DeleteButton;
