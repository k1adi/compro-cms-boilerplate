import DeleteButton from "@/Components/Button/DeleteButton";
import React from "react";
import { Pencil } from "lucide-react";

export default function CategoryLabel({ label, items, route, onEdit }) {
  return (
    <div className="my-4">
      {items.length ? (
        items.map((item) => (
          <span className="label--category group inline-block" key={item.id}>
            <div className="flex items-center justify-between">
              <span className="mb-1 font-semibold">{item.name.en}</span>

              <div className="transition-all duration-300 overflow-hidden w-0 group-hover:w-auto ms-2 -mr-2">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-1">
                  <button
                    type="button"
                    onClick={() => onEdit(item)}
                    className="!text-xs !py-[2px] ms-2 text-warning"
                  >
                    <Pencil size={16} strokeWidth={3} />
                  </button>
                  <DeleteButton
										id={item.id}
										name={`this ${label}`}
										routeName={route + '.destroy'}
										withText={false}
										className="!text-xs !py-[2px] !ps-1 !bg-none !text-danger"
									/>
                </span>
              </div>
            </div>
          </span>
        ))
      ) : (
        <span className="inline-block py-2 px-5 border border-gray-200 rounded-full">
          <p className="text-sm text-gray-500 italic">No {label} found</p>
        </span>
      )}
    </div>
  );
}
