module.exports = {
  paths: {
    content: './content',
    src: './src',
    dist: './dist',
    assets: './dist/assets',
  },
  imgSizes: [{
    width: 1200,
    suffix: '--xlarge',
  }, {
    width: 960,
    suffix: '--large',
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
};
