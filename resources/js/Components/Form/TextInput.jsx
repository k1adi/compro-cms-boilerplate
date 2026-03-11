import { forwardRef, useEffect, useRef } from "react";

export default forwardRef(function TextInput(
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
  const styleDisable =
    "rounded-md shadow-sm border-gray-300 bg-gray-100 text-gray-500";

  useEffect(() => {
    if (isFocused) {
      input.current.focus();
    }
  }, []);

  return (
    <input
      {...props}
      type={type}
      className={`${
        isDisabled ? styleDisable : styleEnable
      } ${className} ${type === "number" ? "appearance-number" : ""}`} // Add number-specific styling if needed
      ref={input}
      readOnly={isDisabled}
      disabled={isDisabled}
      onWheel={type === "number" ? (e) => e.target.blur() : undefined} // Prevent scroll wheel changes
    />
  );
});
