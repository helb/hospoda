Tables = new Meteor.Collection("tables", {
    schema: new SimpleSchema({
        title: {
            type: String,
            label: "Název",
            max: 100
        },
        price: {
            type: Number,
            label: "Cena"
        }
    })
});

Categories = new Meteor.Collection("categories", {
    schema: new SimpleSchema({
        title: {
            type: String,
            label: "Název",
            max: 150
        },
        position: {
            type: Number,
            label: "Pozice"
        }
    })
});

Meals = new Meteor.Collection("meals", {
    schema: new SimpleSchema({
        title: {
            type: String,
            label: "Název",
            max: 150
        },
        active: {
            type: Boolean,
            label: "Aktivní"
        },
        has_sides: {
            type: Boolean,
            label: "Podává se s přílohou"
        },
        category_id: {
            type: String,
            label: "Kategorie"
        },
        is_side: {
            type: Boolean,
            label: "Příloha"
        },
        price: {
            type: Number,
            label: "Cena"
        },
        position: {
            type: Number,
            label: "Pozice"
        }
    })
});

Orders = new Meteor.Collection("orders", {
    schema: new SimpleSchema({
        author_id: {
            type: String,
            label: "Autor"
        },
        table_id: {
            type: String,
            label: "Stůl"
        },
        meal_id: {
            type: String,
            label: "Jídlo"
        },
        side_id: {
            type: String,
            label: "Příloha",
            optional: true
        },
        created: {
            type: Date,
            label: "Vytvořena"
        },
        accepted: {
            type: Date,
            label: "Přijata",
            optional: true
        },
        cooked: {
            type: Date,
            label: "Uvařena",
            optional: true
        },
        issued: {
            type: Date,
            label: "Vytvořena",
            optional: true
        },
        price: {
            type: Number,
            label: "Cena"
        },
        is_new: {
            type: Boolean,
            label: "Nová"
        },
        is_cancelled: {
            type: Boolean,
            label: "Zrušená"
        },
        is_cooking: {
            type: Boolean,
            label: "Vaří se"
        },
        is_cooked: {
            type: Boolean,
            label: "Uvařená"
        },
        is_issued: {
            type: Boolean,
            label: "Vydaná"
        }
    }),
     virtualFields: {
     /*   final_price: function(order) {
            if(order.meal_id){
                fprice += Meals.findOne({_id: order.meal_id}).price;
                if(order.side_id){
                    fprice += Meals.findOne({_id: order.side_id}).price;
                    if(order.table_id){
                        fprice += Tables.findOne({_id: order.table_id}).price;
                    } else {
                        return fprice;
                    }
                } else {
                    return fprice;
                }
            } else {
                return fprice;
            }
        },*/
        meal_title: function(order) {
            if(order.meal_id){
                return Meals.findOne({_id: order.meal_id}).title;
            } else {
                return null;
            }
        },
        side_title: function(order) {
            if(order.side_id){
                return Meals.findOne({_id: order.side_id}).title;
            } else {
                return null;
            }
        },
        table_title: function(order) {
            if(order.table_id){
                return Tables.findOne({_id: order.table_id}).title;
            } else {
                return null;
            }
        },
        time_created: function(order) {
            if(order.created){
                return order.created.getHours()+":"+(order.created.getMinutes()<10?'0':'') + order.created.getMinutes();
            } else {
                return null;
            }
        },
        time_accepted: function(order) {
            if(order.accepted){
                return order.accepted.getHours()+":"+(order.accepted.getMinutes()<10?'0':'') + order.accepted.getMinutes();
            } else {
                return null;
            }
        },
        time_cooked: function(order) {
            if(order.cooked){
                return order.cooked.getHours()+":"+(order.cooked.getMinutes()<10?'0':'') + order.cooked.getMinutes();
            } else {
                return null;
            }
        },
        time_issued: function(order) {
            if(order.issued){
                return order.issued.getHours()+":"+(order.issued.getMinutes()<10?'0':'') + order.issued.getMinutes();
            } else {
                return null;
            }
        },
    }
});