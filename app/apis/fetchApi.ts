'use server';
import fetchExtended from './fetch'; // 새롭게 만든 fetchExtended 파일을 import

/**
 * @param url
 * @param method
 * @param data
 */
const fetchApi = async <T>(
  url: string,
  method: 'GET' | 'POST' | 'DELETE',
  data?: T,
) => {
  try {
    const response = await fetchExtended(url, {
      method: method,
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.log(`🚀 ~ fetchApi url: ${url}, error: ${error}`);
    return error;
  }
};

export default fetchApi;
