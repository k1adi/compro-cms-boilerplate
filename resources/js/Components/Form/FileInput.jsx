import React, { forwardRef, useEffect, useRef, useState } from 'react';

export default forwardRef(function FileInput({ 
  isFocused = false,
  isDisabled = false, 
  onFileChange,
  onRemovePreview = null,
  className = '',
  previewStyle = '',
  currentPreview = '',
  multiple = false,
  page='create',
  mediaData=null,
  ...props
}, ref) {
  const input = ref ? ref : useRef();
  const [previews, setPreviews] = useState([]);
  const [files, setFiles] = useState([]);

  const styleEnable = 'w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-2 file:px-4 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter mt-1';
  const styleDisable = 'w-full rounded-lg border-[1.5px] border-stroke outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-2 file:px-4 file:hover:bg-primary file:hover:bg-opacity-10 cursor-default bg-gray-100 text-gray-500 mt-1'

  // Initialize previews and focus input if needed
  useEffect(() => {
    if (isFocused) {
      input.current.focus();
    }
    
    // Initialize previews from props
    updatePreviewsFromProps();
  }, []);

  // Update previews when currentPreview changes
  useEffect(() => {
    updatePreviewsFromProps();
  }, [currentPreview]);

  // Helper function to update previews from props
  const updatePreviewsFromProps = () => {
    if (multiple && Array.isArray(currentPreview)) {
      setPreviews(currentPreview);
    } else if (currentPreview) {
      setPreviews(Array.isArray(currentPreview) ? currentPreview : [currentPreview]);
    } else {
      setPreviews([]);
    }
  };

  const handleChange = (e) => {
    const files = e.target.files;
    
    if (files.length > 0) {
      const fileArray = Array.from(files);
      const fileObjects = fileArray.map(file => ({
        file,
        preview: URL.createObjectURL(file)
      }));
      
      if (multiple) {
        // For multiple files, add to existing previews
        const newPreviews = [...fileObjects.map(fo => fo.preview)];
        const newFiles = [...fileObjects.map(fo => fo.file)];
        setPreviews(newPreviews);
        setFiles(newFiles);
        onFileChange(fileArray, newPreviews);
      } else {
        // For single file, replace existing preview
        const preview = fileObjects[0].preview;
        const file = fileObjects[0].file;
        
        setPreviews([preview]);
        setFiles([file]);
        onFileChange(fileArray[0], preview);
      }
    }
  };

  const handleRemovePreview = (index) => {
    const newPreviews = [...previews];
    const newFiles = [...files];
    newPreviews.splice(index, 1);
    newFiles.splice(index, 1);
    setPreviews(newPreviews);
    setFiles(newFiles);
    
    if (onRemovePreview && typeof onRemovePreview === 'function') {
      onRemovePreview(index);
    } else {
      // Default behavior if no custom handler
      onFileChange(multiple ? [] : null, newPreviews);
    }
    
    // Reset input if all previews are removed
    if (newPreviews.length === 0 && input.current) {
      input.current.value = '';
    }
  };

  // Render a single preview item
  const renderPreviewItem = (item, index, isCreatePage) => {
    // Determine url, isPdf, and fileName based on page type
    let url, fileName;
    
    if (isCreatePage) {
      // For create page
      url = item && typeof item === 'object' ? item.url || item.preview : item;
      fileName = files[index] && typeof files[index] === 'object' && files[index].name || '';
    } else {
      // For other pages (edit/view)
      url = item && typeof item === 'object' ? item.url || item.preview : item;
      fileName = item.name;
    }
    
    // Prepare the image element (same for both cases)
    const imageElement = (
      <img
        src={url}
        alt={`Preview ${index + 1}`}
        className={`w-36 h-auto ${previewStyle}`}
      />
    );
    
    // Prepare the filename element
    const filenameElement = (
      <span className="mt-1 text-xs text-gray-600 break-all max-w-36 text-center">{fileName}</span>
    );
    
    // Prepare the delete button
    const deleteButton = (
      <button
        onClick={() => handleRemovePreview(index)}
        type='button'
        className='btn--close-preview'
        title='Delete Preview'
      >
        ✕
      </button>
    );
    
    return (
      <div key={index} className='relative flex flex-col items-center max-w-32'>
        {!isCreatePage ? (
          <a href={url} target="_blank" rel="noopener noreferrer">
            {imageElement}
            {filenameElement}
          </a>
        ) : (
          <>
            {imageElement}
            {filenameElement}
          </>
        )}
        {deleteButton}
      </div>
    );
  };

  return (
    <>
      <input
        {...props}
        type='file'
        ref={input}
        onChange={handleChange}
        className={`${(isDisabled ? styleDisable : styleEnable)} ${className}`}
        readOnly={isDisabled}
        disabled={isDisabled}
        multiple={multiple}
      />
      
      {previews.length > 0 && (
        (page === 'create' || page === 'convert') ? (
          <div className='flex flex-wrap gap-2 mt-2'>
            {previews.map((preview, index) => renderPreviewItem(preview, index, true))}
          </div>
        ) : (
          <div className='flex flex-wrap gap-2 mt-2'>
            {mediaData.map((preview, index) => renderPreviewItem(preview, index, false))}
          </div>
        )
      )}
    </>
  );
});
