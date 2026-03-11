<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Builder;

trait HasAdvancedFilter
{
    public function scopeAdvancedFilter(Builder $query)
    {
        $filterable = $this->filterable ?? []; // Columns allowed for filtering
        $searchValue = request('search'); // Search value from the query parameter

        if (!empty($searchValue)) {
            $query->where(function ($query) use ($filterable, $searchValue) {
                foreach ($filterable as $column) {
                    if (in_array($column, $this->translatable ?? [])) {
                        // Handle translatable JSON columns
                        $locales = config('translatable.locales', ['en', 'id']); // Adjust locales as needed
                        $conditions = [];
                        $bindings = [];
                        foreach ($locales as $locale) {
                            $conditions[] = "JSON_UNQUOTE(JSON_EXTRACT(`{$column}`, '$.{$locale}')) LIKE ?";
                            $bindings[] = "%{$searchValue}%";
                        }
                        $query->orWhereRaw('(' . implode(' OR ', $conditions) . ')', $bindings);
                    } elseif (strpos($column, '.') !== false) {
                        // Handle relationships, e.g., "relation.column"
                        $segments = explode('.', $column);
                        $relation = array_shift($segments);
                        $field = implode('.', $segments);

                        $query->orWhereHas($relation, function ($q) use ($field, $searchValue) {
                            $q->where($field, 'like', "%{$searchValue}%");
                        });
                    } else {
                        // Handle direct fields
                        $query->orWhere($column, 'like', "%{$searchValue}%");
                    }
                }
            });
        }

        return $query;
    }
}
