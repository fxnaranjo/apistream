'use strict';
module.exports = function(app) {
  var todoList = require('../controllers/streamingController');

  // todoList Routes
  app.route('/startStreaming')
    .post(todoList.startCameraStream)


  
};
