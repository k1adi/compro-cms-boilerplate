import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import useSelectChange from '@/Hook/useSelectChange';
import FieldGroup from '@/Components/Form/FieldGroup';
import TextInput from '@/Components/Form/TextInput';
import TextArea from '@/Components/Form/TextArea';
import SelectOption from '@/Components/Form/SelectOption';
import { FaqCategory } from '@/Utils/StaticSelectOption';
import CancelButton from '@/Components/Button/CancelButton';
import LoadingButton from '@/Components/Button/LoadingButton';
import SubmitInertiaForm from '@/Utils/SubmitInertiaForm';

export default function FaqForm({ method, initialValues, routeName, faq='' }) {
  const [activeLanguage, setActiveLanguage] = useState('en');
  const { data, setData, post, patch, errors, processing } = useForm({
    ...initialValues
  });
	const { handleSelectChange } = useSelectChange(data, setData);

  const submit = (e) => {
    SubmitInertiaForm(e, {
      method,
      routeName,
      resource: faq,
      post,
      patch,
    });
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
        name='category'
        error={errors.category}
        isPrimary={true}
      >
        <SelectOption
          id='category'
          options={FaqCategory()}
          value={data.categorySelected}
          onChange={(option) => handleSelectChange('category', option)}
          className='mt-1 block w-full'
          required
        />
      </FieldGroup>

      {/* Question - English */}
      {activeLanguage === 'en' && (
        <FieldGroup
          label='Question (English)'
          name='question.en'
          error={errors['question.en']}
          isPrimary={true}
        >
          <TextInput
            id='question-en'
            name='question.en'
            className='mt-1 block w-full'
            value={data.question?.en || ''}
            placeholder='Enter question in English...'
            onChange={(e) => setData('question', { ...data.question, en: e.target.value })}
          />
        </FieldGroup>
      )}

      {/* Question - Indonesian */}
      {activeLanguage === 'id' && (
        <FieldGroup
          label='Question (Indonesian)'
          name='question.id'
          error={errors['question.id']}
          isPrimary={true}
        >
          <TextInput
            id='question-id'
            name='question.id'
            className='mt-1 block w-full'
            value={data.question?.id || ''}
            placeholder='Masukkan pertanyaan dalam Bahasa Indonesia...'
            onChange={(e) => setData('question', { ...data.question, id: e.target.value })}
          />
        </FieldGroup>
      )}

      {/* Answer - English */}
      {activeLanguage === 'en' && (
        <FieldGroup
          label='Answer (English)'
          name='answer.en'
          error={errors['answer.en']}
          isPrimary={true}
        >
          <TextArea
            id='answer-en'
            name='answer.en'
            className='mt-1 block w-full'
            value={data.answer?.en || ''}
            placeholder='Enter answer in English...'
            rows={5}
            onChange={(e) => setData('answer', { ...data.answer, en: e.target.value })}
          />
        </FieldGroup>
      )}

      {/* Answer - Indonesian */}
      {activeLanguage === 'id' && (
        <FieldGroup
          label='Answer (Indonesian)'
          name='answer.id'
          error={errors['answer.id']}
          isPrimary={true}
        >
          <TextArea
            id='answer-id'
            name='answer.id'
            className='mt-1 block w-full'
            value={data.answer?.id || ''}
            placeholder='Masukkan jawaban dalam Bahasa Indonesia...'
            rows={5}
            onChange={(e) => setData('answer', { ...data.answer, id: e.target.value })}
          />
        </FieldGroup>
      )}

      <div className='flex items-center justify-end'>
        {!processing && (
          <CancelButton routeName='cms.faqs.index' />
        )}

        <LoadingButton disabled={processing}>
          Submit
        </LoadingButton>
      </div>
    </form>
  );
}