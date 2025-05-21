interface LoginFormData {
  email: string;
  password: string;
}

export const validateLoginForm = (form: LoginFormData): string | null => {
  const { email, password } = form;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Invalid email format';
  }
  if (password.length < 6) {
    return 'Password must be at least 6 characters long';
  }

  return null;
};
