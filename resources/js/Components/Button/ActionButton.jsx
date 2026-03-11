export default function ActionButton({ isDisabled, children, btnColor = '', size = '', className = '', ...props }){
  return (
    <button
      type='button'
      className={`btn ${size} ${btnColor ? btnColor : 'gradient--orange text-white'} ${isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} ${className}`}
      disabled={isDisabled}
      {...props}
    >
      {children}
    </button>
  );
}