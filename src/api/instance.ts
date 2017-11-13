import Axios, { AxiosInstance } from 'axios';

const instance: AxiosInstance = Axios.create({
  baseURL: '/api',
  timeout: 3000,
  transformResponse: [transformResponse],
});

function transformResponse (response: any): any {
  const data: ResponseData = JSON.parse(response);
  const err: Error | undefined = data.err;

  if (err) {
    throw Error(err.message || (<any>err).errmsg);
  }

  return data;
}

export default instance;
