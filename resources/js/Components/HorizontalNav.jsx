import React from "react";
import { Link } from "@inertiajs/react";
import clsx from "clsx";

function HorizontalNav({ navItems, currentView }) {
  return (
    <div
      className="flex space-x-3 mb-3 overflow-x-auto"
      style={{
        scrollbarWidth: "thin",
        scrollbarColor: "#E5E7EB transparent",
      }}
    >
      <style>{`
        div::-webkit-scrollbar {
          height: 4px;
        }
        div::-webkit-scrollbar-track {
          background: transparent;
        }
        div::-webkit-scrollbar-thumb {
          background: #E5E7EB;
          border-radius: 2px;
        }
        div::-webkit-scrollbar-thumb:hover {
          background: #D1D5DB;
        }
      `}</style>
      <div className="flex space-x-3 flex-nowrap min-w-max !ms-0">
        {navItems.map(({ name, route, icon: Icon }) => {
          const isActive = currentView.replace(/-/g, ' ') === name.toLowerCase();

          return (
            <Link
              key={name}
              href={route}
              className={clsx(
                "flex items-center space-x-2 bg-white px-5 py-2 rounded-md text-md font-medium transition-colors duration-150 ease-in-out whitespace-nowrap flex-shrink-0",
                isActive
                  ? "!font-extrabold text-primary"
                  : "text-gray-700 hover:bg-gray-100",
              )}
            >
              {Icon && <Icon className="inline-block mb-1" />}
              <span>{name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default HorizontalNav;
