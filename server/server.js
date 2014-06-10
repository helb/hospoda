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



/* Orders */

Meteor.publish("reportOrders", function () {
    return Orders.find(); //omezit na datum + omezit pole
});

Meteor.publish("kitchenOrders", function () {
    return Orders.find({is_archived: { $ne: true}}); //omezit pole
});

Meteor.publish("pubOrders", function () {
    return Orders.find({author_id: this.userId, is_archived: { $ne: true}}); //omezit pole
});



/* Meals & Categories */

/*Meteor.publish("activeMeals", function () {
    return Meals.find({active: true}); //omezit pole
});*/

Meteor.publish("allMeals", function () {
    return Meals.find(); //omezit pole
});

/*Meteor.publish("activeCategories", function () {
    return Categories.find({display: true}); //omezit pole
});*/

Meteor.publish("allCategories", function () {
    return Categories.find(); //omezit pole
});



/* Tables & Rooms */

Meteor.publish("allRooms", function () {
    return Rooms.find(); //omezit pole
});

/*Meteor.publish("pubRooms", function () {
    return Orders.find({user_id: this.userId}); //omezit pole
});
*/
Meteor.publish("allTables", function () {
    return Tables.find(); //omezit pole
});


/* Chat */

Meteor.publish("chatMessages", function () {
    return Messages.find();
});