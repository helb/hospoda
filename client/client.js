/*
TODO
jidla:
  moznost objednat samostatnou prilohu/omacku vickrat
  moznost pridat vic omacek

admin
*/


Date.prototype.addDays = function(days) {
    this.setDate(this.getDate() + days);
    return this;
};

Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,10);
});

var variants_dep = new Deps.Dependency();
// var orders_dep = new Deps.Dependency();

Template.report.rendered = function() {
  document.getElementById('frm_daydisplay').value = new Date().toDateInputValue();

  promoMeal = Meals.findOne({_id: "8hNwA49epxX2i2hgG"});
  document.getElementById('frm_promoactive').checked = promoMeal.active;
  document.getElementById('frm_promoprice').value = promoMeal.price;
  document.getElementById('frm_promotitle').value = promoMeal.title.replace("Akce: ", "");
}

Template.meals.categories = function () {
  return Categories.find({display: true}, { sort: { position: 1 }});
}

Template.meals.meals = function(parent) {
  if (parent) {
    return Meals.find({category_id:parent}, { sort: { position: 1 }}).fetch();
  } else {
    return Meals.find({category_id:{$exists:false}});
  }
}

Template.hospoda.helpers({
  sum: function(){
    orders = Orders.find({author_id: Meteor.userId() , is_issued: true, is_archived: { $ne: true}}).fetch();
    var sum = 0;
    for(var i = 0 ; i < orders.length; i++){
      sum += orders[i].price;
    }
    return sum;
  }
})

Template.kuchyne.helpers({
  sum: function(){
    orders = Orders.find({is_issued: true, is_archived: { $ne: true}}).fetch();
    var sum = 0;
    for(var i = 0 ; i < orders.length; i++){
      sum += orders[i].price;
    }
    return sum;
  }
})

Template.variants.categories = function () {
  return Categories.find({}, { sort: { position: 1 }});
}

Template.variants.variants = function() {
  variants_dep.depend();
  return Meals.find({variant_of: document.getElementsByName("frm_meal").value}, { sort: { position: 1 }}).fetch();
}

Template.sides.sides = function() {
  return Meals.find({is_side: true}).fetch();
}

Template.condiments.condiments = function() {
  return Meals.find({is_condiment: true}).fetch();
}

Template.tables.rooms = function () {
  // var id = Meteor.userId();
  return Rooms.find({}, { sort: { position: 1 }});
}

Template.orders.helpers({
  orders: function(){
    // orders_dep.depend();
    // if(document.getElementById("frm_onlymine").checked){
    // return Orders.find({author_id: Meteor.userId(), is_archived: { $ne: true}}, { sort: { created: -1 }});
    // } else {
    return Orders.find({is_archived: { $ne: true}}, { sort: { created: -1 }});
    // }
  },

  meals: function(order){
    return Meals.find({_id:parent.meal_id}).fetch();
  },

  not_mine: function(order){
    // console.log(this.author_id);
    // console.log(Meteor.userId());
    if(this.author_id != Meteor.userId()){
      return true;
    } else {
      return false;
    }
    // return true;
  },

  more_sides: function(order){
    if(this.side_quantity > 1){
      return true;
    } else {
      return false;
    }
  },
})

Template.report.helpers({
  orders: function(){
    if(!Session.get("displaydate")){
      var now = new Date();
      month = now.getMonth() + 1;
      Session.set("displaydate", now.getFullYear() + "-" + month + "-" + now.getDate());
    }
    date = Session.get("displaydate");
    // dayend = day.getTime() + 1 * 86400000;
    // return Orders.find({created: {$gte: new Date(day) , $lt: new Date(dayend) }}, { sort: { created: -1 }});
    var start = new Date(date);
    start.setHours(4);
    var end = new Date(date);
    end.addDays(1);
    return Orders.find({created: {$gte: start, $lte: end}}, {sort:{created: -1}});
    // return Orders.find({}, { sort: { created: -1 }});
  },
  sum: function(){
    if(!Session.get("displaydate")){
      var now = new Date();
      month = now.getMonth() + 1;
      Session.set("displaydate", now.getFullYear() + "-" + month + "-" + now.getDate());
    }
    date = Session.get("displaydate");
    var start = new Date(date);
    start.setHours(4);
    var end = new Date(date);
    end.addDays(1);
    var orders = Orders.find({is_issued: true, created: {$gte: start, $lte: end}}).fetch();
    var sum = 0;
    for(var i = 0 ; i < orders.length; i++){
      sum += orders[i].price;
    }
    return sum;
  },
  order_count: function(){
        if(!Session.get("displaydate")){
      var now = new Date();
      month = now.getMonth() + 1;
      Session.set("displaydate", now.getFullYear() + "-" + month + "-" + now.getDate());
    }
    date = Session.get("displaydate");
    var start = new Date(date);
    start.setHours(4);
    var end = new Date(date);
    end.addDays(1);
    return Orders.find({is_issued: true, created: {$gte: start, $lte: end}}).count();
  },
  more_sides: function(order){
    if(this.side_quantity > 1){
      return true;
    } else {
      return false;
    }
  }
})

/////////////////////////////////////////////////////////////////////////
// EVENTS
/////////////////////////////////////////////////////////////////////////
function showTableMap(){
          // if(document.getElementById("rooms").children[0].classList.contains("chosen") || document.getElementById("rooms").children[1].classList.contains("chosen") || document.getElementById("rooms").children[2].classList.contains("chosen")){
          if(Session.get("roomchosen") == true){

          }else{
            document.getElementById("rooms").children[0].classList.add("chosen");   // show table map
            document.getElementsByClassName("tablemap-"+document.getElementById("rooms").children[0].dataset.room)[0].classList.remove("hidden");
          }
          document.getElementById("tables").classList.remove("hidden");
}

Template.meals.events({
    // click on meal button
    'click li.meal' : function(event){
        meal = event.currentTarget.dataset.meal;
        if(Meals.findOne({variant_of: meal})){ // if meal has variants
          document.getElementsByName("frm_meal").value = meal;
          variants_dep.changed(); // load variants
          // switch view:
          document.getElementById("meals").classList.add("hidden");
          document.getElementById("cancel").classList.remove("hidden");
          document.getElementById("cancel-order").classList.remove("hidden");
          document.getElementById("variants").classList.remove("hidden");
          if(Meals.findOne({_id: meal}).has_sides){
            document.getElementById("sides").classList.remove("hidden");
          }
          if(Meals.findOne({_id: meal}).has_condiments){
            document.getElementById("condiments").classList.remove("hidden");
          }
          // console.log("typeof: " + typeof Meals.findOne({_id: meal}).half_price);
          if(Meals.findOne({_id: meal}).can_half){ // if half portion allowed
            document.getElementById("orderoptions").classList.remove("hidden"); // move this line outside of "if" when there are more options than just half portion
            document.getElementById("half").classList.remove("hidden");
          }
          showTableMap();
          return false;
        } else { // meal without variants, switch view
          document.getElementsByName("frm_meal").value = meal;
          document.getElementById("meals").classList.add("hidden");
          document.getElementById("cancel").classList.remove("hidden");
          document.getElementById("cancel-order").classList.remove("hidden");
          document.getElementById("sides-title").style.marginTop=0;
          if(Meals.findOne({_id: meal}).has_sides){
            document.getElementById("sides").classList.remove("hidden");
          }
          if(Meals.findOne({_id: meal}).has_condiments){
            document.getElementById("condiments").classList.remove("hidden");
          }
          // console.log("typeof: " + typeof Meals.findOne({_id: meal}).half_price);
          if(Meals.findOne({_id: meal}).can_half){ // if half portion allowed
            document.getElementById("orderoptions").classList.remove("hidden"); // move this line outside of "if" when there are more options than just half portion
            document.getElementById("half").classList.remove("hidden");
          }
          // console.log("frm_meal = " + document.getElementsByName("frm_meal").value);
          showTableMap();
          return false;
      }
    }
});

Template.variants.events({
    // click on variant button:
    'click li.variant' : function(event){
        meal = event.currentTarget.dataset.meal;
        document.getElementsByName("frm_meal").value = meal; // get selected meal
        var buttons = document.getElementsByClassName("variant"); // un-hilight all buttons
        for(var i = 0 ; i < buttons.length; i++){
           buttons[i].classList.remove("chosen");
        }
        event.currentTarget.classList.add("chosen"); // hilight clicked button
        // console.log("frm_meal = " + document.getElementsByName("frm_meal").value); // switch meal id to current variant
        return false;
    }
});

function resetSideQuantity(){
  var buttons = document.getElementsByClassName("side"); // delete quantity values
    for(var i = 0 ; i < buttons.length; i++){
      buttons[i].children[0].innerHTML = Meals.findOne({_id: buttons[i].dataset.meal}).title;
      buttons[i].children[1].innerHTML = Meals.findOne({_id: buttons[i].dataset.meal}).price + ",–&nbsp;Kč";
    }
}

Template.sides.events({
    // click on side button:
    'click li.side' : function(event){
        meal = event.currentTarget.dataset.meal;
        document.getElementsByName("frm_side").value = meal; // get selected side
        if(!event.currentTarget.classList.contains("chosen")){ // if clicking currently not chosen side
          document.getElementsByName("frm_side_quantity").value = 1; // set quantity to 1
          resetSideQuantity();
        } else {
          document.getElementsByName("frm_side_quantity").value = document.getElementsByName("frm_side_quantity").value + 1;
          event.currentTarget.children[0].innerHTML = document.getElementsByName("frm_side_quantity").value + "&times; " + Meals.findOne({_id: meal}).title;
          event.currentTarget.children[1].innerHTML = document.getElementsByName("frm_side_quantity").value * Meals.findOne({_id: meal}).price + ",–&nbsp;Kč";
        }

        var buttons = document.getElementsByClassName("side"); // un-hilight all buttons
        for(var i = 0 ; i < buttons.length; i++){
           buttons[i].classList.remove("chosen");
        }
        event.currentTarget.classList.add("chosen"); // hilight clicked button
        document.getElementById("cancel-sides").classList.remove("hidden"); // show button for removing side
        // console.log("frm_side = " + document.getElementsByName("frm_side").value);
        return false;
    }
});

Template.condiments.events({
    // click on condiment button, same as with sides:
    'click li.condiment' : function(event){
        meal = event.currentTarget.dataset.meal;
        document.getElementsByName("frm_condiment").value = meal;
        var buttons = document.getElementsByClassName("condiment");
        for(var i = 0 ; i < buttons.length; i++){
           buttons[i].classList.remove("chosen");
        }
        event.currentTarget.classList.add("chosen");
        document.getElementById("cancel-condiments").classList.remove("hidden"); // show button for removing condiment
        // console.log("frm_condiment = " + document.getElementsByName("frm_condiment").value);
        return false;
    }
});


function resetView(){
  document.getElementsByName("frm_meal").value = null;
  document.getElementsByName("frm_table").value = null;
  document.getElementsByName("frm_side").value = null;
  document.getElementsByName("frm_side_quantity").value = null;
  document.getElementsByName("frm_condiment").value = null;
  document.getElementsByName("frm_price").value = null;
  document.getElementsByName("frm_half").checked = false;
  document.getElementById("meals").classList.remove("hidden");
  document.getElementById("sides").classList.add("hidden");
  document.getElementById("cancel").classList.add("hidden");
  document.getElementById("cancel-sides").classList.add("hidden");
  document.getElementById("cancel-condiments").classList.add("hidden");
  document.getElementById("variants").classList.add("hidden");
  document.getElementById("condiments").classList.add("hidden");
  document.getElementById("tables").classList.add("hidden");
  document.getElementById("orderoptions").classList.add("hidden");
  document.getElementById("half").classList.add("hidden");
  document.getElementById("frm_half").checked = false;
  var buttons = document.getElementsByClassName("condiment");
  for(var i = 0 ; i < buttons.length; i++){
    buttons[i].classList.remove("chosen");
  }
  var buttons = document.getElementsByClassName("side");
  for(var i = 0 ; i < buttons.length; i++){
    buttons[i].classList.remove("chosen");
  }
  var buttons = document.getElementsByClassName("variant");
  for(var i = 0 ; i < buttons.length; i++){
     buttons[i].classList.remove("chosen");
  }
  resetSideQuantity();
  // console.log("reset");
}

Template.tables.events({
    // change map
    'click .room' : function(event){
      room = event.currentTarget.dataset.room;
      var maps = document.getElementsByClassName("tablemap"); // hide all maps
      for(var i = 0 ; i < maps.length; i++){
        maps[i].classList.add("hidden");
      }
      var buttons = document.getElementsByClassName("room"); // un-hilight all buttons
      for(var i = 0 ; i < buttons.length; i++){
        buttons[i].classList.remove("chosen");
      }
      event.currentTarget.classList.add("chosen");
      Session.set("roomchosen", true);
      document.getElementById(room).parentNode.classList.remove("hidden");
    },
    // click on a table in the map
    'click .table' : function(event){
        table = event.currentTarget.dataset.table; // get clicked table id
        // console.log("table = " + Tables.findOne({"_id": table}).title);
        document.getElementsByName("frm_table").value = table; // and set it to form field
        if(document.getElementsByName("frm_meal").value == null){ // ??
          document.getElementsByName("frm_meal").value = document.getElementsByClassName("chosen")[0].dataset.meal;
        }
        var priceform = document.getElementsByName("frm_price");
        if(!document.getElementById("frm_half").checked){ // if not half portion
          priceform.value = Meals.findOne({_id: document.getElementsByName("frm_meal").value}).price;
        } else { // if half portion
          priceform.value = Meals.findOne({_id: document.getElementsByName("frm_meal").value}).half_price;
        }
        if(document.getElementsByName("frm_side").value){ // add side price
          priceform.value += Meals.findOne({_id: document.getElementsByName("frm_side").value}).price * document.getElementsByName("frm_side_quantity").value;
        }
        if(document.getElementsByName("frm_condiment").value){ // add condiment price
          if(Meals.findOne({_id: document.getElementsByName("frm_meal").value}).condiment_included != true){ // but only if it's not included in meal price
            priceform.value += Meals.findOne({_id: document.getElementsByName("frm_condiment").value}).price;
          }
        }

        if(Tables.findOne({_id: document.getElementsByName("frm_table").value}).price < 0){
          priceform.value = Math.round(priceform.value/2);
        } else {
          priceform.value += Tables.findOne({_id: document.getElementsByName("frm_table").value}).price;
        }
        // console.log("half: " + document.getElementById("frm_half").checked);

        // send to db:
        Orders.insert({
          author_id: Meteor.userId(),
          meal_id: document.getElementsByName("frm_meal").value,
          side_id: document.getElementsByName("frm_side").value,
          side_quantity: document.getElementsByName("frm_side_quantity").value,
          condiment_id: document.getElementsByName("frm_condiment").value,
          table_id: document.getElementsByName("frm_table").value,
          price: document.getElementsByName("frm_price").value,
          created: new Date(),
          is_new: true,
          is_cancelled: false,
          is_cooked: false,
          is_cooking: false,
          is_issued: false,
          half: document.getElementById("frm_half").checked,
        });

        // reset view:
        resetView();
        return false;
    }
});


Template.orders.events({
    'click button.cancel' : function(event){
      var order_id = event.currentTarget.parentNode.parentNode.dataset.order;
      // console.log("clicked cancel");
      // console.log("order_id = " + order_id);
      // console.log("classList = " + event.currentTarget.parentNode.parentNode.parentNode.parentNode.classList);
      if(event.currentTarget.parentNode.parentNode.parentNode.parentNode.classList.contains("hospoda")){ // if in pub view
        // console.log("author_id = " + Orders.findOne({_id: order_id}).author_id);
        // console.log("userId = " + Meteor.userId());
        if(Orders.findOne({_id: order_id}).author_id == Meteor.userId()){ // if created by current user
          Orders.update({_id: event.currentTarget.dataset.order}, {$set: {is_cancelled: true}}); // mark order as cancelled
        }
      } else if(event.currentTarget.parentNode.parentNode.parentNode.parentNode.classList.contains("kuchyne")){ // if in kitchen view
        Orders.update({_id: event.currentTarget.dataset.order}, {$set: {is_cancelled: true}}); // mark order as cancelled
      }
    },

    'click li.order' : function(event){
      var order = Orders.findOne({_id: event.currentTarget.dataset.order});
      if(event.currentTarget.parentNode.parentNode.classList.contains("kuchyne")){ // if in kitchen view
        if(order.is_new == true && order.is_cancelled == false){ // if new
          Orders.update({_id: order._id}, {$set: {is_new: false, is_cooking: true, accepted: new Date()}}); // mark as cooking
        } else if(order.is_cooking == true && order.is_cancelled == false){ // if cooking
          Orders.update({_id: order._id}, {$set: {is_cooking: false, is_cooked: true, cooked: new Date()}}); // mark as cooked
        }
      } else if(order.author_id == Meteor.userId()){ // if in pub view
         if(order.is_cooked == true && order.is_cancelled == false){ //if cooked
          Orders.update({_id: order._id}, {$set: {is_cooked: false, is_issued: true, issued: new Date()}}); // mark as issued
        }
      }
    },

    'dblclick li.order' : function(event){
      if(event.currentTarget.parentNode.parentNode.classList.contains("hospoda")){ // if in pub view
        var order = Orders.findOne({_id: event.currentTarget.dataset.order});
        if(order.author_id == Meteor.userId() && order.is_issued == false && order.is_cooked == false && order.is_cancelled == false){ // if new or cooking
          // clone order
          Orders.insert({
            author_id: Meteor.userId(),
            meal_id: order.meal_id,
            side_id: order.side_id,
            side_quantity: order.side_quantity,
            condiment_id: order.condiment_id,
            table_id: order.table_id,
            price: order.price,
            created: new Date(),
            is_new: true,
            is_cancelled: false,
            is_cooked: false,
            is_cooking: false,
            is_issued: false,
            half: order.half
          });
        }
      }
    },
});


Template.cancel.events({
    // click on „cancel order“ button
    'click button#cancel-order' : function(event){
      //reset
      resetView();
      return false;
    },
    'click button#cancel-sides' : function(event){
      var buttons = document.getElementsByClassName("side");
        for(var i = 0 ; i < buttons.length; i++){
          buttons[i].classList.remove("chosen");
        }
      resetSideQuantity();
      document.getElementsByName("frm_side").value = null;
      document.getElementsByName("frm_side_quantity").value = null;
    },
    'click button#cancel-condiments' : function(event){
      var buttons = document.getElementsByClassName("condiment");
        for(var i = 0 ; i < buttons.length; i++){
          buttons[i].classList.remove("chosen");
        }
      document.getElementsByName("frm_condiment").value = null;
    }
});


Template.kuchyne.events({
  //click on „end shift“ button
  'click button.endshift' : function(event){
    event.currentTarget.classList.add("hidden"); //hide "end" button
    event.currentTarget.parentNode.children[1].classList.remove("hidden"); //show "begin" button
  },
  //click on „begin new shift“ button
  'click button.beginshift' : function(event){
    // unarchived = Orders.find({is_archived: { $ne: false}}).fetch();
    var documentIdentifiers = _.pluck(Orders.find({is_archived: { $ne: false}}, { fields: { _id: 1 }}).fetch(), '_id');
    for (var i = 0; i < documentIdentifiers.length; i++){
      Orders.update(documentIdentifiers[i], {$set: {is_archived: true, archived_on: new Date()}});
    }
    // Orders.update({is_archived: false}, {$set: {is_archived: true}}, {multi:true});
    event.currentTarget.classList.add("hidden"); //hide "begin" button
    event.currentTarget.parentNode.children[0].classList.remove("hidden"); //show "end" button
  }
});

Template.report.events({
  'change input' : function(event){
    //console.log(event.currentTarget.value);
    Session.set("displaydate", event.currentTarget.value);
  },

  'click #savepromo' : function(event){
    // console.log("Ukládám…");
    Meals.update({_id: "8hNwA49epxX2i2hgG"}, {$set: {
      price: document.getElementById("frm_promoprice").value,
      title: "Akce: " + document.getElementById("frm_promotitle").value,
      active: document.getElementById("frm_promoactive").checked
    }});
   }

});

Template.chat.events({
    // open/close chat
    'click #openchat span' : function(event){
        document.getElementById("chat").classList.toggle("openedchat");
        document.getElementById("messages").scrollTop = 9999;
        document.getElementById("orders").classList.toggle("openedchat");
    }
});