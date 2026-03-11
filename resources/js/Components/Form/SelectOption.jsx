import React, { useEffect, useState } from 'react';
import Select from 'react-select';

export default function SelectOption (props) {
	// Hex code same as with tailwind.config 
	const primaryColor = '#AA0066';
	const primaryDarker = '#750046';
	const [isDarkMode, setIsDarkMode] = useState(false);
	
	// Check if dark mode is enabled
	useEffect(() => {
		const checkDarkMode = () => {
			setIsDarkMode(document.documentElement.classList.contains('dark'));
		};
		
		checkDarkMode();
		
		// Listen for theme changes
		const observer = new MutationObserver(checkDarkMode);
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ['class']
		});
		
		return () => observer.disconnect();
	}, []);
	
	return (
		<Select
			{...props}
			styles={{
				control: (baseStyles, state) => ({
					...baseStyles,
					backgroundColor: state.isDisabled
						? (isDarkMode ? '#374151' : '#f3f4f6') // Lighter background for disabled state
						: (isDarkMode ? '#1F2937' : '#ffffff'),
					borderColor: state.isDisabled
						? (isDarkMode ? '#4B5563' : '#b8bcc2') // Muted border for disabled
						: state.isFocused 
							? (isDarkMode ? primaryDarker : primaryColor)  // Primary colors for focus
							: (isDarkMode ? '#4B5563' : '#d1d5db'), // Normal border
					opacity: state.isDisabled ? 0.6 : 1,
					cursor: state.isDisabled ? 'not-allowed' : 'default',
					boxShadow: state.isFocused 
						? `0 0 0 1px ${isDarkMode ? primaryDarker : primaryColor}` 
						: 'none',
					'&:hover': {
						borderColor: state.isDisabled
							? (isDarkMode ? '#4B5563' : '#b8bcc2') // Keep disabled border on hover
							: state.isFocused 
								? (isDarkMode ? primaryDarker : primaryColor) 
								: (isDarkMode ? '#6B7280' : '#9ca3af')
					},
				}),
				menu: (baseStyles) => ({
					...baseStyles,
					backgroundColor: isDarkMode ? '#1F2937' : '#ffffff',
				}),
				menuPortal: baseStyles => ({
					...baseStyles,
					zIndex: 9999,
				}),
				option: (baseStyles, state) => ({
					...baseStyles,
					backgroundColor: 
						state.isFocused
							? isDarkMode ? '#374151' : '#F3F4F6'
							: state.isSelected
								? isDarkMode ? primaryDarker : primaryColor 
								: 'transparent',
					color: 
            state.isFocused 
            ? isDarkMode ? '#F9FAFB' : '#111827'
            : state.isSelected ? '#F9FAFB' : '#111827',
					'&:active': {
						backgroundColor: isDarkMode ? '#4B5563' : '#E5E7EB',
					},
				}),
				singleValue: (baseStyles) => ({
					...baseStyles,
					color: isDarkMode ? '#F9FAFB' : '#111827',
				}),
				multiValue: (baseStyles) => ({
					...baseStyles,
					backgroundColor: isDarkMode ? '#374151' : '#e2e4e9',
				}),
				multiValueLabel: (baseStyles) => ({
					...baseStyles,
					color: isDarkMode ? '#F9FAFB' : '#111827',
				}),
				multiValueRemove: (baseStyles) => ({
					...baseStyles,
					color: isDarkMode ? '#D1D5DB' : '#6B7280',
					':hover': {
						backgroundColor: isDarkMode ? '#4B5563' : '#E5E7EB',
						color: isDarkMode ? '#F9FAFB' : '#111827',
					},
				}),
			}}
			menuPortalTarget={document.body}
			menuPosition='fixed'
		/>
	);
}