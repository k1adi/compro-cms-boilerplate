<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class FaqRequest extends FormRequest
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
            'category' => ['required', 'string', 'max:50', Rule::in(['About the Brand', 'Room', 'Facility', 'Activity', 'Common'])],
            'question.en' => ['required', 'string'],
            'question.id' => ['required', 'string'],
            'answer.en' => ['required', 'string'],
            'answer.id' => ['required', 'string'],
        ];
    }
}
