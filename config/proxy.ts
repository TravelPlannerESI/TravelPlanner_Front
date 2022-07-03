export default {
  dev: {
    '/api/': {
      target: 'http://localhost:8095',
      changeOrigin: true,
    },
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
