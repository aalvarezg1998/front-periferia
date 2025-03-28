import { jwtDecode, JwtPayload } from "jwt-decode";

export const decodeToken = (token: string): JwtPayload | null => {
  try {
    return jwtDecode<JwtPayload>(token);
  } catch (error) {
    console.error("Error al decodificar el token:", error);
    return null;
  }
};
