import api from "../../services/axios";

export const loginApi = async (
  email: string,
  password: string
) => {
  const response = await api.post("/auth/login/", {
    email,
    password,
  });

  return response.data;
};