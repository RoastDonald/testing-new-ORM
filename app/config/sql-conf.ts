const username = process.env.NAME || '';
const password = process.env.PASSWORD || '';
const database = process.env.DATABASE || '';
const host = process.env.HOST || '';

const config = {
  development: {
    db: {
      username,
      password,
      database,
      host,
    },
  },
  production: {},
};

export default config.development;
