(function (window, app) {
  var $ = document.querySelector.bind(document);
  var $all = document.querySelectorAll.bind(document);
  var log = (window.console && window.console.log && window.console.log.bind(window.console)) || function () {};
 
  window.app = app;

  app.buffer = '';
  
  app.run = function () {
    log(' run');
    app.init(app.main);
  };

  app.init = function (cb) {
    log(' - init');
    app.getElements();
    app.connect(cb);
  };

  app.getElements = function () {
    log(' -- getElements');
    app.$list = $('.message-list');
  };

  app.connect = function (cb) {
    var socket = app.socket = io.connect('54.199.154.93');
    var timeout = setTimeout(function () {
      cb(new Error('連線失敗'));
    }, 2000);
    app.initSocket();
    socket.on('lol', function (data) {
      clearTimeout(timeout);
      app.newdataHandler(data);
      cb();
    });
    socket.emit('QQ');
  };

  app.initSocket = function () {
    var socket = app.socket;
    socket.on('newdata', app.newdataHandler);
  };

  app.newdataHandler = function (data) {
    if (data && !(data instanceof Array)) {
      data = [data];
    }
    data && data.forEach(app.createMessage);
    app.flush();
  };

  app.createMessage = function (msg) {
    var html = '<li class="message-list__item">';
    html += '<a href="' + msg.link + '">';
    html += msg.message;
    msg.name && (html += '<span class="message-list__item__by">by ' + msg.name + '</span>');
    html += '</a>';
    app.buffer += html;
  };

  app.flush = function () {
    app.buffer && (function () {
      app.$list.innerHTML = app.buffer + app.$list.innerHTML;
      app.buffer = '';
    })();
  };

  app.main = function (err) {
    log(' - main');
    if (err) {
      return alert(err.message);
    }
  };
})(this, {});

window.onload = function () {
  app.run();
};
