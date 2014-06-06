Rooms = new Meteor.Collection("rooms", {
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


Tables = new Meteor.Collection("tables", {
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
        },
        display: {
            type: Boolean,
            label: "Zobrazit na hlavní obrazovce"
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
    })

});

Meals.helpers({
        default_variant: function() {
            if(this.position ==0){
                return true;
            } else {
                return false;
            }
        }
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
    })
});

Orders.helpers({
        room_title: function() {
            if(this.table_id){
                return Rooms.findOne({_id: Tables.findOne({_id: this.table_id}).room_id}).title.split(' ')[0];
            } else {
                return null;
            }
        },
        meal_title: function() {
            if(this.meal_id){
                return Meals.findOne({_id: this.meal_id}).title;
            } else {
                return null;
            }
        },
        side_title: function() {
            if(this.side_id){
                return Meals.findOne({_id: this.side_id}).title;
            } else {
                return null;
            }
        },
        condiment_title: function() {
            if(this.condiment_id){
                return Meals.findOne({_id: this.condiment_id}).title;
            } else {
                return null;
            }
        },
        table_title: function() {
            if(this.table_id){
                return Tables.findOne({_id: this.table_id}).title;
            } else {
                return null;
            }
        },
        time_created: function() {
            if(this.created){
                return this.created.getHours()+":"+(this.created.getMinutes()<10?'0':'') + this.created.getMinutes();
            } else {
                return null;
            }
        },
        time_accepted: function() {
            if(this.accepted){
                return this.accepted.getHours()+":"+(this.accepted.getMinutes()<10?'0':'') + this.accepted.getMinutes();
            } else {
                return null;
            }
        },
        time_cooked: function() {
            if(this.cooked){
                return this.cooked.getHours()+":"+(this.cooked.getMinutes()<10?'0':'') + this.cooked.getMinutes();
            } else {
                return null;
            }
        },
        time_issued: function() {
            if(this.issued){
                return this.issued.getHours()+":"+(this.issued.getMinutes()<10?'0':'') + this.issued.getMinutes();
            } else {
                return null;
            }
        },
        time_total: function() {
            if(this.issued){
                time_total = (this.issued - this.created)/60000;
                return time_total.toFixed(0);
            } else {
                return null;
            }
        },
        date: function() {
            if(this.created){
                day = this.created.getDate();
                month = this.created.getMonth()+1;
                return day + ". " + month + ".";
            } else {
                return null;
            }
        },
        day_name: function() {
            if(this.created){
                // day = this.created.getDate();
                var weekday=new Array(7);
                weekday[0]="Ne";
                weekday[1]="Po";
                weekday[2]="Út";
                weekday[3]="St";
                weekday[4]="Čt";
                weekday[5]="Pá";
                weekday[6]="So";
                return weekday[this.created.getDay()];
                // return day + ". " + month + ".";
            } else {
                return null;
            }
        }
});