import { jwtDecode } from "jwt-decode";


export const getUserFromToken = () => {
    const token = localStorage.getItem('token');

    if (!token) {
        return null;
    }

    try {
        const decoded: any = jwtDecode(token);

        return {
            name: decoded.name,
            email: decoded.email,
            role: decoded.role,
            exp: decoded.exp,
        };
    } catch (err) {
        return null;
    }
}

export const isTokenValid = () => {
  const user = getUserFromToken();
  if (!user) return false;

  return user.exp * 1000 > Date.now();
};