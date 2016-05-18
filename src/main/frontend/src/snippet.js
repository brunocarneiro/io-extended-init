.controller('MessengerController', function($http, $timeout) {
  var self = this;

  this.channel = '';
  this.token = '';
  this.messages = [];
  this.currentUser = 'Marcos Moura';
  this.currentBoard = 'Geral';
  this.currentBoardIcon = 'message';

  this.boards = [
    {
      name: 'Geral',
      icon: 'message'
    }, {
      name: 'Festa',
      icon: 'local_bar'
    }, {
      name: 'Almoço',
      icon: 'local_pizza'
    }, {
      name: 'Keynote',
      icon: 'slideshow'
    }, {
      name: 'Networking',
      icon: 'business_center'
    }
  ];

  this.scrollPanel = function() {
    $timeout(function() {
      var scrollabelPanel = document.querySelector('.scrollable');

      if (scrollabelPanel.scrollHeight !== scrollabelPanel.scrollTop) {
        scrollabelPanel.scrollTop = scrollabelPanel.scrollTop = scrollabelPanel.scrollHeight;
      }
    }, 100);
  };

  this.changeBoard = function(board, icon) {
    this.currentBoard = board;
    this.currentBoardIcon = icon;

    this.scrollPanel();

    this.input = '';
  };

  this.sendMessage = function(message) {
    this.input = '';

    $http({
      method: 'POST',
      url: '/message',
      params: {
        from: this.currentUser,
        board: this.currentBoard,
        body: message,
        token: self.token
      }
    }).then(self.scrollPanel);
  };

  $http
    .post('/login')
    .then(function(response) {
      self.token = response.data.token;
      self.channel = new window.goog.appengine.Channel(self.token);

      self.channel.open({
        onmessage: function(message) {
          console.log('onopen', arguments);
        },
        onopen: function() {
          console.log('onopen', arguments);
        },
        onerror: function() {
          console.log('onerror', arguments);
        },
        onclose: function() {
          console.log('onclose', arguments);
        }
      });

      return $http.get('/login');
    })
    .then(function(response) {
      self.messages = response.data.messages;
      self.scrollPanel();
    });
});
