const config = {
  port: process.env.PORT,
  tokens: (process.env.TOKENS || '').split(',')
};

export default config;
