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

Meals.helpers({
        default_variant: function() {
            if(this.position ==0){
                return true;
            } else {
                return false;
            }
        }
});

Rooms.helpers({
        is_mine: function() {
            return this.user_id === Meteor.userId();
        }
});
