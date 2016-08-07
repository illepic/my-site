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
    bodyClasses: ['theme--light'],
  },
  /* eslint-disable no-unneeded-ternary */
  feat: {
    srcset: (process.env.NODE_ENV === 'production') ? true : true,
  },
  /* eslint-enable no-unneeded-ternary */
};
