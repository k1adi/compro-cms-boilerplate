<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ArticleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'category' => ['nullable', 'integer', 'exists:categories,id'],
            'title.en' => ['required', 'string', 'max:255'],
            'title.id' => ['required', 'string', 'max:255'],
            'slug.en' => ['required', 'string', 'max:255'],
            'slug.id' => ['required', 'string', 'max:255'],
            'excerpt.en' => ['required', 'string', 'max:500'],
            'excerpt.id' => ['required', 'string', 'max:500'],
            'content.en' => ['required', 'string'],
            'content.id' => ['required', 'string'],
            'status' => ['required', 'in:draft,published'],
            'published_at' => ['required_if:status,draft', 'nullable', 'date'],
            'cover' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif', 'max:1024'],
            'tags' => ['nullable', 'array'],
            'tags.*' => ['integer', 'exists:tags,id'],
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'cover.max' => 'The cover image must not exceed 1MB.',
            'cover.mimes' => 'The cover image must be a file of type: jpeg, png, jpg, gif.',
        ];
    }
}
