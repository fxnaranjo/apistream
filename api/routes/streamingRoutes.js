'use strict';
module.exports = function(app) {
  var todoList = require('../controllers/streamingController');

  // todoList Routes
  app.route('/startStreaming')
    .post(todoList.startCameraStream)

  // todoList Routes
  app.route('/stopStreaming')
    .post(todoList.stopCameraStream)

  // todoList Routes
  app.route('/healthStreaming')
    .get(todoList.healthStreaming)

    // todoList Routes
  app.route('/createHighlight')
  .post(todoList.highlight)


  
};
