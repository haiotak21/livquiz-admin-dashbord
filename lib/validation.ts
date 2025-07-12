export interface ValidationResult {
    isValid: boolean;
    error?: string;
}

export const validators = {
    required: (value: string): ValidationResult => ({
        isValid: value.trim().length > 0,
        error: value.trim().length === 0 ? 'This field is required' : undefined
    }),

    email: (value: string): ValidationResult => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return {
            isValid: emailRegex.test(value),
            error: emailRegex.test(value) ? undefined : 'Please enter a valid email address'
        };
    },

    minLength: (value: string, min: number): ValidationResult => ({
        isValid: value.length >= min,
        error: value.length < min ? `Must be at least ${min} characters` : undefined
    }),

    maxLength: (value: string, max: number): ValidationResult => ({
        isValid: value.length <= max,
        error: value.length > max ? `Must be no more than ${max} characters` : undefined
    }),

    password: (value: string): ValidationResult => {
        const hasUpperCase = /[A-Z]/.test(value);
        const hasLowerCase = /[a-z]/.test(value);
        const hasNumbers = /\d/.test(value);
        const hasMinLength = value.length >= 8;

        if (!hasMinLength) {
            return { isValid: false, error: 'Password must be at least 8 characters' };
        }
        if (!hasUpperCase) {
            return { isValid: false, error: 'Password must contain at least one uppercase letter' };
        }
        if (!hasLowerCase) {
            return { isValid: false, error: 'Password must contain at least one lowercase letter' };
        }
        if (!hasNumbers) {
            return { isValid: false, error: 'Password must contain at least one number' };
        }

        return { isValid: true };
    },

    phone: (value: string): ValidationResult => {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return {
            isValid: phoneRegex.test(value.replace(/\s/g, '')),
            error: phoneRegex.test(value.replace(/\s/g, '')) ? undefined : 'Please enter a valid phone number'
        };
    },

    url: (value: string): ValidationResult => {
        try {
            new URL(value);
            return { isValid: true };
        } catch {
            return { isValid: false, error: 'Please enter a valid URL' };
        }
    },

    number: (value: string): ValidationResult => {
        const num = parseFloat(value);
        return {
            isValid: !isNaN(num),
            error: isNaN(num) ? 'Please enter a valid number' : undefined
        };
    },

    positiveNumber: (value: string): ValidationResult => {
        const num = parseFloat(value);
        return {
            isValid: !isNaN(num) && num > 0,
            error: isNaN(num) ? 'Please enter a valid number' : num <= 0 ? 'Number must be positive' : undefined
        };
    }
};

export const validateField = (
    value: string,
    rules: Array<(value: string) => ValidationResult>
): ValidationResult => {
    for (const rule of rules) {
        const result = rule(value);
        if (!result.isValid) {
            return result;
        }
    }
    return { isValid: true };
};

export const validateForm = (
    fields: Record<string, string>,
    validationSchema: Record<string, Array<(value: string) => ValidationResult>>
): Record<string, string> => {
    const errors: Record<string, string> = {};

    for (const [fieldName, rules] of Object.entries(validationSchema)) {
        const value = fields[fieldName] || '';
        const result = validateField(value, rules);
        if (!result.isValid && result.error) {
            errors[fieldName] = result.error;
        }
    }

    return errors;
}; 