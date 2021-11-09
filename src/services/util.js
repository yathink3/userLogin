import validateOnline from '@helpers/validateOnline';

export const BASE_URL = process.env.BASE_URL;

export const headers = { Accept: 'application/json', 'Content-Type': 'application/json' };

export const apiHandler = async (fetchApi, fetchApiName) => {
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
