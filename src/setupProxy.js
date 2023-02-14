const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/search", // 불러오려는 server 의 api path
    createProxyMiddleware({
      target: "http://dapi.kakao.com/v3", // server 주소를 넣어주면 된다.
      changeOrigin: true,
    })
  );
};
