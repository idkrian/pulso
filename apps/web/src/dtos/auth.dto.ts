export type UnitPreference = "KG" | "LB";

export type LanguagePreference = "en" | "pt";

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  unitPreference: UnitPreference;
  languagePreference: LanguagePreference;
}

export interface UpdateMeDto {
  name?: string;
  unitPreference?: UnitPreference;
  languagePreference?: LanguagePreference;
}

export interface LoginRequestDto {
  email: string;
  password: string;
}

export interface RegisterRequestDto {
  name: string;
  email: string;
  password: string;
}

export interface VerifyRegistrationRequestDto {
  email: string;
  code: string;
}

export interface ResendCodeRequestDto {
  email: string;
}

export interface LoginResponseDto extends AuthUser {
  token: string;
}

export interface JwtPayload {
  userId: string;
  iat: number;
  exp: number;
}
