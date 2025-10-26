/**
 * User Validation Service
 * Contains business logic for user validation
 * Matches backend validation rules from user.domain-service.ts
 */

export interface PasswordValidationResult {
  isValid: boolean
  errors: string[]
}

export class UserValidationService {
  /**
   * Validates password strength according to backend rules:
   * - Minimum 8 characters
   * - Must contain uppercase letter
   * - Must contain lowercase letter
   * - Must contain number
   */
  static validatePasswordStrength(password: string): PasswordValidationResult {
    const errors: string[] = []

    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long')
    }

    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const hasNumbers = /\d/.test(password)

    if (!hasUpperCase) {
      errors.push('Password must contain at least one uppercase letter')
    }

    if (!hasLowerCase) {
      errors.push('Password must contain at least one lowercase letter')
    }

    if (!hasNumbers) {
      errors.push('Password must contain at least one number')
    }

    return {
      isValid: errors.length === 0,
      errors,
    }
  }

  /**
   * Validates email format
   */
  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  /**
   * Validates required field is not empty
   */
  static validateRequired(value: string): boolean {
    return value.trim().length > 0
  }

  /**
   * Validates registration form data
   */
  static validateRegistrationForm(formData: {
    email: string
    password: string
    firstName: string
    lastName: string
  }): { isValid: boolean; errors: Record<string, string> } {
    const errors: Record<string, string> = {}

    // Validate first name
    if (!this.validateRequired(formData.firstName)) {
      errors.firstName = 'First name is required'
    }

    // Validate last name
    if (!this.validateRequired(formData.lastName)) {
      errors.lastName = 'Last name is required'
    }

    // Validate email
    if (!this.validateRequired(formData.email)) {
      errors.email = 'Email is required'
    } else if (!this.validateEmail(formData.email)) {
      errors.email = 'Invalid email format'
    }

    // Validate password
    const passwordValidation = this.validatePasswordStrength(formData.password)
    if (!passwordValidation.isValid) {
      errors.password = passwordValidation.errors[0] // Show first error
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    }
  }
}
