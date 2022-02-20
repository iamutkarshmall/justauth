import createProxyMiddleware from "http-proxy-middleware";

module.exports = (app) => {
  app.use(
    createProxyMiddleware("/signup", {
      target: "https://basic-mern-authentication.herokuapp.com",
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/login", {
      target: "https://basic-mern-authentication.herokuapp.com",
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/logout", {
      target: "https://basic-mern-authentication.herokuapp.com",
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/user", {
      target: "https://basic-mern-authentication.herokuapp.com",
      changeOrigin: true,
    })
  );
};
