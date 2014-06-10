Router.map(function() {
  this.route('hospoda', {
  	path: '/hospoda',
  	waitOn: function(){
  		return Meteor.subscribe('pubOrders');},
  	onAfterAction: function(){document.title = 'Objednávky jídel – bar'}}),
  this.route('kuchyne', {
  	path: '/kuchyne',
  	waitOn: function(){
	  	return Meteor.subscribe('kitchenOrders');},
  	onAfterAction: function(){document.title = 'Objednávky jídel – kuchyně'}}),
  this.route('report', {
  	path: '/report',
  	waitOn: function(){
		return Meteor.subscribe('reportOrders');},
  	onAfterAction: function(){document.title = 'Objednávky jídel – report'}})
});

Router.configure({
  waitOn: function () {
    return [Meteor.subscribe('allRooms'),
    		Meteor.subscribe('allTables'),
  			Meteor.subscribe('allMeals'),
  			Meteor.subscribe('allCategories')];
  }
});