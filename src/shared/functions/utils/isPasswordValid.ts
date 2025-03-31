export function isPasswordValid(password: string): boolean {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
    const hasNumber = /[0-9]/;

    if (password.length < minLength) return false;
    if (!hasUpperCase.test(password)) return false;
    if (!hasSpecialChar.test(password)) return false;
    if (!hasNumber.test(password)) return false;

    return true;
}