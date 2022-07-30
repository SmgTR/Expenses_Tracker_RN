export interface User {
  token: string;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface UserTypeInputs {
  email: string;
  password: string;
}
