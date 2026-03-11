import React from "react";
import DeleteButton from "@/Components/Button/DeleteButton";
import { Pencil } from "lucide-react";
import { Link } from "@inertiajs/react";

export default function FaqWrapper({ faqs }) {
	return faqs.length ? (
		faqs.map((faq) => (
			<div className="content-box mb-3" key={faq.id}>
				<div className="flex justify-between items-center gap-2">
					<h2 className="cms--sub-heading bg-gradient-to-br from-primary to-secondary text-transparent bg-clip-text">
            # {faq.category}
          </h2>

					<div className="flex item-center justify-end">
            <Link
              href={route('cms.faqs.edit', faq.id)}
              className='btn gradient--orange text-white'
            >
              <Pencil className="inline-block mb-1" size={16} strokeWidth={3} />
            </Link>
						<DeleteButton 
              id={faq.id}
              name={`FAQ - ${faq.category}`}
              routeName='cms.faqs.destroy'
              withText={false}
              className="!text-sm"
            />
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 items-start mt-3">
					<div className="rounded-lg border border-gray-200 p-4">
							<p className="text-xs italic text-gray-500">English</p>
							<h3 className="font-semibold border-b pb-2">{faq.question.en}</h3>
							<p className="text-sm mt-3 text-gray-600">{faq.answer.en}</p>
					</div>

					<div className="rounded-lg border border-gray-200 p-4">
						<p className="text-xs italic text-gray-500">Indonesia</p>
						<h3 className="font-semibold border-b pb-2">{faq.question.id}</h3>
						<p className="text-sm mt-3 text-gray-600">{faq.answer.id}</p>
					</div>
				</div>

				<div className="flex items-center justify-end gap-3 mt-3 text-xs text-gray-500 italic">
					<p>Last Update : {faq.updated_at}</p>
				</div>
			</div>
		))
	) : (
		<div className="content-box text-center">
			<p className="text-sm text-gray-500 italic">There's nothing FAQ for this category...</p>
		</div>
	)
}
