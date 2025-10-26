import { ReactNode } from 'react'

interface AlertProps {
  children: ReactNode
  variant?: 'info' | 'success' | 'warning' | 'error'
  onClose?: () => void
  className?: string
}

/**
 * Alert Component
 * Displays contextual feedback messages
 */
export const Alert = ({ children, variant = 'info', onClose, className = '' }: AlertProps) => {
  const variantStyles = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    success: 'bg-green-50 border-green-200 text-green-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    error: 'bg-red-50 border-red-200 text-red-800',
  }

  return (
    <div
      className={`relative rounded-lg border p-4 ${variantStyles[variant]} ${className}`}
      role="alert"
    >
      <div className="flex items-start">
        <div className="flex-1">{children}</div>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-4 inline-flex flex-shrink-0 rounded-md p-1.5 hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-offset-2"
            aria-label="Close"
          >
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}
