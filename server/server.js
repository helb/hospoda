Meteor.startup(function() {
  return Meteor.methods({
    cleanOrders: function() {
      return Orders.remove({});
    }
  });
});

/*Meteor.publish("orders", function () {
    if (this.userId == "nXMPYc32A5rGrrBov"){	// miki
    	return Orders.find();				 	// vsechny objednavky
    } else if (this.userId == "pajKWX58s4ooEojgT"){ 		// kuchyne
		return Orders.find({is_archived: { $ne: true}});	// jen nearchivovane
    } else {																			// hospody
    	return Orders.find({author_id: this.userId, is_archived: { $ne: true}});		// jen vlastni nearchivovane
    }
});

Meteor.publish("meals", function () {
    if (this.userId == "nXMPYc32A5rGrrBov"){ 	// miki
    	return Meals.find();					// vsechna jidla
	} else {
    	return Meals.find({active: true});		// jen aktivni
    }
});

Meteor.publish("categories", function () {
    if (this.userId == "nXMPYc32A5rGrrBov"){ 	// miki
    	return Categories.find();				// vsechny kategorie
	} else {
    	return Categories.find({display: true});	// jen aktivni
    }
});

Meteor.publish("rooms", function () {
    if (this.userId == "nXMPYc32A5rGrrBov" || this.userId == "pajKWX58s4ooEojgT"){ 	// miki nebo kuchyne
    	return Orders.find();				 										// vsechny mistnosti
	} else {											// hospody
    	return Orders.find({user_id: this.userId});		// jen vlastni
    }
});

Meteor.publish("tables", function () {
    return Tables.find();
});*/