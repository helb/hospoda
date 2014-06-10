Meteor.subscribe('chatMessages');

var stringToColour = function(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var colour = '#';
    for (var i = 0; i < 3; i++) {
        var value = (hash >> (i * 8)) & 0xFF;
        colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
}

Template.simplechat.helpers({
  messages: function(){
    return Messages.find({}, {sort: {timestamp: 1}});
  },
  time: function(timestamp){
    return this.timestamp.getHours()+":"+(this.timestamp.getMinutes()<10?'0':'') + this.timestamp.getMinutes();
  }
});

Template.simplechat.events({
  'keyup #chatmessage' : function(event) {
    if (event.type === 'keyup' && event.which === 13) { // 13 == enter
      if (event.currentTarget.value.replace(/\s/g, '').length){
      Messages.insert({user: Meteor.user().username, text: event.currentTarget.value, timestamp: new Date()});

      // reset:
      event.currentTarget.value = "";
      event.currentTarget.focus();
      }
      document.getElementById("messages").scrollTop = 9999;
    }
  }
});

Template.simplechat.rendered = function() {
  if(!this._rendered) {
    this._rendered = true;
    document.getElementById("chatmessage").placeholder="Napiš zprávu a odešli Enterem";
  }
}
