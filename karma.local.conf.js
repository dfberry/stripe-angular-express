module.exports = function(config) {
  config.set({
    files: [
      'http://code.jquery.com/jquery-1.11.3.js',
      'https://ajax.googleapis.com/ajax/libs/angularjs/1.4.0/angular.js',
      './public/bin/index.js',
      './public/js/test.js',
      { pattern: './public/*.html', included: false, served: true }
    ],
    frameworks: ['mocha', 'chai'],
    browsers: ['Chrome'],
    port: 9876,
    proxies : {
      '/public': 'http://localhost:9876/base/'
    },
    plugins: [
        'karma-mocha', 
        'karma-chai'
        ],
  });
};
