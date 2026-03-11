export default function Checkbox({ className = '', isDisabled = false, ...props }) {
	const classes = [
		`rounded border-gray-300 text-primary shadow-sm focus:ring-primary`,
		isDisabled ? 'cursor-not-allowed' : 'cursor-pointer',
		className
	].join(' ');

	return (
		<input
			{...props}
			type="checkbox"
			className={classes}
			disabled={isDisabled}
			readOnly={isDisabled}
		/>
	);
}
