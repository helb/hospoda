Rooms = new Meteor.Collection2("rooms", {
    schema: new SimpleSchema({
        title: {
            type: String,
            label: "Název",
            max: 100
        },
        user_id: {
            type: String,
            label: "Uživatel"
        }
    })
});


Tables = new Meteor.Collection2("tables", {
    schema: new SimpleSchema({
        title: {
            type: String,
            label: "Název",
            max: 100
        },
        room_id: {
            type: String,
            label: "Místnost"
        },
        price: {
            type: Number,
            label: "Cena"
        }
    })
});


Categories = new Meteor.Collection2("categories", {
    schema: new SimpleSchema({
        title: {
            type: String,
            label: "Název",
            max: 150
        },
        position: {
            type: Number,
            label: "Pozice"
        },
        display: {
            type: Boolean,
            label: "Zobrazit na hlavní obrazovce"
        }
    })
});


Meals = new Meteor.Collection2("meals", {
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
        has_condiments: {
            type: Boolean,
            label: "Podává se s omáčkou"
        },
        category_id: {
            type: String,
            label: "Kategorie"
        },
        is_side: {
            type: Boolean,
            label: "Příloha"
        },
        is_condiment: {
            type: Boolean,
            label: "Omáčka"
        },
        condiment_included: {
            type: Boolean,
            label: "Omáčka v ceně",
            optional: true
        },
        price: {
            type: Number,
            label: "Cena",
            optional: true
        },
        half_price: {
            type: Number,
            label: "Cena poloviční porce",
            optional: true
        },
        position: {
            type: Number,
            label: "Pozice",
            optional: true
        },
        variant_of: {
            type: String,
            label: "Varianta jídla",
            optional: true
        },
    }),
virtualFields: {
        default_variant: function(meal) {
            if(meal.position ==0){
                return true;
            } else {
                return false;
            }
        },
    }
});


Orders = new Meteor.Collection2("orders", {
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
        side_quantity: {
            type: Number,
            label: "Počet příloh",
            optional: true
        },
        condiment_id: {
            type: String,
            label: "Omáčka",
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
        half: {
            type: Boolean,
            label: "Poloviční"
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
        },
        is_archived: {
            type: Boolean,
            label: "Archivovaná",
            optional: true
        },
        archived_on: {
            type: Date,
            label: "Čas archivace",
            optional: true
        },
    }),
     virtualFields: {
        room_title: function(order) {
            if(order.table_id){
                return Rooms.findOne({_id: Tables.findOne({_id: order.table_id}).room_id}).title.split(' ')[0];
            } else {
                return null;
            }
        },
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
        condiment_title: function(order) {
            if(order.condiment_id){
                return Meals.findOne({_id: order.condiment_id}).title;
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
        time_total: function(order) {
            if(order.issued){
                time_total = (order.issued - order.created)/60000;
                return time_total.toFixed(0);
            } else {
                return null;
            }
        },
        date: function(order) {
            if(order.created){
                day = order.created.getDate();
                month = order.created.getMonth()+1;
                return day + ". " + month + ".";
            } else {
                return null;
            }
        },
        day_name: function(order) {
            if(order.created){
                // day = order.created.getDate();
                var weekday=new Array(7);
                weekday[0]="Ne";
                weekday[1]="Po";
                weekday[2]="Út";
                weekday[3]="St";
                weekday[4]="Čt";
                weekday[5]="Pá";
                weekday[6]="So";
                return weekday[order.created.getDay()];
                // return day + ". " + month + ".";
            } else {
                return null;
            }
        }
    }
});