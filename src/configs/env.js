export const generateENV = (key) => process.env[`EXPO_PUBLIC_${key}`];

const env = {
  SERVER_PORT: generateENV("SERVER_PORT"),
};

export default env;
