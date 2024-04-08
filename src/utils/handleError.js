export const isAxiosError = (error) => Boolean(error?.response?.data?.message);

export const messageErrorAxios = (error) => error?.response?.data?.message;

export const getMessageErrorAxios = (error) => {
  let message = error?.message;

  if (isAxiosError(error)) {
    message = messageErrorAxios(error);
  }

  return message;
};
