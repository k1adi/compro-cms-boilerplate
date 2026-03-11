import { ChevronsLeft } from "lucide-react";

export default function ButtonToggleSidebar({ sidebarOpen, setSidebarOpen }) {
  return (
    <button
      aria-controls='sidebar'
      onClick={(e) => {
        e.stopPropagation();
        setSidebarOpen(!sidebarOpen);
      }}
      className='btn--toggle-sidebar'
    >
      <span className='bar'>
        {sidebarOpen ? (
          <ChevronsLeft className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-600' size={28} />
        ) : (
          <span className='bar__wrapper'>
            <span className={`bar__label ${!sidebarOpen && 'bar--open'}`} />
            <span className={`bar__label bar-2 ${!sidebarOpen && 'bar--open'}`} />
            <span className={`bar__label bar-3 ${!sidebarOpen && 'bar--open'}`} />
          </span>
        )}
      </span>
    </button>
  );
}