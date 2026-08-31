import axios from "axios";
import type {
  AuthUser,
  LoginRequestDto,
  LoginResponseDto,
  RegisterRequestDto,
  ResendCodeRequestDto,
  UpdateMeDto,
  VerifyRegistrationRequestDto,
} from "@/dtos/auth.dto";

const AUTH_URL = `${import.meta.env.VITE_API_BASE}/auth`;
const USER_URL = `${import.meta.env.VITE_API_BASE}/user`;

export const login = async (
  data: LoginRequestDto,
): Promise<LoginResponseDto> => {
  const response = await axios.post(`${AUTH_URL}/login`, data);
  return response.data.data;
};

export const register = async (data: RegisterRequestDto): Promise<void> => {
  await axios.post(`${AUTH_URL}/register`, data);
};

export const verifyRegistration = async (
  data: VerifyRegistrationRequestDto,
): Promise<LoginResponseDto> => {
  const response = await axios.post(`${AUTH_URL}/register/verify`, data);
  return response.data.data;
};

export const resendCode = async (data: ResendCodeRequestDto): Promise<void> => {
  await axios.post(`${AUTH_URL}/register/resend`, data);
};

export const getMe = async (): Promise<AuthUser> => {
  const response = await axios.get(`${USER_URL}/me`);
  return response.data.data;
};

export const updateMe = async (data: UpdateMeDto): Promise<AuthUser> => {
  const response = await axios.patch(`${USER_URL}/me`, data);
  return response.data.data;
};
