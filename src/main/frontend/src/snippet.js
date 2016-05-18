.controller('MessengerController', function($window, $http, $timeout) {
  var self = this;

  this.channel = '';
  this.channelId = '';
  this.messages = [];
  this.currentUser = '';
  this.currentChannel = 'General';
  this.currentChannelIcon = 'message';

  this.channels = [
    {
      name: 'General',
      icon: 'message'
    }, {
      name: 'Party',
      icon: 'local_bar'
    }, {
      name: 'Lunch',
      icon: 'local_pizza'
    }, {
      name: 'Keynote',
      icon: 'slideshow'
    }, {
      name: 'Networking',
      icon: 'business_center'
    }
  ];

  this.onImageError = function($event) {
    $event.target.src = 'https://abs.twimg.com/sticky/default_profile_images/default_profile_' + (Math.floor(Math.random() * 6) + 1) + '_normal.png';
  };

  this.scrollPanel = function() {
    $timeout(function() {
      var scrollabelPanel = document.querySelector('.scrollable');

      if (scrollabelPanel.scrollHeight !== scrollabelPanel.scrollTop) {
        scrollabelPanel.scrollTop = scrollabelPanel.scrollTop = scrollabelPanel.scrollHeight;
      }
    }, 100);
  };

  this.changeChannel = function(channel, icon) {
    this.currentChannel = channel;
    this.currentChannelIcon = icon;

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
        channel: this.currentChannel,
        body: message,
        channelId: self.channelId
      }
    }).then(self.scrollPanel);
  };

  $http
    .post('/login')
    .then(function(response) {
      self.channelId = response.data.channelId;
      self.channel = new $window.goog.appengine.Channel(self.channelId);

      self.channel.open({
        onmessage: function(message) {
          self.messages.push(JSON.parse(message.data));

          self.scrollPanel();
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
