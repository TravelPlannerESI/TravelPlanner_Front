export default {
  dev: {
    '/api/': {
      target: 'http://localhost:8095',
      changeOrigin: true,
    },
    // '/site/program/': {
    //   target: 'https://www.koreaexim.go.kr',
    //   changeOrigin: true,
    //   pathRewrite: { '^': '' },
    // },
  },
  test: {
    '/api/': {
      target: 'https://proapi.azurewebsites.net',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  pre: {
    '/api/': {
      target: 'http://localhost:8095',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
};
