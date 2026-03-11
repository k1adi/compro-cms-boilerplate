import { forwardRef, useEffect, useRef } from "react";

export default forwardRef(function TextArea(
  {
    type = "text",
    className = "",
    isFocused = false,
    isDisabled = false,
    ...props
  },
  ref,
) {
  const input = ref ? ref : useRef();

  const styleEnable = `border-gray-300 focus:border-primary focus:ring-primary rounded-md shadow-sm`;
  const styleDisable = "rounded-md shadow-sm border-gray-300 bg-gray-100";

  useEffect(() => {
    if (isFocused) {
      input.current.focus();
    }
  }, []);

  return (
    <textarea
      {...props}
      type={type}
      className={`${isDisabled ? styleDisable : styleEnable} ${className}`}
      ref={input}
      readOnly={isDisabled}
      disabled={isDisabled}
    />
  );
});
