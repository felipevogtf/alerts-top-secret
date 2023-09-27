export interface LoginData {
  rut: string;
  password: string;
}

export interface LoginResponse{
  token: string,
  rut: string,
  user_type: string,
}