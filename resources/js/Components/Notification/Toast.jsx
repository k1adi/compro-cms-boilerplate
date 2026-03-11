import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toastConfig = {
  theme: 'dark',
  position: 'top-right',
  autoClose: 5000,
  draggable: true,
  closeOnClick: true,
  pauseOnHover: false,
  hideProgressBar: false,
};

const ToastContent = {
  success: (message) => {
    toast.success(message, toastConfig);
  },
  error: (message) => {
    toast.error(message, toastConfig);
  }
}

const ToastWrapper = () => {
  return (
    <ToastContainer 
      style={{
        top: '90px',
        width: 'auto',
        maxWidth: '400px',
        minWidth: '300px'
      }}
      toastStyle={{
        width: 'auto',
        minWidth: '300px',
        maxWidth: '400px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '6px'
      }}
    />
  );
};

export { ToastContent, ToastWrapper };