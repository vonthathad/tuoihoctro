const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://dbadmin:thtdbadmin@45.76.151.211:63547/tht',
  port: process.env.PORT || 4000,
};

export default config;
