module.exports = function(config) {
  config.set({
      
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,     

    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    // as well as any additional frameworks (requirejs/chai/sinon/...)
    frameworks: [
      'jasmine'
    ],

    // list of files / patterns to load in the browser      
    files: [

      // load jasmine  
      'https://cdnjs.cloudflare.com/ajax/libs/jasmine/2.3.3/jasmine.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/jasmine/2.3.3/jasmine-html.min.js',

      // jquery, angular, bootstrap      
      'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.1/jquery.min.js',       
      'https://ajax.googleapis.com/ajax/libs/angularjs/1.4.0/angular.js',
      'https://ajax.googleapis.com/ajax/libs/angularjs/1.4.0/angular-route.js',
      'https://ajax.googleapis.com/ajax/libs/angularjs/1.4.0/angular-mocks.js',
      'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js',

      // system under test
      './public/dest/stripe_express_angular.js',      

      // test files
      './public/js/test/*.js',      
      
      { pattern: './public/*.html', included: false, served: true }
    ],
    
    // list of files / patterns to exclude
    exclude: [
    ],

    // web server port
    port: 3000,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      'PhantomJS'
    ],

    // Which plugins to enable
    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine'
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_DEBUG,

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
    
    reporters: ['progress']
    
    
    });
};
