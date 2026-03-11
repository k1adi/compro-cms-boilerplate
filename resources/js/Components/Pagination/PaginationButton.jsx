// Reusable pagination button component
export default function PaginationButton ({ onClick, disabled, mobileIcon, desktopText, className = "" }){
  return (
    <button 
      className={`flex-1 h-10 px-2 py-0 sm:px-3 ${className} text-sm font-medium 
        ${disabled ? 'text-gray-400 bg-gray-200 cursor-not-allowed' : 'text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700'} 
        border border-gray-300 rounded-lg`}
      onClick={onClick}
      disabled={disabled}
    >
      <span className='hidden sm:block'>{desktopText}</span>
      <span className='block sm:hidden text-sm'>{mobileIcon}</span>
    </button>
  );
};