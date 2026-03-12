import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import FieldGroup from './FieldGroup';

const RichTextEditor = ({
  label,
  name,
  value = '',
  onChange,
  error,
  placeholder = 'Enter content...',
  isPrimary = true,
  readOnly = false,
  theme = 'snow',
  modules = null,
  formats = null,
}) => {
  const defaultModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  const defaultFormats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'blockquote', 'code-block',
    'list', 'script',
    'indent',
    'size',
    'color', 'background',
    'align',
    'link', 'image',
  ];

  const quillModules = modules || defaultModules;
  const quillFormats = formats || defaultFormats;

  return (
    <FieldGroup
      label={label}
      name={name}
      error={error}
      isPrimary={isPrimary}
    >
      <div className='mt-1'>
        <ReactQuill
          theme={theme}
          value={value}
          onChange={onChange}
          modules={quillModules}
          formats={quillFormats}
          placeholder={placeholder}
          readOnly={readOnly}
          className='bg-white'
        />
      </div>
    </FieldGroup>
  );
};

export default RichTextEditor;
