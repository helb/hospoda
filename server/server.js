Meteor.startup(function() {
  return Meteor.methods({
    cleanOrders: function() {
      return Orders.remove({});
    },
    cleanChat: function() {
      return Messages.remove({});
    },
  });
});


Meteor.publishAuth = function(name, fn) {
  Meteor.publish(name, function() {
    if (! this.userId)
      return this.ready();

    return fn.apply(this, arguments);
  });
};


/* Orders */

Meteor.publishAuth("reportOrders", function () {
    return Orders.find(); //omezit na datum + omezit pole
});

Meteor.publishAuth("kitchenOrders", function () {
    return Orders.find({is_archived: { $ne: true}}); //omezit pole
});

Meteor.publishAuth("pubOrders", function () {
    return Orders.find({author_id: this.userId, is_archived: { $ne: true}}); //omezit pole
});



/* Meals & Categories */

/*Meteor.publish("activeMeals", function () {
    return Meals.find({active: true}); //omezit pole
});*/

Meteor.publishAuth("allMeals", function () {
    return Meals.find(); //omezit pole
});

/*Meteor.publish("activeCategories", function () {
    return Categories.find({display: true}); //omezit pole
});*/

Meteor.publishAuth("allCategories", function () {
    return Categories.find(); //omezit pole
});



/* Tables & Rooms */

Meteor.publishAuth("allRooms", function () {
    return Rooms.find(); //omezit pole
});

/*Meteor.publish("pubRooms", function () {
    return Orders.find({user_id: this.userId}); //omezit pole
});
*/
Meteor.publishAuth("allTables", function () {
    return Tables.find(); //omezit pole
});


/* Chat */

Meteor.publishAuth("chatMessages", function () {
    return Messages.find();
});