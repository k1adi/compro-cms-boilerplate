import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import useSelectChange from '@/Hook/useSelectChange';
import FieldGroup from '@/Components/Form/FieldGroup';
import TextInput from '@/Components/Form/TextInput';
import TextArea from '@/Components/Form/TextArea';
import SelectOption from '@/Components/Form/SelectOption';
import RichTextEditor from '@/Components/Form/RichTextEditor';
import DateTimePicker from '@/Components/Form/DateTimePicker';
import CancelButton from '@/Components/Button/CancelButton';
import LoadingButton from '@/Components/Button/LoadingButton';
import { Image as ImageIcon, X } from 'lucide-react';

export default function ArticleForm({ method, initialValues, routeName, article = '', categories = [], tags = [], coverImage = null }) {
  const [activeLanguage, setActiveLanguage] = useState('en');
  const [previewImage, setPreviewImage] = useState(coverImage?.url || null);
  const [imageFile, setImageFile] = useState(null);

  const { data, setData, post, patch, errors, processing } = useForm({
    ...initialValues,
    cover: null,
    tags: initialValues.tags || [],
  });

  const { handleSelectChange } = useSelectChange(data, setData);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
      setData('cover', file);
    }
  };

  const removeImage = () => {
    setPreviewImage(null);
    setImageFile(null);
    setData('cover', null);
  };

  const categoryOptions = categories.map(cat => ({
    value: cat.id,
    label: typeof cat.name === 'object' ? cat.name.en : cat.name,
  }));

  const tagOptions = tags.map(tag => ({
    value: tag.id,
    label: typeof tag.name === 'object' ? tag.name.en : tag.name,
  }));

  const submit = (e) => {
    e.preventDefault();

    // Clean data by removing *Selected fields before submission
    const cleanedData = Object.keys(data).reduce((acc, key) => {
      if (!key.endsWith('Selected')) {
        acc[key] = data[key];
      }
      return acc;
    }, {});

    const config = {
      onError: (errors) => {
        if (errors) {
          console.error('Validation errors:', errors);
        }
      }
    };

    const url = method === 'patch'
      ? route(routeName, article.id)
      : route(routeName);

    return method === 'post'
      ? post(url, cleanedData, config)
      : patch(url, cleanedData, config);
  };

  return (
    <form onSubmit={submit} className='w-full'>
      {/* Language Toggle */}
      <div className='mb-6 flex gap-2'>
        <button
          type='button'
          onClick={() => setActiveLanguage('en')}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            activeLanguage === 'en'
              ? 'gradient--primary text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          English
        </button>
        <button
          type='button'
          onClick={() => setActiveLanguage('id')}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            activeLanguage === 'id'
              ? 'gradient--primary text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Indonesian
        </button>
      </div>

      {/* Category */}
      <FieldGroup
        label='Category'
        name='category_id'
        error={errors.category_id}
        isPrimary={true}
      >
        <SelectOption
          id='category_id'
          options={categoryOptions}
          value={data.categorySelected}
          onChange={(option) => handleSelectChange('category', option)}
          className='mt-1 block w-full'
          isClearable
        />
      </FieldGroup>

      {/* Cover Image Upload */}
      <FieldGroup
        label='Cover Image'
        name='cover'
        error={errors.cover}
        isPrimary={true}
      >
        <div className='mt-1'>
          {previewImage ? (
            <div className='relative inline-block'>
              <img
                src={previewImage}
                alt='Preview'
                className='w-full max-w-xs h-auto rounded-lg border border-gray-300'
              />
              <button
                type='button'
                onClick={removeImage}
                className='absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition'
              >
                <X size={20} />
              </button>
            </div>
          ) : (
            <label className='flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition'>
              <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                <ImageIcon className='w-10 h-10 text-gray-400 mb-2' />
                <p className='text-sm text-gray-500'>
                  <span className='font-semibold'>Click to upload</span> or drag and drop
                </p>
                <p className='text-xs text-gray-500'>PNG, JPG, GIF up to 1MB</p>
              </div>
              <input
                type='file'
                name='cover'
                accept='image/*'
                onChange={handleImageChange}
                className='hidden'
              />
            </label>
          )}
        </div>
      </FieldGroup>

      {/* Title - English */}
      {activeLanguage === 'en' && (
        <FieldGroup
          label='Title (English)'
          name='title.en'
          error={errors['title.en']}
          isPrimary={true}
          maxLength='70'
          valueLength={data.title?.en?.length || 0}
        >
          <TextInput
            id='title-en'
            name='title.en'
            className='mt-1 block w-full'
            value={data.title?.en || ''}
            placeholder='Enter title in English...'
            onChange={(e) => setData('title', { ...data.title, en: e.target.value })}
          />
        </FieldGroup>
      )}

      {/* Title - Indonesian */}
      {activeLanguage === 'id' && (
        <FieldGroup
          label='Title (Indonesian)'
          name='title.id'
          error={errors['title.id']}
          isPrimary={true}
          maxLength='70'
          valueLength={data.title?.id?.length || 0}
        >
          <TextInput
            id='title-id'
            name='title.id'
            className='mt-1 block w-full'
            value={data.title?.id || ''}
            placeholder='Masukkan judul dalam Bahasa Indonesia...'
            onChange={(e) => setData('title', { ...data.title, id: e.target.value })}
          />
        </FieldGroup>
      )}

      {/* Slug - English */}
      {activeLanguage === 'en' && (
        <FieldGroup
          label='Slug (English)'
          name='slug.en'
          error={errors['slug.en']}
          isPrimary={true}
          maxLength='80'
          valueLength={data.slug?.en?.length || 0}
        >
          <TextInput
            id='slug-en'
            name='slug.en'
            className='mt-1 block w-full'
            value={data.slug?.en || ''}
            placeholder='article-slug-en'
            onChange={(e) => setData('slug', { ...data.slug, en: e.target.value })}
          />
        </FieldGroup>
      )}

      {/* Slug - Indonesian */}
      {activeLanguage === 'id' && (
        <FieldGroup
          label='Slug (Indonesian)'
          name='slug.id'
          error={errors['slug.id']}
          isPrimary={true}
          maxLength='80'
          valueLength={data.slug?.id?.length || 0}
        >
          <TextInput
            id='slug-id'
            name='slug.id'
            className='mt-1 block w-full'
            value={data.slug?.id || ''}
            placeholder='article-slug-id'
            onChange={(e) => setData('slug', { ...data.slug, id: e.target.value })}
          />
        </FieldGroup>
      )}

      {/* Excerpt - English */}
      {activeLanguage === 'en' && (
        <FieldGroup
          label='Excerpt (English)'
          name='excerpt.en'
          error={errors['excerpt.en']}
          isPrimary={true}
          maxLength='120'
          valueLength={data.excerpt?.en?.length || 0}
        >
          <TextArea
            id='excerpt-en'
            name='excerpt.en'
            className='mt-1 block w-full'
            value={data.excerpt?.en || ''}
            placeholder='Enter excerpt in English...'
            rows={3}
            onChange={(e) => setData('excerpt', { ...data.excerpt, en: e.target.value })}
          />
        </FieldGroup>
      )}

      {/* Excerpt - Indonesian */}
      {activeLanguage === 'id' && (
        <FieldGroup
          label='Excerpt (Indonesian)'
          name='excerpt.id'
          error={errors['excerpt.id']}
          isPrimary={true}
          maxLength='120'
          valueLength={data.excerpt?.id?.length || 0}
        >
          <TextArea
            id='excerpt-id'
            name='excerpt.id'
            className='mt-1 block w-full'
            value={data.excerpt?.id || ''}
            placeholder='Masukkan ringkasan dalam Bahasa Indonesia...'
            rows={3}
            onChange={(e) => setData('excerpt', { ...data.excerpt, id: e.target.value })}
          />
        </FieldGroup>
      )}

      {/* Content - English */}
      {activeLanguage === 'en' && (
        <RichTextEditor
          label='Content (English)'
          name='content.en'
          value={data.content?.en || ''}
          onChange={(value) => setData('content', { ...data.content, en: value })}
          error={errors['content.en']}
          placeholder='Enter content in English...'
          isPrimary={true}
        />
      )}

      {/* Content - Indonesian */}
      {activeLanguage === 'id' && (
        <RichTextEditor
          label='Content (Indonesian)'
          name='content.id'
          value={data.content?.id || ''}
          onChange={(value) => setData('content', { ...data.content, id: value })}
          error={errors['content.id']}
          placeholder='Masukkan konten dalam Bahasa Indonesia...'
          isPrimary={true}
        />
      )}

      {/* Tags */}
      <FieldGroup
        label='Tags'
        name='tags'
        error={errors.tags}
        isPrimary={true}
      >
        <SelectOption
          id='tags'
          options={tagOptions}
          value={data.tagsSelected}
          placeholder="Select Tags..."
          onChange={(option) => handleSelectChange('tags', option, {}, true)}
          className='mt-1 block w-full'
          isMulti
          isClearable
        />
      </FieldGroup>

      {/* Status */}
      <FieldGroup
        label='Status'
        name='status'
        error={errors.status}
        isPrimary={true}
      >
        <SelectOption
          id='status'
          options={[
            { value: 'draft', label: 'Draft' },
            { value: 'published', label: 'Published' },
          ]}
          value={data.statusSelected}
          onChange={(option) => handleSelectChange('status', option)}
          className='mt-1 block w-full'
          placeholder="Select Status..."
        />
      </FieldGroup>


      {/* Published At */}
      {data.status == 'draft' && (
        <FieldGroup
          label='Published At'
          name='published_at'
          error={errors.published_at}
          isPrimary={data.status == 'draft' ? true : false}
        >
          <div className='mt-1'>
            <DateTimePicker
              id='published_at'
              value={data.published_at || ''}
              onChange={(date) => setData('published_at', date)}
              withTime={true}
              className='block w-full'
              placeholder="Published Date..."
              isDisable={false}
            />
          </div>
        </FieldGroup>
      )}

      <div className='flex items-center justify-end gap-2'>
        {!processing && (
          <CancelButton routeName='cms.articles.index' />
        )}

        <LoadingButton disabled={processing}>
          Submit
        </LoadingButton>
      </div>
    </form>
  );
}
