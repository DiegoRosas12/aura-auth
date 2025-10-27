export interface PasswordValidationResult {
  isValid: boolean
  errors: string[]
}

export class UserValidationService {
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

  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  static validateRequired(value: string): boolean {
    return value.trim().length > 0
  }

  static validateRegistrationForm(formData: {
    email: string
    password: string
    firstName: string
    lastName: string
  }): { isValid: boolean; errors: Record<string, string> } {
    const errors: Record<string, string> = {}

    if (!this.validateRequired(formData.firstName)) {
      errors.firstName = 'First name is required'
    }

    if (!this.validateRequired(formData.lastName)) {
      errors.lastName = 'Last name is required'
    }

    if (!this.validateRequired(formData.email)) {
      errors.email = 'Email is required'
    } else if (!this.validateEmail(formData.email)) {
      errors.email = 'Invalid email format'
    }

    const passwordValidation = this.validatePasswordStrength(formData.password)
    if (!passwordValidation.isValid) {
      errors.password = passwordValidation.errors[0]
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    }
  }
}
