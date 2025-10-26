import { InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

/**
 * Input Component
 * Reusable input field with label and error handling
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', id, disabled, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')
    
    // Check if we're in auth context (purple background) by checking label color
    const isAuthContext = !disabled

    return (
      <div className={`flex flex-col gap-[8px] ${isAuthContext ? 'w-[320px]' : 'w-full'}`}>
        {label && (
          <div className="flex gap-[10px] items-start">
            <label 
              htmlFor={inputId} 
              className={`font-semibold text-[14px] leading-[16px] tracking-[-0.14px] flex-grow ${
                isAuthContext ? 'text-white' : 'text-gray-700'
              }`}
            >
              {label}
            </label>
            {helperText && (
              <span className={`text-[14px] leading-[16px] tracking-[-0.14px] text-right ${
                isAuthContext ? 'text-[#717d96]' : 'text-gray-500'
              }`}>
                {helperText}
              </span>
            )}
          </div>
        )}
        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          className={`bg-white border-2 border-[#cbd2e0] rounded-[6px] h-[48px] w-full px-4 text-gray-900 focus:outline-none focus:border-[#717d96] disabled:bg-gray-100 disabled:cursor-not-allowed ${error ? 'border-red-500 focus:border-red-500' : ''} ${className}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="text-sm text-red-600">
            {error}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
