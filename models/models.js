Tables = new Meteor.Collection("tables", {
    schema: new SimpleSchema({
        title: {
            type: String,
            label: "Název",
            max: 100
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
        }
    })
});