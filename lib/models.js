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
        },
        position: {
            type: Number,
            label: "Pozice"
        },
    })
});

Rooms.allow({
    insert: function (userId, doc) {
        return false;
    },
    update: function (userId, doc, fields, modifier) {
        return false;
    },
    remove: function (userId, doc) {
        return false;
    }
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

Tables.allow({
    insert: function (userId, doc) {
        return false;
    },
    update: function (userId, doc, fields, modifier) {
        return false;
    },
    remove: function (userId, doc) {
        return false;
    }
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

Categories.allow({
    insert: function (userId, doc) {
        return false;
    },
    update: function (userId, doc, fields, modifier) {
        return false;
    },
    remove: function (userId, doc) {
        return false;
    }
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

Meals.allow({
    insert: function (userId, doc) {
        return false;
    },
    update: function (userId, doc, fields, modifier) {
        return true;
    },
    remove: function (userId, doc) {
        return false;
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

Orders.allow({
    insert: function (userId, doc) {
        return true;
    },
    update: function (userId, doc, fields, modifier) {
        return true;
    },
    remove: function (userId, doc) {
        return false;
    }
});

Messages = new Meteor.Collection("messages", {
    schema: new SimpleSchema({
        text: {
            type: String
        },
        user: {
            type: String
        },
        timestamp: {
            type: Date
        }
    })
});

Messages.allow({
    insert: function (userId, doc) {
        return true;
    },
    update: function (userId, doc, fields, modifier) {
        return false;
    },
    remove: function (userId, doc) {
        return false;
    }
});