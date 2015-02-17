Meteor.subscribe('chatMessages');

Template.simplechat.helpers({
  messages: function(){
    return Messages.find({}, {sort: {timestamp: 1}});
  },
  time: function(timestamp){
    return this.timestamp.getHours()+":"+(this.timestamp.getMinutes()<10?'0':'') + this.timestamp.getMinutes();
  }
});

Template.simplechat.events({
  'keydown #chatmessage' : function(event) {
    if (event.type === 'keydown' && event.which === 13) { // 13 == enter
      if (event.currentTarget.value.replace(/\s/g, '').length){
      Messages.insert({user: Meteor.user().username, text: event.currentTarget.value, timestamp: new Date(TimeSync.serverTime())});

      // reset:
      event.currentTarget.value = "";
      event.currentTarget.focus();
      }
    }
  }
});

Template.simplechat.rendered = function() {
  if(!this._rendered) {
    this._rendered = true;
    document.getElementById("chatmessage").placeholder="Napiš zprávu a odešli Enterem";
  }
  newchatmessages = Messages.find({'timestamp': {$gte: new Date(TimeSync.serverTime())}}, {sort: {timestamp: 1}});
  newchatmessages.observe({
    added: function (message) {
      $("#messages").animate({ scrollTop: $("#messages")[0].scrollHeight }, 600);
      if(!document.getElementById("chat").classList.contains("openedchat")){
        document.getElementById("chat").classList.toggle("openedchat");
        document.getElementById("orders").classList.toggle("openedchat");
      }
      document.getElementById("openchat").classList.add("blink");
      setTimeout(function() {
            document.getElementById("openchat").classList.remove("blink");
        }, 300)
    },
  });
}
