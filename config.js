module.exports = {
  paths: {
    content: './content',
    src: './src',
    dist: (process.env.NODE_ENV === 'production') ? './dist--prod' : './dist',
    assets: (process.env.NODE_ENV === 'production') ? './dist--prod/assets' : './dist/assets',
  },
  imgSizes: [{
    width: 1200,
    suffix: '--xlarge',
  }, {
    width: 700,
    suffix: '--medium',
  }, {
    width: 450,
    suffix: '--small',
  }],
  site: {
    description: "Evan's Site",
    title: "Evan Lovely's Site",
    bodyClasses: [
      'theme--light',
      (process.env.NODE_ENV === 'production') ? 'env--production' : 'env--development',
    ],
  },
  /* eslint-disable no-unneeded-ternary */
  feat: {
    srcset: (process.env.NODE_ENV === 'production') ? true : true,
  },
  /* eslint-enable no-unneeded-ternary */
  githubBase: {
    file: 'https://github.com/EvanLovely/my-site/blob/master/content/',
    commits: 'https://github.com/EvanLovely/my-site/commits/master/content/',
  },
};
