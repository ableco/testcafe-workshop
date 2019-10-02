require('dotenv').config();

const baseUrl = () => {
  return process.env.APP_URL;
};

export { baseUrl };