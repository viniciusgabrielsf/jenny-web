import { type AxiosError } from 'axios';

export const errorInterceptor = (error: AxiosError) => {
  console.log(error);
  let axiosMessage = error.message;
  return Promise.reject({
    ...error,
    message: (error.response?.data as { message?: string })?.message || 'An error occurred',
    axiosMessage,
  });
};
