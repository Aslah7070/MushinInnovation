
export const env = {
  get PORT() {
    return process.env.PORT;
  },
  get MONGO_URI() {
    return process.env.MONGO_URI;
  },
  get JWT_ACCESS_SECRET() {
    return process.env.JWT_ACCESS_SECRET;
  },
  get JWT_REFRESH_SECRET() {
    return process.env.JWT_REFRESH_SECRET;
  },
  get CLIENT_ORIGIN() {
    return process.env.CLIENT_ORIGIN;
  },
    get CLIENT_ORIGIN_LOCAL() {
    return process.env.CLIENT_ORIGIN_LOCAL;
  },
  get RESET_PASS_URL() {
    return process.env.RESET_PASS_URL;
  },

  get NODE_ENV() {
    return process.env.NODE_ENV;
  },
   get EMAIL_USER() {
    return process.env.EMAIL_USER;
  },
   get EMAIL_PASSWORD() {
    return process.env.EMAIL_PASSWORD;
  },

};