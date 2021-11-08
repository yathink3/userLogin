import validateOnline from 'helpers/validateOnline';
const BASE_URL = process.env.BASE_URL;

const apiHandler = async (fetchApi, fetchApiName) => {
  try {
    if (!validateOnline()) throw { message: 'Check your Internet Connection' };
    const response = await fetchApi;
    if (response.status === 404) throw response;
    const data = await response.json();
    if (response.status !== 200) throw data;
    return data;
  } catch (err) {
    let errData = null;
    if (err.status === 404) errData = { message: 'Server Not Found', status: 404 };
    else errData = { message: err.message };
    console.log(`${fetchApiName}-Error : `, errData.message);
    throw errData;
  }
};

export const signupUserApi = async ({ name, email, password }) => {
  const config = {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  };
  return await apiHandler(fetch(`${BASE_URL}/users`, config), 'signupUserApi');
};

export const loginUserApi = async ({ email, password }) => {
  const config = {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  };
  return await apiHandler(fetch(`${BASE_URL}/auth`, config), 'loginUserApi');
};

export const fetchUserBytokenApi = async ({ token }) => {
  const config = {
    method: 'GET',
    headers: { Accept: 'application/json', Authorization: token, 'Content-Type': 'application/json' },
  };
  return await apiHandler(fetch(`${BASE_URL}/users`, config), 'fetchUserBytokenApi');
};
