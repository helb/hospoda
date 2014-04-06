/*
TODO
mapa stolu:
  saloon s koncertem
  military
*/

Template.chatworks.rendered = function() {
    if(!this._rendered) {
      this._rendered = true;
      document.getElementById("message").placeholder="Napiš zprávu a odešli Enterem";
    }
}

Template.meals.categories = function () {
  return Categories.find({display: true}, { sort: { position: 1 }});
}

Template.meals.meals = function(parent) {
  if (parent) {
    return Meals.find({category_id:parent}).fetch();
  } else {
    return Meals.find({category_id:{$exists:false}});
  }
}

Template.variants.categories = function () {
  return Categories.find({}, { sort: { position: 1 }});
}


var variants_dep = new Deps.Dependency();

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
  return Rooms.find({}, { sort: { created: -1 }});
}

Template.orders.helpers({
  orders: function () {
    return Orders.find({}, { sort: { created: -1 }});
  },

  meals: function (order) {
    return Meals.find({_id:parent.meal_id}).fetch();
  },

  not_mine: function (order) {
    // console.log(this.author_id);
    // console.log(Meteor.userId());
    if(this.author_id != Meteor.userId()){
      return true;
    } else {
      return false;
    }
    // return true;
  }
})

Template.report.orders = function () {
  return Orders.find({}, { sort: { created: -1 }});
}


/////////////////////////////////////////////////////////////////////////
// EVENTS
/////////////////////////////////////////////////////////////////////////
Template.meals.events({
    'click li.meal' : function(event){
        meal = event.currentTarget.dataset.meal;
        if(Meals.findOne({variant_of: meal})){
          document.getElementsByName("frm_meal").value = meal;
          variants_dep.changed();
          document.getElementById("meals").classList.add("hidden");
          document.getElementById("variants").classList.remove("hidden");
          document.getElementById("sides").classList.remove("hidden");
          document.getElementById("condiments").classList.remove("hidden");
          console.log("typeof: " + typeof Meals.findOne({_id: meal}).half_price);
          if(Meals.findOne({_id: meal}).can_half){
            document.getElementById("orderoptions").classList.remove("hidden");
            document.getElementById("half").classList.remove("hidden");
          }
          document.getElementById("tables").classList.remove("hidden");
          return false;
        } else {
          document.getElementsByName("frm_meal").value = meal;
          document.getElementById("meals").classList.add("hidden");
          document.getElementById("sides-title").style.marginTop=0;
          document.getElementById("sides").classList.remove("hidden");
          document.getElementById("condiments").classList.remove("hidden");
          console.log("typeof: " + typeof Meals.findOne({_id: meal}).half_price);
          if(Meals.findOne({_id: meal}).can_half){
            document.getElementById("orderoptions").classList.remove("hidden");
            document.getElementById("half").classList.remove("hidden");
          }
          document.getElementById("tables").classList.remove("hidden");
          console.log("frm_meal = " + document.getElementsByName("frm_meal").value);
          return false;
      }
    }
});

Template.variants.events({
    'click li.variant' : function(event){
        meal = event.currentTarget.dataset.meal;
        document.getElementsByName("frm_meal").value = meal;
        var buttons = document.getElementsByClassName("variant");
        for(var i = 0 ; i < buttons.length; i++){
           buttons[i].classList.remove("chosen");
        }
        event.currentTarget.classList.add("chosen");
        console.log("frm_meal = " + document.getElementsByName("frm_meal").value);
        return false;
    }
});

Template.sides.events({
    'click li.side' : function(event){
        meal = event.currentTarget.dataset.meal;
        document.getElementsByName("frm_side").value = meal;
        var buttons = document.getElementsByClassName("side");
        for(var i = 0 ; i < buttons.length; i++){
           buttons[i].classList.remove("chosen");
        }
        event.currentTarget.classList.add("chosen");
        console.log("frm_side = " + document.getElementsByName("frm_side").value);
        return false;
    }
});

Template.condiments.events({
    'click li.condiment' : function(event){
        meal = event.currentTarget.dataset.meal;
        document.getElementsByName("frm_condiment").value = meal;
        var buttons = document.getElementsByClassName("condiment");
        for(var i = 0 ; i < buttons.length; i++){
           buttons[i].classList.remove("chosen");
        }
        event.currentTarget.classList.add("chosen");
        console.log("frm_condiment = " + document.getElementsByName("frm_condiment").value);
        return false;
    }
});

Template.tables.events({
    'click .table' : function(event){
        table = event.currentTarget.dataset.table;
        document.getElementsByName("frm_table").value = table;
        if(document.getElementsByName("frm_meal").value == null){
          console.log("adding chosen");
          document.getElementsByName("frm_meal").value = document.getElementsByClassName("chosen")[0].dataset.meal;
        }
        var priceform = document.getElementsByName("frm_price");
        if(!document.getElementById("frm_half").checked){
          priceform.value = Meals.findOne({_id: document.getElementsByName("frm_meal").value}).price;
        } else {
          priceform.value = Meals.findOne({_id: document.getElementsByName("frm_meal").value}).half_price;
        }
        if(document.getElementsByName("frm_side").value){
          priceform.value += Meals.findOne({_id: document.getElementsByName("frm_side").value}).price;
        }
        if(document.getElementsByName("frm_condiment").value){
          priceform.value += Meals.findOne({_id: document.getElementsByName("frm_condiment").value}).price;
        }

        // console.log("half: " + document.getElementById("frm_half").checked);

        Orders.insert({
          author_id: Meteor.userId(),
          meal_id: document.getElementsByName("frm_meal").value,
          side_id: document.getElementsByName("frm_side").value,
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

        //RESET//////////////////////////////////////////////////////////////////////////////////
          document.getElementsByName("frm_meal").value = null;
          document.getElementsByName("frm_table").value = null;
          document.getElementsByName("frm_side").value = null;
          document.getElementsByName("frm_condiment").value = null;
          document.getElementsByName("frm_price").value = null;
          document.getElementById("meals").classList.remove("hidden");
          document.getElementById("sides").classList.add("hidden");
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
          console.log("reset");
        return false;
    }
});

Template.orders.events({
    'click button.cancel' : function(event){
      var order_id = event.currentTarget.parentNode.parentNode.dataset.order;
      // console.log("clicked cancel");
      // console.log("order_id = " + order_id);
      console.log("classList = " + event.currentTarget.parentNode.parentNode.parentNode.parentNode.classList);
      if(event.currentTarget.parentNode.parentNode.parentNode.parentNode.classList.contains("hospoda")){
        // console.log("author_id = " + Orders.findOne({_id: order_id}).author_id);
        // console.log("userId = " + Meteor.userId());
        if(Orders.findOne({_id: order_id}).author_id == Meteor.userId()){
          Orders.update({_id: event.currentTarget.dataset.order}, {$set: {is_cancelled: true}});
        }
      } else if(event.currentTarget.parentNode.parentNode.parentNode.parentNode.classList.contains("kuchyne")){
        Orders.update({_id: event.currentTarget.dataset.order}, {$set: {is_cancelled: true}});
      }
    },

    'click li.order' : function(event){
      var order_id = event.currentTarget.dataset.order;
      if(event.currentTarget.parentNode.parentNode.classList.contains("kuchyne")){
        if(Orders.findOne({_id: order_id}).is_new == true && Orders.findOne({_id: order_id}).is_cancelled == false){
          Orders.update({_id: order_id}, {$set: {is_new: false, is_cooking: true, accepted: new Date()}});
        } else if(Orders.findOne({_id: order_id}).is_cooking == true && Orders.findOne({_id: order_id}).is_cancelled == false){
          Orders.update({_id: order_id}, {$set: {is_cooking: false, is_cooked: true, cooked: new Date()}});
        }
      } else if(Orders.findOne({_id: order_id}).author_id == Meteor.userId()){
         if(Orders.findOne({_id: order_id}).is_cooked == true && Orders.findOne({_id: order_id}).is_cancelled == false){
          Orders.update({_id: order_id}, {$set: {is_cooked: false, is_issued: true, issued: new Date()}});
        }
      }
    }
});

Template.chat.events({
    'click #openchat span' : function(event){
        document.getElementById("chat").classList.toggle("openedchat");
        document.getElementById("orders").classList.toggle("openedchat");
    }
});