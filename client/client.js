Template.chatworks.rendered = function() {
    if(!this._rendered) {
      this._rendered = true;
      document.getElementById("message").placeholder="Napiš zprávu a odešli Enterem";
    }
}

Template.meals.categories = function () {
  return Categories.find({}, { sort: { position: 1 }});
}

Template.meals.meals = function(parent) {
  if (parent) {
    return Meals.find({category_id:parent}).fetch();
  } else {
    return Meals.find({category_id:{$exists:false}});
  }
}

Template.orders.orders = function () {
  return Orders.find({}, { sort: { created: -1 }});
}


Handlebars.registerHelper('equal', function(lvalue, rvalue, options) {
    if (arguments.length < 3)
        throw new Error("Handlebars Helper equal needs 2 parameters");
    if( lvalue!=rvalue ) {
        return options.inverse(this);
    } else {
        return options.fn(this);
    }
});

Template.orders.meals = function (order) {
  return Meals.find({_id:parent.meal_id}).fetch();
}

