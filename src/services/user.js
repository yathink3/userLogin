import { apiHandler, headers } from './util';

export const BASE_URL = process.env.BASE_URL;

export const signupUserApi = async ({ name, email, password }) => {
  const config = { method: 'POST', headers, body: JSON.stringify({ name, email, password }) };
  return await apiHandler(fetch(`${BASE_URL}/users`, config), 'signupUserApi');
};

export const loginUserApi = async ({ email, password }) => {
  const config = { method: 'POST', headers, body: JSON.stringify({ email, password }) };
  return await apiHandler(fetch(`${BASE_URL}/auth`, config), 'loginUserApi');
};

export const fetchUserBytokenApi = async ({ token }) => {
  const config = { method: 'GET', headers: { ...headers, Authorization: token } };
  return await apiHandler(fetch(`${BASE_URL}/users`, config), 'fetchUserBytokenApi');
};
