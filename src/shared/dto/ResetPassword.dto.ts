export interface ResetPassword {
    password?: string;
    password_confirmation?: string;
    forgotten_password_token?: string;
    email?: string;
}