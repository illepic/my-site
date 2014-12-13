module.exports = {
  watch: {
    tasks: [
      {
        grunt: true,
        stream: true,
        args: ['watch:css']
      },
      {
        grunt: true,
        stream: true,
        args: ['watch:js']
      }
    ]
  }
};
