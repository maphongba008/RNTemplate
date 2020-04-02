import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';
import { BaseError } from '@src/errors';
import { plainToClass } from 'class-transformer';
import Configs from '@src/constants/Configs';

const client = axios.create({
  baseURL: Configs.API_URL,
  timeout: 60 * 1000,
  // other configs
});

client.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
  };
  return config;
});

const onSuccess = (response: AxiosResponse) => {
  console.log('response', response);
  return Promise.resolve(response.data);
  // depends on the back end
  if (response.data.erroCode === 0) {
    return Promise.resolve(response.data.data);
  }
  return Promise.reject(new BaseError(response.data.errorCode, response.data.message));
};

const onError = (error: AxiosError) => {
  console.log('onError', error);
  if (!error.response) {
    return Promise.reject(new BaseError(-1, 'Network error'));
  }
  const statusCode = error.response.status;
  const url = error.request._url;
  console.log(`ERROR ${statusCode} URL: ${url}`, error);
  return Promise.reject(new BaseError(statusCode, error.message));
};

client.interceptors.response.use(onSuccess, onError);

class Api {
  get = async (url: string, cls: any, config: AxiosRequestConfig | undefined = undefined): Promise<any> => {
    const res = await client.get(url, config);
    return cls ? plainToClass(cls, res, { excludeExtraneousValues: true }) : res;
  };
  post = async (url: string, data: any, cls: any, config: AxiosRequestConfig | undefined = undefined): Promise<any> => {
    const res = await client.post(url, data, config);
    return cls ? plainToClass(cls, res, { excludeExtraneousValues: true }) : res;
  };
  put = async (url: string, data: any, cls: any, config: AxiosRequestConfig | undefined = undefined): Promise<any> => {
    const res = await client.put(url, data, config);
    return cls ? plainToClass(cls, res, { excludeExtraneousValues: true }) : res;
  };
  delete = async (url: string, cls: any, config: AxiosRequestConfig | undefined = undefined): Promise<any> => {
    const res = await client.delete(url, config);
    return cls ? plainToClass(cls, res, { excludeExtraneousValues: true }) : res;
  };
}

export default new Api();
