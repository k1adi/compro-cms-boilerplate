import React from "react";
import DeleteButton from "@/Components/Button/DeleteButton";
import { Pencil, Tag } from "lucide-react";
import { Link } from "@inertiajs/react";

export default function ArticleWrapper({ articles }) {
	return articles.length ? (
		<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
			{articles.map((article) => (
				<div key={article.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
					{/* Image */}
					{article.cover_image && (
						<div className="relative h-48 overflow-hidden bg-gray-200">
							<img
								src={article.cover_image.thumb}
								alt={article.title.en}
								className="w-full h-full object-cover"
							/>
							{/* Status Badge */}
							<div className="absolute top-3 left-3">
								{article.status === 'published' && (
									<span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-green-500 rounded-full">
										Published
									</span>
								)}
								{article.status === 'draft' && (
									<span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-yellow-500 rounded-full">
										Draft
									</span>
								)}
							</div>
						</div>
					)}

					{/* Content */}
					<div className="p-5">
            {article.category && (
              <span className="inline-flex items-center gap-1 text-xs text-gray-600">
                <Tag size={14} />
                {article.category}
              </span>
            )}
						<h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
							{article.title.en || article.title.id}
						</h3>

						<p className="text-sm text-gray-600 mb-0 line-clamp-3">
							{article.excerpt.en || article.excerpt.id}
						</p>
					</div>

					{/* Footer Actions */}
					<div className="px-5 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
						<span className="text-xs text-gray-500">
							{article.created_at}
						</span>
						<div className="flex gap-1">
							<Link
								href={route('cms.articles.edit', article.id)}
								className='btn btn--sm gradient--orange text-white'
								title="Edit"
							>
								<Pencil className="inline-block mb-1" size={16} strokeWidth={3} />
							</Link>
							<DeleteButton 
                id={article.id}
                name={`Article - ${article.title.en}`}
                routeName='cms.articles.destroy'
                withText={false}
                className="!text-sm btn--sm"
              />
						</div>
					</div>
				</div>
			))}
		</div>
	) : (
		<div className="text-center py-12">
			<p className="text-sm text-gray-500 italic">There's no article yet...</p>
		</div>
	)
}
